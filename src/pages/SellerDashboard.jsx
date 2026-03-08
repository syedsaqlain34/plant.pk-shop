// src/pages/SellerDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package,
  TrendingUp, 
  DollarSign, 
  Users,
  Upload,
  BarChart3,
  Settings,
  Bell,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products] = useState([
    { id: 1, name: 'Snake Plant', stock: 45, price: 34.99, orders: 23 },
    { id: 2, name: 'Rose Plant', stock: 30, price: 24.99, orders: 18 },
    { id: 3, name: 'Herb Seeds', stock: 100, price: 12.99, orders: 45 },
    { id: 4, name: 'Fertilizer', stock: 60, price: 19.99, orders: 32 },
  ]);

  const [orders] = useState([
    { id: '#ORD-001', customer: 'John Doe', total: 89.97, status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Sarah Smith', total: 45.99, status: 'Processing', date: '2024-01-16' },
    { id: '#ORD-003', customer: 'Mike Johnson', total: 129.99, status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Emily Wilson', total: 67.50, status: 'Pending', date: '2024-01-17' },
  ]);

  const stats = [
    { label: 'Total Revenue', value: '$12,458', change: '+12.5%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: '284', change: '+8.2%', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Products', value: '48', change: '+4.1%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { label: 'Customers', value: '156', change: '+15.3%', icon: Users, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Dashboard Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your nursery business</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button className="px-4 py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium flex items-center text-sm sm:text-base">
              <Upload className="h-5 w-5 mr-2 flex-shrink-0" />
              Add Product
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 min-w-0">
          {/* Tabs - scroll on mobile */}
          <div className="flex space-x-4 mb-6 border-b overflow-x-auto pb-px scrollbar-hide">
            {['overview', 'products', 'orders', 'services'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'text-plant-primary border-b-2 border-plant-primary' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Orders
                  </h2>
                </div>
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <table className="w-full min-w-[560px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4 font-semibold">${order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Management */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          Stock: <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                            {product.stock} units
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-bold">${product.price}</span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-plant-light text-plant-dark rounded text-sm hover:bg-plant-accent transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">12.5%</span>
                  <span className="text-green-600 text-sm">↑ 2.1%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-plant-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">96%</span>
                  <span className="text-green-600 text-sm">↑ 3.2%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium flex items-center justify-center">
                <Upload className="h-5 w-5 mr-2" />
                Add New Product
              </button>
              <button className="w-full px-4 py-3 border border-plant-primary text-plant-primary rounded-lg hover:bg-plant-light transition-colors font-medium">
                Manage Services
              </button>
              <button className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Download Reports
              </button>
              <button className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                View Analytics
              </button>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium">Process 3 orders</p>
                    <p className="text-sm text-gray-600">Due today</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200 transition-colors">
                  Process
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Update stock</p>
                    <p className="text-sm text-gray-600">5 products low</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors">
                  Update
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Review feedback</p>
                    <p className="text-sm text-gray-600">12 new reviews</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200 transition-colors">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

