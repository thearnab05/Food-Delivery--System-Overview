"use client";

import React from 'react';
import Image from 'next/image';
import Header from '../_components/Header';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function OrdersPage() {
  const { orders } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your orders</h2>
          <a href="/login" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-black py-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Order History</h1>

          {(!orders || orders.length === 0) ? (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-xl shadow text-center transition-colors duration-300">
              <p className="text-gray-600 dark:text-gray-400">You have no orders yet.</p>
              <a href="/main" className="mt-4 inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg">Browse Menu</a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow transition-colors duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-500">${parseFloat(order.total).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{order.status}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <Image src={it.image} alt={it.name} width={64} height={64} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{it.name}</h4>
                            <span className="text-sm text-gray-600 dark:text-gray-400">x{it.quantity}</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${(parseFloat(it.price) * it.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
