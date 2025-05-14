import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronRight, Star, Truck, ArrowLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product?.imageUrl || '');
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImage(foundProduct.imageUrl);
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      }
    }
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 mb-6">Product not found.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Home
        </button>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
    
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Home
          </button>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <button 
            onClick={() => navigate(`/?category=${product.category}`)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </button>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 aspect-square">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button 
                className={`aspect-square rounded border-2 overflow-hidden ${
                  currentImage === product.imageUrl ? 'border-teal-600' : 'border-transparent'
                }`}
                onClick={() => setCurrentImage(product.imageUrl)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </button>
              {/* Placeholder images - in a real app these would be additional product images */}
              {[1, 2, 3].map((i) => (
                <button 
                  key={i}
                  className="aspect-square rounded border-2 border-transparent overflow-hidden opacity-50 cursor-not-allowed"
                >
                  <img 
                    src={product.imageUrl} 
                    alt={`${product.name} angle ${i}`} 
                    className="w-full h-full object-cover filter grayscale"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              {/* Product title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-700 ml-2">
                  {product.rating} ({Math.floor(product.rating * 15)} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through ml-2">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Color options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border ${
                          selectedColor === color ? 'ring-2 ring-offset-2 ring-teal-600' : 'ring-1 ring-gray-200'
                        }`}
                        style={{ 
                          backgroundColor: 
                            color.toLowerCase() === 'black' ? '#000' : 
                            color.toLowerCase() === 'white' ? '#fff' : 
                            color.toLowerCase() === 'silver' ? '#C0C0C0' : 
                            color.toLowerCase() === 'gold' ? '#FFD700' :
                            color.toLowerCase() === 'space gray' ? '#5f5f5f' :
                            color.toLowerCase() === 'midnight' ? '#2c2c2c' :
                            color.toLowerCase() === 'starlight' ? '#f9f4f0' :
                            color.toLowerCase() === 'green' ? '#5cb85c' :
                            color.toLowerCase() === 'blue' ? '#2b7de9' :
                            color.toLowerCase() === 'red' ? '#d9534f' :
                            color.toLowerCase() === 'pink' ? '#ff80ab' :
                            color.toLowerCase() === 'purple' ? '#9c27b0' :
                            color.toLowerCase() === 'yellow' ? '#ffeb3b' :
                            color.toLowerCase() === 'orange' ? '#ff9800' :
                            color.toLowerCase() === 'navy' ? '#000080' : '#777'
                        }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button className="text-sm text-teal-600 hover:text-teal-800">
                      Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 text-center border rounded ${
                          selectedSize === size
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Stock status */}
              <div className="flex items-center mb-6">
                <div 
                  className={`h-3 w-3 rounded-full mr-2 ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    product.inStock 
                      ? 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                
                <button
                  className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Heart size={20} className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
              
              {/* Shipping info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Free shipping on orders over $50
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs - simplified for the MVP */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex -mb-px">
              <button className="py-4 px-6 border-b-2 border-teal-600 font-medium text-teal-600">
                Description
              </button>
              <button className="py-4 px-6 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Specifications
              </button>
              <button className="py-4 px-6 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Reviews
              </button>
            </div>
          </div>
          <div className="py-6">
            <p className="text-gray-700">
              {product.description}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              <br /><br />
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;