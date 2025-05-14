import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const handleIncrementQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };
  
  const handleDecrementQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <li key={item.product.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product image */}
                        <div className="sm:w-24 h-24 bg-gray-200 rounded flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="sm:ml-6 flex-1">
                          <div className="flex justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link to={`/product/${item.product.id}`} className="hover:text-teal-600">
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </p>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-4">
                            {item.product.category}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => handleDecrementQuantity(item.product.id, item.quantity)}
                                className="p-2 text-gray-600 hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => handleIncrementQuantity(item.product.id, item.quantity)}
                                className="p-2 text-gray-600 hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            {/* Remove button */}
                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-gray-500 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Continue shopping button */}
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Continue Shopping
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(cart.totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {cart.totalPrice >= 50 ? 'Free' : formatCurrency(8.99)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(cart.totalPrice * 0.08)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(
                          cart.totalPrice + 
                          (cart.totalPrice >= 50 ? 0 : 8.99) + 
                          (cart.totalPrice * 0.08)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Shipping message */}
                {cart.totalPrice < 50 && (
                  <div className="mb-6 bg-teal-50 p-3 rounded text-sm text-teal-800">
                    Add <span className="font-semibold">{formatCurrency(50 - cart.totalPrice)}</span> more to qualify for free shipping!
                  </div>
                )}
                
                {/* Checkout button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <CreditCard size={20} className="mr-2" />
                  Proceed to Checkout
                </button>
                
                {/* Payment icons */}
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;