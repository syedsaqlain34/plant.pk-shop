// src/components/ServiceCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Star, 
  Users,
  CheckCircle2 
} from 'lucide-react';

const ServiceCard = ({ service }) => {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-card overflow-hidden group h-full flex flex-col card-lift"
    >
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-plant-primary to-plant-accent rounded-lg flex-shrink-0">
            <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div className="flex items-center flex-shrink-0">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold text-sm sm:text-base">4.8</span>
            <span className="text-gray-500 text-xs sm:text-sm ml-1">(124)</span>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{service.title}</h3>
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2 flex-1">{service.description}</p>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 sm:mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>25 Bookings</span>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-auto">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold text-plant-primary">{service.price}</span>
              <span className="text-gray-500 text-xs sm:text-sm ml-2">starting from</span>
            </div>
            <Link
              to={`/services/${service.id}`}
              className="w-full xs:w-auto px-4 py-2.5 sm:py-2 bg-plant-primary text-white rounded-lg hover:bg-plant-dark transition-colors font-medium flex items-center justify-center"
            >
              Book Now
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
