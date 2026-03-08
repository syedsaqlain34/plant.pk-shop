// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  Sprout,
  Users,
  Search,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e78bcb9e1',
      category: 'Indoor Plants',
      rating: 4.8,
      seller: 'Green House Nursery'
    },
    {
      id: 2,
      name: 'Rose Bouquet',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43',
      category: 'Flowers',
      rating: 4.9,
      seller: 'Flower Paradise'
    },
    {
      id: 3,
      name: 'Herb Seed Pack',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2',
      category: 'Seeds',
      rating: 4.5,
      seller: 'Organic Seeds Co'
    },
  ];

  const services = [
    {
      id: 1,
      title: 'Gardening Services',
      description: 'Professional gardening and plant maintenance',
      icon: Sprout,
      price: '$50/hr',
      duration: 'Flexible Hours'
    },
    {
      id: 2,
      title: 'Plant Delivery',
      description: 'Safe and secure plant delivery service',
      icon: Truck,
      price: 'From $15',
      duration: 'Same Day Available'
    },
    {
      id: 3,
      title: 'Plant Care Consultation',
      description: 'Expert advice for your plants',
      icon: Users,
      price: '$30/session',
      duration: '1 Hour Session'
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-plant-light via-white to-plant-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-plant-dark mb-4 sm:mb-6">
                Grow Your <span className="text-plant-primary">Green</span> Space
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Pakistan's premier online nursery. Shop plants, flowers, seeds 
                and professional gardening services with doorstep delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-plant-primary text-white rounded-full font-semibold hover:bg-plant-dark transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-hover btn-primary-hover"
                >
                  Shop Plants
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 border-2 border-plant-primary text-plant-primary rounded-full font-semibold hover:bg-plant-light transition-all duration-300 btn-primary-hover"
                >
                  Book Services
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-plant-primary">5000+</div>
                  <div className="text-gray-600">Plant Varieties</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-plant-primary">1000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-plant-primary">24/7</div>
                  <div className="text-gray-600">Delivery Available</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-plant-primary">50+</div>
                  <div className="text-gray-600">Expert Gardeners</div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative order-first md:order-none"
            >
              <div className="relative h-[280px] sm:h-[380px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-plant-primary/20 to-plant-accent/10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b" 
                  alt="Indoor plants collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works - clear flow for new customers */}
      <section className="py-10 sm:py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-plant-dark text-center mb-2">
            How it works
          </h2>
          <p className="text-gray-600 text-center text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Simple steps to get plants and services delivered to your door
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: 1, title: 'Browse & choose', desc: 'Explore plants, flowers, seeds or book gardening services', icon: Search, path: '/products' },
              { step: 2, title: 'Add to cart', desc: 'Add items to your cart and review your order', icon: ShoppingCart, path: '/cart' },
              { step: 3, title: 'Checkout & enjoy', desc: 'Sign in, enter delivery details and pay securely', icon: CreditCard, path: '/register' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="text-center"
              >
                <Link to={item.path} className="block group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-plant-light flex items-center justify-center mb-4 group-hover:bg-plant-primary transition-colors duration-300">
                    <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-plant-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-semibold text-plant-primary">Step {item.step}</span>
                  <h3 className="font-display font-semibold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-plant-dark mb-3 sm:mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Carefully curated plants and flowers for your home
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-plant-primary font-semibold hover:text-plant-dark transition-colors link-underline"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-plant-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-plant-dark mb-3 sm:mb-4">
              Professional Services
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Beyond plants - we provide complete gardening solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-plant-primary to-plant-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            Ready to Beautify Your Space?
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
            Join thousands of plant lovers who trust Plant.pk
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/register?type=buyer"
              className="px-6 sm:px-8 py-3 bg-white text-plant-primary rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 btn-primary-hover"
            >
              Start Shopping
            </Link>
            <Link
              to="/register?type=seller"
              className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-200 btn-primary-hover"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

