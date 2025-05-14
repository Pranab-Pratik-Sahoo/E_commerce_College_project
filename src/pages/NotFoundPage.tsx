import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="text-6xl font-bold text-gray-900 mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;