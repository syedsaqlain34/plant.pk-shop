// Profile-aware navigation: Sell / My Orders / Dashboard by user type
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Leaf,
  Sprout,
  LogOut,
  Settings,
  Package,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Plants', path: '/products?category=plants' },
  { name: 'Flowers', path: '/products?category=flowers' },
  { name: 'Seeds', path: '/products?category=seeds' },
  { name: 'Services', path: '/services' },
  { name: 'Track Order', path: '/track-order' },
];

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  // Close dropdown when clicking outside or on route change
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Profile-aware action button: Buyer → My Orders, Seller → Dashboard, Guest → Sell
  const getActionButton = () => {
    if (user?.type === 'buyer') {
      return {
        label: 'My Orders',
        path: '/buyer',
        icon: Package,
        className: 'bg-plant-light text-plant-dark hover:bg-plant-accent',
      };
    }
    if (user?.type === 'seller') {
      return {
        label: 'Dashboard',
        path: '/seller',
        icon: Sprout,
        className: 'bg-plant-light text-plant-dark hover:bg-plant-accent',
      };
    }
    return {
      label: 'Sell',
      path: '/register?type=seller',
      icon: Sprout,
      className: 'bg-plant-light text-plant-dark hover:bg-plant-accent',
    };
  };

  const actionButton = getActionButton();
  const ActionIcon = actionButton.icon;

  const userMenuItems =
    user?.type === 'buyer'
      ? [
          { name: 'My Orders', path: '/buyer', icon: Package },
          { name: 'Wishlist', path: '/buyer?tab=wishlist', icon: Heart },
          { name: 'Settings', path: '/buyer?tab=settings', icon: Settings },
        ]
      : [
          { name: 'Dashboard', path: '/seller', icon: Package },
          { name: 'Products', path: '/seller?tab=products', icon: Sprout },
          { name: 'Settings', path: '/seller?tab=settings', icon: Settings },
        ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-plant-primary p-1.5 sm:p-2 rounded-full flex-shrink-0"
            >
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-display font-bold text-plant-dark truncate">
              Plant.pk
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-plant-primary transition-colors font-medium text-sm xl:text-base group relative py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-plant-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Action Button + Cart + Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile-aware: My Orders / Dashboard / Sell */}
            <Link
              to={actionButton.path}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 active:scale-[0.98] ${actionButton.className}`}
            >
              <ActionIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>{actionButton.label}</span>
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-plant-primary transition-colors" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </motion.span>
              )}
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                {user ? (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-br from-plant-primary to-plant-accent rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-gray-700 font-medium text-sm max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 hover:text-plant-primary transition-colors" />
                )}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                          <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-medium bg-plant-light text-plant-dark rounded-full">
                            {user.type === 'seller' ? 'Seller' : 'Buyer'}
                          </span>
                        </div>
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-plant-light/50 transition-colors text-sm"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon className="h-4 w-4 text-plant-primary flex-shrink-0" />
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 text-sm font-medium"
                        >
                          <LogOut className="h-4 w-4 flex-shrink-0" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 text-sm font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={link.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-plant-light/50 hover:text-plant-primary rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                {/* Same profile-aware CTA in mobile */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.03 }}>
                  <Link
                    to={actionButton.path}
                    className="flex items-center gap-2 mx-4 py-3 px-4 bg-plant-primary text-white rounded-lg font-medium justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ActionIcon className="h-5 w-5" />
                    {actionButton.label}
                  </Link>
                </motion.div>
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="block mx-4 mt-2 py-3 text-center border border-gray-300 text-gray-700 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block mx-4 mt-2 py-3 text-center bg-plant-dark text-white rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
