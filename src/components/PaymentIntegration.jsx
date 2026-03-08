import React, { useState } from 'react';
import { 
  loadStripe 
} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucicon-react';

const stripePromise = loadStripe('pk_test_your_publishable_key_here');

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Simulate server-side payment processing
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          paymentMethodId: paymentMethod.id,
        }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        setError(paymentIntent.error);
      } else {
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentIntent.client_secret
        );

        if (confirmError) {
          setError(confirmError.message);
        } else {
          setSuccess(true);
          onSuccess(paymentIntent);
        }
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Card Element */}
        <div className="border rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
            Card Details
          </label>
          <div className="p-3 border rounded bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}
          {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-green-700">Payment successful! Order confirmed.</span>
          </motion.div>
        )}
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <Lock className="h-4 w-4 mr-2 text-green-500" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>
      {/* Payment Button */}
      <button
        type="submit"
        disabled={!stripe || processing || success}
        className="w-full py-4 bg-gradient-to-r from-plant-primary to-plant-dark text-white rounded-lg font-bold text-lg hover:shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Processing Payment
          </span>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};
const PaymentIntegration = ({ amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-xl font-semibold mb-6">Complete Payment</h3>
          <PaymentForm amount={amount} onSuccess={onSuccess} />
        </div>
      </div>
    </Elements>
  );
};
export default PaymentIntegration;
