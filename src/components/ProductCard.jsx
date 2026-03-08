// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-card overflow-hidden group h-full flex flex-col card-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          <span className="bg-plant-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>
        
        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Eye className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        {/* Quick Add to Cart */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-plant-primary text-white py-3 font-semibold hover:bg-plant-dark transition-colors flex items-center justify-center"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </motion.button>
      </div>
      
      {/* Product Info */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-base sm:text-lg text-gray-800 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Sold by: {product.seller}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-2 mt-auto pt-2">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-plant-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="text-plant-primary hover:text-plant-dark font-medium text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
