"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../_components/Header";
import { User, Mail, Calendar, MapPin, Edit2, Save, X, Settings, Key, Trash2, Camera, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [location, setLocation] = useState("San Francisco, CA"); // Mock default

  const handleSaveLocation = () => {
    // In a real app, this would save to backend
    setIsEditingLocation(false);
  };

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState("123 Food Street, New York, NY 10001");

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    setLocation(address);
  };

  const handleCancelEdit = () => {
    setIsEditingLocation(false);
    // Reset location logic would go here
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center transition-colors duration-300">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Restricted</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to view and manage your profile settings.</p>
          <a href="/login" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-600/20">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* Main Container - Explicit Light/Dark Backgrounds */}
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 pb-20">

        {/* Cover Banner */}
        <div className="h-64 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:space-x-8">

            {/* Left Column: Profile Card */}
            <div className="flex-shrink-0 w-full md:w-80 mb-8 md:mb-0">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  <div className="relative group mb-6">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                      <span className="text-4xl text-white font-bold">{user.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <h1 className="text-2xl font-bold text-black dark:text-white mb-1">{user.username}</h1>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-800">
                      Premium Member
                    </span>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <div className="text-center">
                      <span className="block text-xl font-bold text-black dark:text-white">12</span>
                      <span className="text-sm text-gray-700 dark:text-gray-400">Orders</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xl font-bold text-black dark:text-white">4.8</span>
                      <span className="text-sm text-gray-700 dark:text-gray-400">Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="mt-6 bg-white dark:bg-black rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Security Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Email Verified</span>
                    <span className="text-green-500 text-sm font-medium">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">2FA</span>
                    <span className="text-gray-400 text-sm font-medium">Disabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Settings */}
            <div className="flex-1 w-full space-y-6 md:mt-10">

              {/* Personal Info */}
              <div className="bg-white dark:bg-black rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium flex items-center">
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-400 flex items-center space-x-2">
                      <User className="w-4 h-4" /> <span>Full Name</span>
                    </label>
                    <p className="text-black dark:text-white font-medium pl-6">{user.username}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-400 flex items-center space-x-2">
                      <Mail className="w-4 h-4" /> <span>Email Address</span>
                    </label>
                    <p className="text-black dark:text-white font-medium pl-6">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-400 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" /> <span>Joined Date</span>
                    </label>
                    <p className="text-black dark:text-white font-medium pl-6">{new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-800 dark:text-gray-400 flex items-center space-x-2">
                      <MapPin className="w-4 h-4" /> <span>Location</span>
                    </label>
                    {isEditingLocation ? (
                      <div className="pl-6 flex space-x-2">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button onClick={handleSaveLocation}><Save className="w-4 h-4 text-green-600" /></button>
                        <button onClick={handleCancelEdit}><X className="w-4 h-4 text-red-600" /></button>
                      </div>
                    ) : (
                      <div className="pl-6 flex items-center group cursor-pointer" onClick={() => setIsEditingLocation(true)}>
                        <p className="text-black dark:text-white font-medium">{location}</p>
                        <Edit2 className="w-3 h-3 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-md transition-shadow group h-full">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Key className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-black dark:text-white">Change Password</h3>
                      <p className="text-xs text-gray-500">Update your security</p>
                    </div>
                  </div>
                  <Settings className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                </button>

                {/* Address Card */}
                <div className="flex flex-col justify-center p-6 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-md transition-shadow group h-full relative">
                  {isEditingAddress ? (
                    <div className="w-full h-full flex flex-col space-y-2">
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full flex-1 p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2">
                        <button onClick={handleSaveAddress} className="p-1 hover:bg-green-50 rounded-full"><Save className="w-4 h-4 text-green-600" /></button>
                        <button onClick={() => setIsEditingAddress(false)} className="p-1 hover:bg-red-50 rounded-full"><X className="w-4 h-4 text-red-600" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full h-full cursor-pointer" onClick={() => setIsEditingAddress(true)}>
                      <div className="flex items-center space-x-4 w-full">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <h3 className="font-bold text-black dark:text-white">Delivery Address</h3>
                          <p className="text-xs text-gray-700 dark:text-gray-400 truncate">{address}</p>
                        </div>
                      </div>
                      <Edit2 className="w-4 h-4 text-gray-300 group-hover:text-blue-500 flex-shrink-0 ml-2" />
                    </div>
                  )}
                </div>

                <button className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-md transition-shadow group h-full">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Trash2 className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-black dark:text-white">Delete Account</h3>
                      <p className="text-xs text-gray-500">Permanent action</p>
                    </div>
                  </div>
                  <Settings className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}