import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { 
  products, 
  categories, 
  getFeaturedProducts, 
  getProductsByCategory, 
  searchProducts 
} from '../data/products';

const HomePage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');
  
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const [heroTitle, setHeroTitle] = useState('Welcome to TechStyle');
  const [heroSubtitle, setHeroSubtitle] = useState('Your destination for premium tech products');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (searchParam) {
      const results = searchProducts(searchParam);
      setDisplayedProducts(results);
      setCurrentCategory(null);
      setHeroTitle(`Search results for "${searchParam}"`);
      setHeroSubtitle(`Found ${results.length} products matching your search`);
      setHeroImage('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    } else if (categoryParam) {
      if (categoryParam === 'featured') {
        const featuredProducts = getFeaturedProducts();
        setDisplayedProducts(featuredProducts);
        setCurrentCategory('featured');
        setHeroTitle('Featured Products');
        setHeroSubtitle('Our selection of premium featured products');
        setHeroImage('https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      } else {
        const categoryProducts = getProductsByCategory(categoryParam);
        setDisplayedProducts(categoryProducts);
        setCurrentCategory(categoryParam);
        
        const category = categories.find(cat => cat.id === categoryParam);
        if (category) {
          setHeroTitle(category.name);
          setHeroSubtitle(category.description);
          setHeroImage(category.imageUrl);
        }
      }
    } else {
      setDisplayedProducts(products);
      setCurrentCategory(null);
      setHeroTitle('Welcome to TechStyle');
      setHeroSubtitle('Your destination for premium tech products');
      setHeroImage('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    }
  }, [categoryParam, searchParam]);
  
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-gray-900/90 to-gray-900/70 text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">{heroSubtitle}</p>
            {!searchParam && !categoryParam && (
              <Link
                to="/?category=featured"
                className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
              >
                Shop Featured Products
                <ChevronRight size={20} className="ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Category Section (only show on homepage) */}
      {!categoryParam && !searchParam && (
        <div className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/?category=${category.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent flex items-end">
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-medium text-white">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Products Section */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            {searchParam 
              ? `Search Results (${displayedProducts.length})` 
              : currentCategory 
                ? (currentCategory === 'featured' ? 'Featured Products' : `${categories.find(cat => cat.id === currentCategory)?.name} Products`) 
                : 'All Products'}
          </h2>
          
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-lg text-gray-600 mb-4">No products found.</p>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Section (only show on homepage) */}
      {!categoryParam && !searchParam && (
        <div className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
              <Link
                to="/?category=featured"
                className="text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getFeaturedProducts().slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Promo Section */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-600">30 day money back guarantee</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Payments</h3>
                <p className="text-sm text-gray-600">Protected by encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;