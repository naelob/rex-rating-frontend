// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-auto fixed top-5 left-40 right-40 text-white px-4 rounded-3xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <img src='logo-rex.png' className='w-20'/>
          <Link to="/" className="text-black no-underline font-bold	 hover:text-gray-300">
            rexo :)
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/community" className="text-black no-underline mx-4 font-bold	 hover:text-gray-300">
            maps
          </Link>
          <Link to="/creators" className="text-black no-underline mx-4 font-bold	 hover:text-gray-300">
            list
          </Link>
          <button className="bg-black-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            LOG IN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
