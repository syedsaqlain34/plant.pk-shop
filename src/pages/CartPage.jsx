// src/pages/CartPage.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  Package,
  Truck,
  Sprout,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-plant-light/50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-plant-primary/70" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Add some plants to your cart and spread some greenery!</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-plant-primary text-white rounded-xl hover:bg-plant-dark transition-all duration-200 font-medium btn-primary-hover"
          >
            Browse Plants
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center flex-wrap gap-2">
          <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8 mr-2 text-plant-primary" />
          Shopping Cart ({cartItems.length} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.seller || item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3">
                      <div className="flex items-center flex-wrap gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Unit Price */}
                        <div className="text-plant-primary font-bold">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      
                      {/* Total Price */}
                      <div className="text-xl font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cart Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-card p-4 sm:p-6 mt-6">
            <button
              onClick={clearCart}
              className="px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Clear Cart
            </button>
            <Link
              to="/products"
              className="px-6 py-3 border border-plant-primary text-plant-primary rounded-lg hover:bg-plant-light transition-colors font-medium text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary - show first on mobile so user sees total before scrolling */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-20 lg:top-8"
          >
            <div className="bg-white rounded-xl shadow-card p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (16%)</span>
                  <span>${(totalAmount * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-plant-primary">
                      ${(totalAmount + 5 + totalAmount * 0.16).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Options */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-plant-primary" />
                  Additional Services
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="mr-3" />
                    <div>
                      <div className="font-medium">Gardening Service</div>
                      <div className="text-sm text-gray-600">Professional plant care - $30/hr</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="mr-3" />
                    <div>
                      <div className="font-medium">Plant Pot</div>
                      <div className="text-sm text-gray-600">Ceramic pot with drainage - $12.99</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full py-3.5 sm:py-4 bg-gradient-to-r from-plant-primary to-plant-dark text-white text-center rounded-lg font-bold text-base sm:text-lg hover:shadow-hover transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </Link>

              {/* Security Info */}
              <div className="text-center text-xs sm:text-sm text-gray-500 space-y-1">
                <div className="flex items-center justify-center">
                  <Lock className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  <span>Secure checkout • SSL encrypted</span>
                </div>
                <div className="flex items-center justify-center">
                  <Truck className="h-4 w-4 mr-2 text-plant-primary flex-shrink-0" />
                  <span>Free delivery on orders over $50</span>
                </div>
              </div>
            </div>
            {/* Suggested Items - hide on very small to reduce scroll */}
            <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 mt-6 hidden sm:block">
              <h3 className="font-semibold mb-4 flex items-center">
                <Sprout className="h-5 w-5 mr-2 text-plant-primary" />
                You might also like
              </h3>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Fertilizer Pack', price: 19.99, image: 'https://images.unsplash.com/photo-1598690248160-8e52ca6c5cb1' },
                  { id: 2, name: 'Watering Can', price: 24.99, image: 'https://images.unsplash.com/photo-1605000797499-95e51eec5a19' },
                  { id: 3, name: 'Plant Stand', price: 45.99, image: 'https://images.unsplash.com/photo-1592342717374-324911b5d5b1' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-plant-primary font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <button className="px-3 py-1 bg-plant-light text-plant-primary rounded-lg text-sm font-medium hover:bg-plant-accent transition-colors">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;