// src/pages/ServicesPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Scissors, 
  Droplet, 
  Sun,
  Shield,
  Truck,
  Users,
  Clock,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const services = [
    {
      id: 1,
      title: 'Gardening & Maintenance',
      description: 'Professional gardening services including planting, pruning, fertilizing, and general plant care.',
      icon: Sprout,
      price: '$50/hr',
      duration: 'Flexible Hours',
      category: 'gardening',
      features: ['Weekly Maintenance', 'Plant Health Check', 'Fertilizer Application']
    },
    {
      id: 2,
      title: 'Plant Trimming & Pruning',
      description: 'Expert trimming and pruning services to keep your plants healthy and aesthetically pleasing.',
      icon: Scissors,
      price: '$35/hr',
      duration: 'On-Demand',
      category: 'maintenance',
      features: ['Seasonal Pruning', 'Dead Branch Removal', 'Shape Maintenance']
    },
    {
      id: 3,
      title: 'Plant Watering Service',
      description: 'Regular watering schedules for your indoor and outdoor plants while you\'re away.',
      icon: Droplet,
      price: '$25/visit',
      duration: 'Daily/Weekly',
      category: 'maintenance',
      features: ['Smart Scheduling', 'Moisture Monitoring', 'Water Quality Check']
    },
    {
      id: 4,
      title: 'Sunlight Optimization',
      description: 'Expert advice on optimal sunlight placement and artificial lighting setup.',
      icon: Sun,
      price: '$40/consultation',
      duration: '2 Hours',
      category: 'consultation',
      features: ['Light Analysis', 'Placement Strategy', 'Grow Light Setup']
    },
    {
      id: 5,
      title: 'Plant Health Protection',
      description: 'Pest control and disease prevention services for your precious plants.',
      icon: Shield,
      price: '$60/treatment',
      duration: 'Monthly',
      category: 'protection',
      features: ['Organic Treatment', 'Pest Prevention', 'Disease Control']
    },
    {
      id: 6,
      title: 'Plant Delivery Service',
      description: 'Safe and secure delivery of plants to your doorstep with proper packaging.',
      icon: Truck,
      price: 'From $15',
      duration: 'Same Day',
      category: 'delivery',
      features: ['Safe Packaging', 'Insurance Included', 'Same Day Delivery']
    },
    {
      id: 7,
      title: 'Garden Design Consultation',
      description: 'Professional garden design consultation for homes and offices.',
      icon: Users,
      price: '$75/session',
      duration: '3 Hours',
      category: 'consultation',
      features: ['3D Design', 'Plant Selection', 'Maintenance Plan']
    },
    {
      id: 8,
      title: 'Emergency Plant Care',
      description: '24/7 emergency plant care services for unexpected plant issues.',
      icon: Clock,
      price: '$80/emergency',
      duration: 'Available 24/7',
      category: 'emergency',
      features: ['Immediate Response', 'Expert Diagnosis', 'Treatment Plan']
    }
  ];
  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'gardening', label: 'Gardening' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'protection', label: 'Protection' },
    { id: 'emergency', label: 'Emergency' }
  ];
  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Professional <span className="text-plant-primary">Plant Services</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
          From expert gardening to emergency plant care, we provide comprehensive plant services 
          to keep your green friends thriving.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-plant-primary transition-colors text-base"
            />
          </div>
        </div>
      </motion.div>
      {/* Filters - horizontally scrollable on mobile */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-4 mb-3 sm:mb-4">
          <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
          <h2 className="text-base sm:text-lg font-semibold">Filter Services</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide sm:flex-wrap sm:overflow-visible">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-plant-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      {/* Services Grid - 1 col mobile, 2 tablet, 3-4 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-plant-primary to-plant-dark rounded-2xl p-6 sm:p-8 text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Need a Custom Service?</h2>
          <p className="text-base sm:text-xl opacity-90 mb-6 sm:mb-8 px-2">
            Contact our plant experts for personalized service packages tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 bg-white text-plant-primary rounded-full font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              Get Free Consultation
            </button>
            <a href="tel:+923001234567" className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors text-center w-full sm:w-auto">
              Call Now: +92 300 123 4567
            </a>
          </div>
        </div>
      </motion.div>
      {/* Features */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-card">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-plant-light rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-plant-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Certified Experts</h3>
          <p className="text-gray-600 text-sm sm:text-base">All our gardeners are certified with 5+ years of experience</p>
        </div>
        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-card">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-plant-light rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-plant-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Service Guarantee</h3>
          <p className="text-gray-600 text-sm sm:text-base">100% satisfaction guarantee or your money back</p>
        </div>
        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-card">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-plant-light rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-plant-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm sm:text-base">Round-the-clock support for all your plant emergencies</p>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;
