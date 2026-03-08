// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Filter,
  Search,
  Grid,
  List,
  Star,
  Leaf,
  Flower2,
  Sprout,
  Trees
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [products] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e78bcb9e1',
      category: 'indoor',
      rating: 4.8,
      seller: 'Green House Nursery',
      description: 'Large tropical plant with unique holey leaves.',
      stock: 25,
      tags: ['popular', 'low-maintenance']
    },
    {
      id: 2,
      name: 'Rose Bouquet',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43',
      category: 'flowers',
      rating: 4.9,
      seller: 'Flower Paradise',
      description: 'Fresh cut roses in various colors.',
      stock: 50,
      tags: ['fresh', 'gift']
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355',
      category: 'indoor',
      rating: 4.7,
      seller: 'Urban Jungle',
      description: 'Low maintenance air-purifying plant.',
      stock: 40,
      tags: ['air-purifying', 'low-light']
    },
    {
      id: 4,
      name: 'Lavender Seeds',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'seeds',
      rating: 4.5,
      seller: 'Organic Seeds Co',
      description: 'Aromatic lavender seeds for your garden.',
      stock: 100,
      tags: ['herbal', 'fragrant']
    },
    {
      id: 5,
      name: 'Bonsai Tree',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'outdoor',
      rating: 4.9,
      seller: 'Zen Gardens',
      description: 'Beautiful miniature tree for meditation spaces.',
      stock: 12,
      tags: ['premium', 'artistic']
    },
    {
      id: 6,
      name: 'Orchid Plant',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'flowers',
      rating: 4.6,
      seller: 'Floral Magic',
      description: 'Elegant flowering orchid plant.',
      stock: 30,
      tags: ['elegant', 'blooming']
    },
    {
      id: 7,
      name: 'Lemon Tree',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'outdoor',
      rating: 4.7,
      seller: 'Fruit Garden',
      description: 'Dwarf lemon tree for home gardens.',
      stock: 20,
      tags: ['fruit-bearing', 'edible']
    },
    {
      id: 8,
      name: 'Herb Seed Collection',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      category: 'seeds',
      rating: 4.8,
      seller: 'Kitchen Garden',
      description: 'Collection of 8 different herb seeds.',
      stock: 75,
      tags: ['kitchen', 'starter-pack']
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Plants', icon: Leaf, count: products.length },
    { id: 'indoor', label: 'Indoor Plants', icon: Leaf, count: products.filter(p => p.category === 'indoor').length },
    { id: 'outdoor', label: 'Outdoor Plants', icon: Trees, count: products.filter(p => p.category === 'outdoor').length },
    { id: 'flowers', label: 'Flowers', icon: Flower2, count: products.filter(p => p.category === 'flowers').length },
    { id: 'seeds', label: 'Seeds', icon: Sprout, count: products.filter(p => p.category === 'seeds').length }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Plants & Flowers
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover our wide collection of indoor plants, outdoor plants, flowers, and seeds
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 w-full">
          <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-6 lg:mb-0 lg:sticky lg:top-20">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-plant-primary" />
              Filters
            </h2>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plant-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-plant-primary text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 mr-3" />
                        <span>{category.label}</span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-white/30'
                            : 'bg-gray-100'
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setPriceRange([0, 500]);
              }}
              className="w-full py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4 min-w-0">
          {/* View Controls */}
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-4 sm:mb-6">
            <div className="text-gray-600 text-sm sm:text-base">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-plant-primary text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-plant-primary text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-card p-4 sm:p-6 hover:shadow-hover transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            Sold by: {product.seller}
                          </span>
                        </div>

                        <div className="text-xl sm:text-2xl font-bold text-plant-primary mt-3 sm:mt-4">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
