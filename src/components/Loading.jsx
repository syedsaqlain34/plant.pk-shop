// src/components/Loading.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Loading = ({ fullScreen = false, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-plant-light via-white to-plant-accent/10">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="w-20 h-20 bg-gradient-to-br from-plant-primary to-plant-dark rounded-full flex items-center justify-center mb-6"
        >
          <Leaf className="h-10 w-10 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
          <p className="text-gray-600">Please wait while we prepare your green space</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-plant-primary border-t-transparent rounded-full mb-4"
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
