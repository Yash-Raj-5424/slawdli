import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2 w-[350px] flex items-center justify-between px-4 py-2 bg-black/10 backdrop-blur-md shadow-xl rounded-full">
      <div className="flex-1 flex justify-center">
        <Link to="/" className="nav-link flex items-center space-x-2 text-white hover:text-gray-100 transition-colors font-medium">
          Home
        </Link>
        <Link to="/dashboard" className="nav-link flex items-center space-x-2 text-white hover:text-gray-100 transition-colors font-medium">
          Dashboard
        </Link>
        <Link to="/reports" className="nav-link flex items-center space-x-2 text-white hover:text-gray-100 transition-colors font-medium">
          Reports
        </Link>
        <Link to="/profile" className="nav-link flex items-center space-x-2 text-white hover:text-gray-100 transition-colors font-medium">
          Profile
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        {/* Theme toggle or user avatar could go here */}
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;