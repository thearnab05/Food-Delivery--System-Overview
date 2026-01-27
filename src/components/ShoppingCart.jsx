"use client";

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { orderAPI } from '@/lib/api';
import { X, Plus, Minus, ShoppingCart as CartIcon, CreditCard, User, Phone, MapPin } from 'lucide-react';

const ShoppingCart = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const { items, removeFromCart, updateQuantity, getTotalPrice, setCustomerInfo, setOrderStatus, orderStatus, paymentMethod, setPaymentMethod, clearCart, addOrder } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [customerInfo, setCustomerInfoState] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCustomerInfo(customerInfo);

    // If UPI selected, show UPI options first
    if (paymentMethod === 'upi') {
      setShowUPIOptions(true);
      return;
    }

    // For COD, process directly
    await processOrder();
  };

  const processOrder = async (selectedUPIMethod = null) => {
    setOrderStatus('processing');
    try {
      const payload = {
        items,
        customerInfo,
        paymentMethod: selectedUPIMethod || paymentMethod,
        total: parseFloat(getTotalPrice().toFixed(2))
      };
      const res = await orderAPI.checkout(payload);
      // create local order record and save to context
      const orderRecord = {
        id: res?.orderId || `local-${Date.now()}`,
        items: payload.items,
        customerInfo: payload.customerInfo,
        paymentMethod: payload.paymentMethod,
        total: payload.total,
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      addOrder(orderRecord);
      setOrderStatus('success');
      setTimeout(() => {
        clearCart();
        setShowCheckout(false);
        setShowUPIOptions(false);
        setOrderStatus('idle');
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setOrderStatus('idle');
      setShowUPIOptions(false);
      alert(err?.error || 'Checkout failed');
    }
  };

  const handleUPIPayment = (method) => {
    processOrder(method);
  };

  const handleInputChange = (e) => {
    setCustomerInfoState({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <CartIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
              {items.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="p-0">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <CartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some delicious dishes to get started!</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            {!showCheckout ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <div className="space-y-4">
                {orderStatus === 'processing' ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing your order...</h3>
                    <p className="text-gray-600">Please wait while we confirm your order.</p>
                  </div>
                ) : orderStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ animation: 'successPulse 0.5s ease-out' }}>
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">Order Done!</h3>
                    <style jsx>{`
                      @keyframes successPulse {
                        0% { transform: scale(0); opacity: 0; }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); opacity: 1; }
                      }
                    `}</style>
                  </div>
                ) : showUPIOptions ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleUPIPayment('gpay')}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                      >
                        {/* Google Pay Logo */}
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg viewBox="0 0 48 48" className="w-10 h-10">
                            <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Google Pay</span>
                      </button>
                      <button
                        onClick={() => handleUPIPayment('phonepe')}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                      >
                        {/* PhonePe Logo */}
                        <div className="w-12 h-12 bg-[#5f259f] rounded-lg flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H9l4-7v4h2l-4 7z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">PhonePe</span>
                      </button>
                      <button
                        onClick={() => handleUPIPayment('paytm')}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all duration-200"
                      >
                        {/* Paytm Logo */}
                        <div className="w-12 h-12 bg-[#00BAF2] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs tracking-tight">Pay<span className="text-[#172B85]">tm</span></span>
                        </div>
                        <span className="font-semibold text-gray-700">Paytm</span>
                      </button>
                      <button
                        onClick={() => handleUPIPayment('netbanking')}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200"
                      >
                        {/* Net Banking - Bank Building Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v2h20V7L12 2zm0 2.5L18.5 7h-13L12 4.5zM4 11v6h2v-6H4zm5 0v6h2v-6H9zm5 0v6h2v-6h-2zm5 0v6h2v-6h-2zM2 19v2h20v-2H2z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Net Banking</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setShowUPIOptions(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 mt-4"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'cod'
                              ? 'border-blue-600 bg-blue-50 shadow-md'
                              : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                              }`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod'
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                              }`}>
                              {paymentMethod === 'cod' && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-semibold ${paymentMethod === 'cod' ? 'text-blue-900' : 'text-gray-600'}`}>
                              Cash on Delivery
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'upi'
                              ? 'border-blue-600 bg-blue-50 shadow-md'
                              : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                              }`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'upi'
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                              }`}>
                              {paymentMethod === 'upi' && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-semibold ${paymentMethod === 'upi' ? 'text-blue-900' : 'text-gray-600'}`}>
                              Net Banking / UPI
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={customerInfo.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                        <textarea
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowCheckout(false)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                        >
                          Back to Cart
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Place Order
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    , document.body);
};

export default ShoppingCart; 