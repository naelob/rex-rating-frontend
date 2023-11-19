import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { formatAddress } from '../../utils';

const Review = ({
    data
}) => {
    
  return (
    
<div className="mt-10 max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden md:max-w-2xl">
    <div className="md:flex">
        <div className="p-4">
            <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                <span className="text-gray-500 text-lg">
                {Number(data.rating)} ⭐
            </span>
                </div>
                <div className="ml-3">
                    <h3 className="text-lg bg-gray-200 text-black font-semibold mb-2 px-2 py-1 rounded mr-2">{formatAddress(data.userAddress)}</h3>
                    <p className="text-gray-500 text-sm">{data.reviewText}</p>
                    <div className='flex mt-5'>
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-2">Merkle 0x87..2</span>
                    <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-2">Unique ID</span>
                    <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded mr-2">{Number(data.timestamp)}</span>

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
