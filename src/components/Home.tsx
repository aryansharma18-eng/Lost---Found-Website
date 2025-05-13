import React from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lost Something? Found Something?
        </h1>
        <p className="text-xl text-gray-600">
          Connect lost items with their owners at Chitkara University
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Link to="/lost" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-green-600" /> 
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">Lost an Item?</h2>
          <p className="text-gray-600 text-center">
            Report your lost item with your university ID and description.
            We'll help you find it.
          </p>
        </Link>

        <Link to="/found" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
          <Search className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">Found an Item?</h2>
          <p className="text-gray-600 text-center">
            Report a found item with your university ID and help return it to its owner.
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Report</h3>
            <p className="text-gray-600">Submit details about lost or found items using your university ID</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Match</h3>
            <p className="text-gray-600">Our system matches lost items with found reports</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Retrieve</h3>
            <p className="text-gray-600">Collect your item from the designated lost and found room</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;