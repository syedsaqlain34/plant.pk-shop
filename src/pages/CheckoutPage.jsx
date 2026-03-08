// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Shield,
  Truck,
  CreditCard,
  Banknote,
  Wallet,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Order placed successfully! We will deliver soon.');
    clearCart();
    navigate(user?.type === 'seller' ? '/seller' : '/buyer');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-plant-primary font-semibold hover:underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <Link to="/cart" className="inline-flex items-center text-plant-primary hover:text-plant-dark font-medium text-sm sm:text-base">
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
          Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-plant-primary" />
                Delivery Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                    <option value="faisalabad">Faisalabad</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                    placeholder="House #, Street, Area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                    placeholder="54000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Call before delivery"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-plant-primary" />
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: Banknote },
                  { id: 'cod', label: 'Cash on Delivery', icon: Wallet }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all min-h-[80px] sm:min-h-0 ${
                      paymentMethod === method.id 
                        ? 'border-plant-primary bg-plant-light/30' 
                        : 'border-gray-200 hover:border-plant-primary'
                    }`}
                  >
                    <method.icon className={`h-8 w-8 mb-2 ${
                      paymentMethod === method.id ? 'text-plant-primary' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      paymentMethod === method.id ? 'text-plant-primary' : 'text-gray-600'
                    }`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Badge */}
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </motion.div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-8"
          >
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg mr-4 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Gardening Service</span>
                  <span>$30.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(totalAmount * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-plant-primary">
                      ${(totalAmount + 5 + 30 + totalAmount * 0.16).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              {/* Delivery Time */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-800">Delivery in 2-3 hours</p>
                    <p className="text-sm text-green-700">Same day delivery available</p>
                  </div>
                </div>
              </div>
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                  />
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-r-lg hover:bg-gray-900 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              {/* Checkout Button */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-4 bg-gradient-to-r from-plant-primary to-plant-dark text-white rounded-lg font-bold text-lg hover:shadow-hover transition-all duration-300 flex items-center justify-center disabled:opacity-70"
              >
                <Lock className="h-5 w-5 mr-2" />
                Pay Now
              </button>
              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Payment • SSL Encrypted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;

