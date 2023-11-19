import React, { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import toast from 'react-hot-toast';
import StarRating from './StarRating';

const AddReviewModal = ({restaurantId, isOpen, onRequestClose}) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  const { write, isLoading } = useContractWrite({
    address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
    abi: restaurantReviewsAbi,
    functionName: 'addReview',
    onError(error) {
        toast.error('Failed to fetch addRestaurant()...')
    },
    onSuccess(data) {
        toast.success("You successfully executed the transaction !")
        console.log('Success', data);
    } 
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const restaurantIdNum = ethers.BigNumber.from(restaurantId).toNumber();
    write({ args: [reviewText, rating, Number(restaurantId)] });
  };
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${!isOpen && 'hidden'}`}>
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden p-5 relative">
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-lg text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl text-gray-800 font-semibold mb-4">Create review</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <textarea
            placeholder="Rexy, How was your experience?"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none"
          />
          {/* Icons and other action buttons */}
          <div className="flex justify-between items-center">
            {/* Placeholder for icons */}
            <div className="space-x-2">
              {/* Replace these with actual icons */}
              <StarRating rating={rating} onRating={(rate) => setRating(rate)} />
              {/* ... more buttons */}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-300 hover:bg-green-500 text-white rounded-full disabled:bg-blue-300"
            >
              {isLoading ? 'Submitting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
