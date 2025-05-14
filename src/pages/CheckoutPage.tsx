import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ChevronRight, Check, CreditCard, Truck } from 'lucide-react';

type ShippingMethod = 'standard' | 'express';
type PaymentMethod = 'credit_card' | 'paypal';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });
  
  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleShippingMethodChange = (method: ShippingMethod) => {
    setShippingMethod(method);
  };
  
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };
  
  const isShippingFormValid = () => {
    return (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode
    );
  };
  
  const isPaymentFormValid = () => {
    if (paymentMethod === 'paypal') return true;
    
    return (
      paymentInfo.cardNumber &&
      paymentInfo.cardName &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv
    );
  };
  
  const handleSubmit = () => {
    if (step === 'shipping' && isShippingFormValid()) {
      setStep('payment');
    } else if (step === 'payment' && isPaymentFormValid()) {
      setStep('review');
    } else if (step === 'review') {
      // Process order
      alert('Thank you for your order! We have received your payment.');
      clearCart();
      navigate('/');
    }
  };
  
  const getShippingCost = () => {
    if (cart.totalPrice >= 50 && shippingMethod === 'standard') {
      return 0;
    }
    return shippingMethod === 'standard' ? 8.99 : 19.99;
  };
  
  const getTax = () => {
    return cart.totalPrice * 0.08;
  };
  
  const getTotal = () => {
    return cart.totalPrice + getShippingCost() + getTax();
  };
  
  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'shipping' || step === 'payment' || step === 'review' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step === 'shipping' ? 1 : <Check size={18} />}
              </div>
              <div className="ml-2 mr-8">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
              </div>
            </div>
            
            <div className="flex items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'payment' || step === 'review' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step === 'payment' ? 2 : step === 'review' ? <Check size={18} /> : 2}
              </div>
              <div className="ml-2 mr-8">
                <p className="text-sm font-medium text-gray-900">Payment</p>
              </div>
            </div>
            
            <div className="flex items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'review' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-900">Review</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Shipping Form */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                    
                    <div className="space-y-3">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${
                          shippingMethod === 'standard' ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                        }`}
                        onClick={() => handleShippingMethodChange('standard')}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="standard"
                            name="shippingMethod"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={() => handleShippingMethodChange('standard')}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                          />
                          <label htmlFor="standard" className="ml-3 block">
                            <div className="flex justify-between">
                              <div>
                                <span className="text-sm font-medium text-gray-900">Standard Shipping</span>
                                <p className="text-sm text-gray-500">Delivery in 5-7 business days</p>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {cart.totalPrice >= 50 ? 'Free' : formatCurrency(8.99)}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${
                          shippingMethod === 'express' ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                        }`}
                        onClick={() => handleShippingMethodChange('express')}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="express"
                            name="shippingMethod"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={() => handleShippingMethodChange('express')}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                          />
                          <label htmlFor="express" className="ml-3 block">
                            <div className="flex justify-between">
                              <div>
                                <span className="text-sm font-medium text-gray-900">Express Shipping</span>
                                <p className="text-sm text-gray-500">Delivery in 1-3 business days</p>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {formatCurrency(19.99)}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Form */}
              {step === 'payment' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${
                        paymentMethod === 'credit_card' ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                      }`}
                      onClick={() => handlePaymentMethodChange('credit_card')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit_card"
                          name="paymentMethod"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => handlePaymentMethodChange('credit_card')}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor="credit_card" className="ml-3 block">
                          <span className="text-sm font-medium text-gray-900">Credit / Debit Card</span>
                        </label>
                        <div className="ml-auto flex space-x-2">
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${
                        paymentMethod === 'paypal' ? 'border-teal-600 bg-teal-50' : 'border-gray-300'
                      }`}
                      onClick={() => handlePaymentMethodChange('paypal')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => handlePaymentMethodChange('paypal')}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor="paypal" className="ml-3 block">
                          <span className="text-sm font-medium text-gray-900">PayPal</span>
                        </label>
                        <div className="ml-auto">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit_card' && (
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-4">Card Information</h3>
                      
                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentInfoChange}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                            placeholder="MM/YY"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            placeholder="123"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 mb-4">You will be redirected to PayPal to complete your payment.</p>
                      <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2"></div>
                      <p className="text-gray-500 text-sm">PayPal checkout</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Order Review */}
              {step === 'review' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Your Order</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Shipping Information</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="mb-1">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p className="mb-1">{shippingInfo.address}</p>
                      <p className="mb-1">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Shipping Method</h3>
                    <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                      <div className="flex items-center">
                        <Truck size={18} className="text-gray-500 mr-2" />
                        <p>
                          {shippingMethod === 'standard' ? 'Standard Shipping (5-7 days)' : 'Express Shipping (1-3 days)'}
                        </p>
                      </div>
                      <p className="font-medium">
                        {shippingMethod === 'standard' && cart.totalPrice >= 50 
                          ? 'Free' 
                          : formatCurrency(getShippingCost())}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Payment Method</h3>
                    <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                      <div className="flex items-center">
                        <CreditCard size={18} className="text-gray-500 mr-2" />
                        <p>
                          {paymentMethod === 'credit_card' 
                            ? `Credit Card ending in ${paymentInfo.cardNumber.slice(-4)}` 
                            : 'PayPal'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Order Items</h3>
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <ul className="divide-y divide-gray-200">
                        {cart.items.map((item) => (
                          <li key={item.product.id} className="py-3 flex justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-3">
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-3">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    {formatCurrency(cart.totalPrice)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {getShippingCost() === 0 ? 'Free' : formatCurrency(getShippingCost())}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">
                    {formatCurrency(getTax())}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(getTotal())}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={
                  (step === 'shipping' && !isShippingFormValid()) ||
                  (step === 'payment' && !isPaymentFormValid())
                }
                className={`w-full mt-6 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  ((step === 'shipping' && isShippingFormValid()) ||
                   (step === 'payment' && isPaymentFormValid()) ||
                   step === 'review')
                    ? 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 'shipping' && 'Continue to Payment'}
                {step === 'payment' && 'Review Order'}
                {step === 'review' && 'Place Order'}
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;