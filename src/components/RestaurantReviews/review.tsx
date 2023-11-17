import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Review = () => {
    
  return (
    
<div className="mt-10 max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden md:max-w-2xl">
    <div className="md:flex">
        <div className="p-4">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                <span className="text-gray-500 text-lg">
                5 ⭐
            </span>
                </div>
                <div className="ml-3">
                    <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">@henry90210</h2>
                    <h3 className="text-lg leading-6 text-gray-600">0x01928hY128</h3>
                    <p className="text-gray-500 text-sm">Really good restaurant, french pastries were awesome !</p>
                    <div className='flex mt-5'>
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-2">Merkle 0x87..2</span>
                    <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-2">Unique ID</span>
                    <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded mr-2">12 hours left to review</span>
                    {/*<span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2">ZK Oracle</span>
  <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">ZK Oracle</span>*/}


                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center p-4">
        
            <button className="ml-auto flex items-center px-4 py-2 border rounded text-sm font-medium border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100">
                Share on Lens
            </button>
        </div>
    </div>
</div>
  );
}

export default Review;
