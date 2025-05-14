import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Discount badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discountPercentage}% OFF
        </div>
      )}
      
      {/* Favorite button */}
      <button 
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-colors duration-200"
        aria-label="Add to favorites"
      >
        <Heart size={18} />
      </button>
      
      {/* Product image with hover zoom effect */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="p-4">
        {/* Category tag */}
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </div>
        
        {/* Product name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-gray-900 font-bold">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm ml-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock status */}
          <span className={`text-xs px-2 py-0.5 rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      {/* Add to cart button - slides up on hover */}
      <div className="absolute -bottom-14 left-0 right-0 group-hover:bottom-0 transition-all duration-300">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex items-center justify-center w-full py-3 px-4 text-white transition-colors ${
            product.inStock 
              ? 'bg-teal-600 hover:bg-teal-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;