// src/pages/OrderTracking.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      const isDelivered = trackingId.includes('PK');

      const mockOrder = {
        id: trackingId,
        status: isDelivered ? 'delivered' : 'shipped',
        customer: {
          name: 'Syed Saqlain',
          phone: '+92 300 123 4567',
          address: '123 Green Street, DHA Phase 6, Lahore'
        },
        items: [
          { name: 'Monstera Deliciosa', quantity: 1, price: 45.99 },
          { name: 'Rose Bouquet', quantity: 2, price: 29.99 },
          { name: 'Gardening Service', quantity: 1, price: 30.0 }
        ],
        delivery: {
          estimated: '2024-01-20T16:00:00',
          delivered: isDelivered ? '2024-01-19T14:30:00' : null,
          driver: 'Muhammad Ali',
          driverPhone: '+92 300 987 6543'
        },
        timeline: [
          {
            title: 'Order Placed',
            description: 'Your order has been received',
            timestamp: '2024-01-15T10:30:00',
            completed: true,
            icon: Package
          },
          {
            title: 'Order Confirmed',
            description: "We've accepted your order",
            timestamp: '2024-01-15T11:15:00',
            completed: true,
            icon: CheckCircle2
          },
          {
            title: 'Processing',
            description: 'Your order is being prepared',
            timestamp: '2024-01-15T14:00:00',
            completed: true,
            icon: Clock
          },
          {
            title: 'Out for Delivery',
            description: 'Your order is on the way',
            timestamp: '2024-01-16T09:30:00',
            completed: isDelivered,
            icon: Truck
          },
          {
            title: 'Delivered',
            description: 'Your order has been delivered',
            timestamp: isDelivered ? '2024-01-16T14:30:00' : '',
            completed: isDelivered,
            icon: CheckCircle2
          }
        ]
      };

      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  };

  const totalAmount = order
    ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Track Your Order
        </h1>
        <p className="text-gray-600 text-base sm:text-lg px-2">
          Enter your order ID to track delivery status in real-time
        </p>
      </motion.div>

      {/* Tracking Input */}
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-6 sm:mb-8">
        <form
          onSubmit={trackOrder}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <div className="flex-grow">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Order ID (e.g., PK123456789)"
              className="input-field w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 
                    0 0 5.373 0 12h4zm2 5.291A7.962 
                    7.962 0 014 12H0c0 3.042 1.135 
                    5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Tracking...
              </span>
            ) : (
              'Track Order'
            )}
          </button>
        </form>
      </div>

      {/* Order Result */}
      {order && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Order Status Card */}
          <div className="bg-gradient-to-r from-plant-primary to-plant-dark text-white rounded-xl p-4 sm:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <Package className="h-6 w-6 mr-3 flex-shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Order #{order.id}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'delivered'
                      ? 'Delivered'
                      : 'In Transit'}
                  </span>

                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {order.delivery.delivered
                      ? `Delivered on ${new Date(
                          order.delivery.delivered
                        ).toLocaleDateString()}`
                      : `Estimated: ${new Date(
                          order.delivery.estimated
                        ).toLocaleDateString()}`}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-center md:text-right">
                <div className="text-3xl font-bold">
                  ${totalAmount.toFixed(2)}
                </div>
                <p className="text-plant-light">Total Amount</p>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="bg-white rounded-xl shadow-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-plant-primary flex-shrink-0" />
              Delivery Timeline
            </h3>

            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {order.timeline.map((step, index) => (
                <div key={index} className="relative pl-10 sm:pl-12 pb-6 sm:pb-8 last:pb-0">
                  <div
                    className={`absolute left-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <step.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>

                  <div className="mb-2">
                    <h4 className="font-semibold text-base sm:text-lg">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {step.timestamp &&
                      new Date(step.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrderTracking;
