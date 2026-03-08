// src/pages/BuyerDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Package,
  Truck,
  Star,
  Settings,
  Bell,
  Heart,
  Clock,
  CreditCard,
  MapPin,
  UserCircle
} from 'lucide-react';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  const orders = [
    { id: '#ORD-789', items: '3 items', total: 89.97, status: 'Delivered', date: '15 Jan 2024', tracking: 'PK123456789' },
    { id: '#ORD-790', items: '1 item', total: 24.99, status: 'Shipped', date: '16 Jan 2024', tracking: 'PK123456790' },
    { id: '#ORD-791', items: '5 items', total: 129.99, status: 'Processing', date: '17 Jan 2024', tracking: 'In Progress' },
  ];

  const wishlist = [
    { id: 1, name: 'Orchid Plant', price: 39.99, image: 'https://images.unsplash.com/photo-1518831959646-507bb6d3eac0' },
    { id: 2, name: 'Lemon Tree', price: 49.99, image: 'https://images.unsplash.com/photo-1547514701-427821017ac7' },
    { id: 3, name: 'Bonsai Tree', price: 79.99, image: 'https://images.unsplash.com/photo-1478104718532-58a3458c68ab' },
  ];

  const addresses = [
    { primary: true, address: '123 Green Street, Lahore, Pakistan', type: 'Home' },
    { primary: false, address: 'Office Plaza, Sector F, Islamabad', type: 'Office' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-card p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-plant-primary to-plant-accent rounded-full flex items-center justify-center mb-4">
                <UserCircle className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-xl font-bold">Syed Saqlain</h2>
              <p className="text-gray-600 mb-4">Plant Lover 🌱</p>
              <div className="flex items-center text-yellow-500 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-semibold">4.9</span>
                <span className="text-gray-500 ml-1">(48 reviews)</span>
              </div>
              
              <div className="space-y-3 w-full">
                <button className="w-full px-4 py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium flex items-center justify-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Security Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="font-semibold mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-plant-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-lg font-bold">24</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-pink-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Wishlist Items</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Reviews</p>
                    <p className="text-lg font-bold">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your orders, wishlist and account settings</p>
          </div>

          {/* Tabs - scroll on mobile */}
          <div className="flex space-x-4 mb-6 border-b overflow-x-auto pb-px scrollbar-hide">
            {['orders', 'wishlist', 'addresses', 'payment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'text-plant-primary border-b-2 border-plant-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {tab === 'orders' && <Package className="h-4 w-4 inline mr-2" />}
                {tab === 'wishlist' && <Heart className="h-4 w-4 inline mr-2" />}
                {tab === 'addresses' && <MapPin className="h-4 w-4 inline mr-2" />}
                {tab === 'payment' && <CreditCard className="h-4 w-4 inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-plant-light to-white">
                  <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Recent Orders
                  </h2>
                </div>
                <div className="divide-y">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-4">
                            <div className="font-bold text-lg">{order.id}</div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">{order.items} • ${order.total}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Ordered on {order.date} • Tracking: {order.tracking}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-4 py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium text-sm">
                            Track Order
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gardening Services */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Active Services
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-plant-light/30 p-4 sm:p-6 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2">Gardening Service - Weekly</h3>
                      <p className="text-gray-600">Next session: Tomorrow, 10:00 AM</p>
                      <p className="text-sm text-gray-600 mt-1">Gardener: Muhammad Ali</p>
                      <div className="flex items-center mt-2">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">2 hours session</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-plant-primary text-plant-primary rounded-lg hover:bg-plant-light transition-colors font-medium w-full sm:w-auto">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {wishlist.map((item) => (
                <div
                                      key={item.id}
                  className="bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-hover transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <button className="text-red-500 hover:text-red-600">
                        <Heart className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-plant-primary">
                        ${item.price}
                      </span>
                      <button className="px-4 py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 ${addr.primary ? 'border-plant-primary bg-plant-light/20' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-plant-primary mr-2" />
                        <span className="font-semibold">{addr.type}</span>
                        {addr.primary && (
                          <span className="ml-3 px-2 py-1 bg-plant-primary text-white text-xs rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <button className="text-gray-600 hover:text-plant-primary">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 mb-4">{addr.address}</p>
                    <div className="flex space-x-3">
                      <button className={`px-4 py-2 rounded-lg font-medium ${
                        addr.primary 
                          ? 'bg-plant-primary text-white hover:bg-plant-dark'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                        {addr.primary ? 'Selected' : 'Set as Primary'}
                      </button>
                      <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card">
                <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                  />
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input type="checkbox" id="primary" className="rounded" />
                    <label htmlFor="primary" className="text-gray-700">
                      Set as primary address
                    </label>
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium">
                  Save Address
                </button>
              </div>
            </motion.div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </h2>
                  <button className="px-4 py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium">
                    Add New Card
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Saved Cards */}
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w 10 h-8 bg-blue-500 rounded mr-4"></div>
                        <div>
                          <p className="font-semibold">Visa ending in 4567</p>
                          <p className="text-sm text-gray-600">Expires 08/2025</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          Primary
                        </span>
                        <button className="text-gray-600 hover:text-plant-primary">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w 10 h-8 bg-orange-500 rounded mr-4"></div>
                        <div>
                          <p className="font-semibold">MasterCard ending in 1234</p>
                          <p className="text-sm text-gray-600">Expires 12/2024</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-gray-600 hover:text-plant-primary">
                          Set Primary
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { id: 'TXN-001', date: '15 Jan 2024', amount: 89.97, status: 'Completed' },
                    { id: 'TXN-002', date: '14 Jan 2024', amount: 24.99, status: 'Completed' },
                    { id: 'TXN-003', date: '13 Jan 2024', amount: 129.99, status: 'Refunded' },
                  ].map((txn) => (
                    <div key={txn.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium">{txn.id}</p>
                        <p className="text-sm text-gray-600">{txn.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-bold">${txn.amount}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
