// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Leaf,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    userType: 'buyer',
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        type: formData.userType
      });

      navigate(formData.userType === 'seller' ? '/seller' : '/');
    } catch (error) {
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-plant-light via-white to-plant-accent/10 py-8 sm:py-12 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Account Details
                </h2>

                {/* User Type */}
                <div className="mb-6 grid md:grid-cols-2 gap-4">
                  {['buyer', 'seller'].map((type) => (
                    <label
                      key={type}
                      className={`p-4 border rounded-xl cursor-pointer ${
                        formData.userType === type
                          ? 'border-plant-primary bg-plant-light/30'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={formData.userType === type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userType: e.target.value
                          })
                        }
                        className="sr-only"
                      />
                      {type === 'buyer' ? 'Buyer Account' : 'Seller Account'}
                    </label>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <Link to="/login" className="text-gray-600">
                    Already have an account?
                  </Link>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-plant-primary text-white rounded-lg flex items-center"
                  >
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 sm:p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Profile Details
                </h2>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 border rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-plant-primary text-white rounded-lg"
                  >
                    {loading
                      ? 'Creating Account...'
                      : `Create ${
                          formData.userType === 'seller'
                            ? 'Seller'
                            : 'Buyer'
                        } Account`}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
