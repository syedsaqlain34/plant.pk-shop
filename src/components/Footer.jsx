// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Leaf,
  Shield,
  Truck,
  Headphones
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-plant-primary p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-plant-dark">
                Plant.pk
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Pakistan's premier online nursery bringing greenery to your doorstep since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white rounded-full shadow-md hover:bg-plant-light transition-colors">
                <Facebook className="h-5 w-5 text-gray-700" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-md hover:bg-plant-light transition-colors">
                <Instagram className="h-5 w-5 text-gray-700" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-md hover:bg-plant-light transition-colors">
                <Twitter className="h-5 w-5 text-gray-700" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-md hover:bg-plant-light transition-colors">
                <Linkedin className="h-5 w-5 text-gray-700" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-plant-dark">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-plant-primary transition-colors">
                  All Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=indoor" className="text-gray-600 hover:text-plant-primary transition-colors">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=outdoor" className="text-gray-600 hover:text-plant-primary transition-colors">
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=flowers" className="text-gray-600 hover:text-plant-primary transition-colors">
                  Flowers
                </Link>
              </li>
              <li>
                <Link to="/products?category=seeds" className="text-gray-600 hover:text-plant-primary transition-colors">
                  Seeds
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-plant-primary transition-colors">
                  Gardening Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-plant-dark">Our Services</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Truck className="h-4 w-4 mr-2 text-plant-primary" />
                Same Day Delivery
              </li>
              <li className="flex items-center text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-plant-primary" />
                Plant Health Guarantee
              </li>
              <li className="flex items-center text-gray-600">
                <Headphones className="h-4 w-4 mr-2 text-plant-primary" />
                24/7 Support
              </li>
              <li className="text-gray-600">
                Garden Design Consultation
              </li>
              <li className="text-gray-600">
                Plant Maintenance Plans
              </li>
              <li className="text-gray-600">
                Corporate Plant Rental
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-plant-dark">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-plant-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Green Street, DHA Phase 6<br />
                  Lahore, Pakistan
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-plant-primary mr-3 flex-shrink-0" />
                <span className="text-gray-600">+92 300 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-plant-primary mr-3 flex-shrink-0" />
                <span className="text-gray-600">support@plant.pk</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full sm:flex-grow px-4 py-2 border rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-plant-primary"
                />
                <button className="w-full sm:w-auto px-4 py-2 bg-plant-primary text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-plant-dark transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-600 text-sm sm:text-base mb-0">
              © 2024 Plant.pk. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link to="/privacy" className="text-gray-600 hover:text-plant-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-plant-primary transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-600 hover:text-plant-primary transition-colors text-sm">
                Refund Policy
              </Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-plant-primary transition-colors text-sm">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs sm:text-sm text-gray-500 px-2">
            <p>Certified organic plants • 30-day return policy • Secure payment processing</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
