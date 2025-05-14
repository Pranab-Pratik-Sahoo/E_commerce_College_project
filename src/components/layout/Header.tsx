import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900">TechStyle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/?category=audio" className="text-gray-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Audio
            </Link>
            <Link to="/?category=computers" className="text-gray-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Computers
            </Link>
            <Link to="/?category=phones" className="text-gray-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Phones
            </Link>
            <Link to="/?category=wearables" className="text-gray-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Wearables
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center">
            {/* Search toggle */}
            <button
              className="p-2 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Account */}
            <Link
              to="/login"
              className="p-2 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none transition-colors ml-1"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none transition-colors ml-1 relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="ml-2 md:hidden p-2 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 sm:top-20 left-0 right-0 bg-white shadow-md p-4 z-50 transform transition-transform ease-in-out">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={toggleSearch}
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 sm:top-20 left-0 right-0 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/?category=audio"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Audio
            </Link>
            <Link
              to="/?category=computers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Computers
            </Link>
            <Link
              to="/?category=phones"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </Link>
            <Link
              to="/?category=wearables"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wearables
            </Link>
            <Link
              to="/?category=accessories"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
            <Link
              to="/?category=tvs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              TVs
            </Link>
            <Link
              to="/?category=gaming"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gaming
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;