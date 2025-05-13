import React from 'react';
import { Link } from 'react-router-dom';
import { School } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
          <img src="https://www.chitkara.edu.in/chitkara-university-logo.png" alt="logo" title="Chitkara University Logo" className="w-[181px] h-[55px]" />
            <School className="h-8 w-8" />
            <span className="font-bold text-xl">Chitkara Lost & Found</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/lost" className="hover:bg-blue-700 px-3 py-2 rounded-md">Report Lost</Link>
            <Link to="/found" className="hover:bg-blue-700 px-3 py-2 rounded-md">Report Found</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;