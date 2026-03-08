// src/services/api.js
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.plant.pk/v1';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plantpk_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Clear token and redirect to login
          localStorage.removeItem('plantpk_token');
          localStorage.removeItem('plantpk_user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 429:
          console.error('Too many requests');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);
export const authService = {
  login: async (email, password, userType) => {
    const response = await api.post('/auth/login', { email, password, userType });
    localStorage.setItem('plantpk_token', response.token);
    localStorage.setItem('plantpk_user', JSON.stringify(response.user));
    return response;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('plantpk_token', response.token);
    localStorage.setItem('plantpk_user', JSON.stringify(response.user));
    return response;
  },
  logout: () => {
    localStorage.removeItem('plantpk_token');
    localStorage.removeItem('plantpk_user');
  },
  updateProfile: async (userId, data) => {
    return await api.put(`/users/${userId}`, data);
  },
  resetPassword: async (email) => {
    return await api.post('/auth/reset-password', { email });
  }
};
export const productService = {
  getAllProducts: async (params = {}) => {
    return await api.get('/products', { params });
  },
  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },
  getProductsByCategory: async (category, params = {}) => {
    return await api.get(`/products/category/${category}`, { params });
  },
  createProduct: async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    return await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },
  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
  searchProducts: async (query) => {
    return await api.get('/products/search', { params: { q: query } });
  }
};
export const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },
  getOrders: async (userId, userType) => {
    return await api.get('/orders', { params: { userId, userType } });
  },
  getOrderById: async (orderId) => {
    return await api.get(`/orders/${orderId}`);
  },
  updateOrderStatus: async (orderId, status) => {
    return await api.patch(`/orders/${orderId}/status`, { status });
  },
  cancelOrder: async (orderId) => {
    return await api.post(`/orders/${orderId}/cancel`);
  },
  trackOrder: async (trackingId) => {
    return await api.get(`/orders/track/${trackingId}`);
  }
};
export const serviceService = {
  getAllServices: async () => {
    return await api.get('/services');
  },
  getServiceById: async (id) => {
    return await api.get(`/services/${id}`);
  },
  bookService: async (serviceData) => {
    return await api.post('/services/book', serviceData);
  },
  getServiceBookings: async (userId) => {
    return await api.get(`/services/bookings/${userId}`);
  }
};
export const cartService = {
  addToCart: async (userId, productId, quantity) => {
    return await api.post('/cart/add', { userId, productId, quantity });
  },
  getCart: async (userId) => {
    return await api.get(`/cart/${userId}`);
  },
  updateCartItem: async (itemId, quantity) => {
    return await api.put(`/cart/${itemId}`, { quantity });
  },
  removeFromCart: async (itemId) => {
    return await api.delete(`/cart/${itemId}`);
  },
  clearCart: async (userId) => {
    return await api.delete(`/cart/clear/${userId}`);
  }
};
export const paymentService = {
  createPaymentIntent: async (amount, currency = 'USD') => {
    return await api.post('/payment/create-intent', { amount, currency });
  },
  confirmPayment: async (paymentIntentId) => {
    return await api.post('/payment/confirm', { paymentIntentId });
  },
  getPaymentHistory: async (userId) => {
    return await api.get(`/payment/history/${userId}`);
  },
  refundPayment: async (paymentId) => {
    return await api.post('/payment/refund', { paymentId });
  }
};
export const reviewService = {
  createReview: async (reviewData) => {
    return await api.post('/reviews', reviewData);
  },
  getProductReviews: async (productId) => {
    return await api.get(`/reviews/product/${productId}`);
  },
  getSellerReviews: async (sellerId) => {
    return await api.get(`/reviews/seller/${sellerId}`);
  },
  updateReview: async (reviewId, data) => {
    return await api.put(`/reviews/${reviewId}`, data);
  }
};
export default api;