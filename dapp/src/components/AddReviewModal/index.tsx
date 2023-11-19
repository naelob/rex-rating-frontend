import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import toast from 'react-hot-toast';
import StarRating from './StarRating';
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { BigNumber } from 'ethers'
import { decode } from '../../utils';

const AddReviewModal = ({restaurantId, isOpen, onRequestClose}) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const ACTION_ID = `review_${restaurantId}`;
  

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setIsVerifying(true);
    }
  };

  const handleVerificationSuccess = (proof) => {
    setProof(proof);
    write!();
    setIsVerifying(false);
    // Now you can submit the review along with the proof
    // Consider calling a function here that handles the review submission
  };
 

	const [proof, setProof] = useState<ISuccessResult | null>(null)
	const { address } = useAccount()

  //WORLDCOIN INTEGRATION
  const { config } = usePrepareContractWrite({
		address: import.meta.env.VITE_CONTRACT,
		abi: restaurantReviewsAbi,
		enabled: proof != null && address != null && reviewText!== '' && rating!=null,
		functionName: 'addReview',
		args: [
			reviewText, 
      rating, 
      Number(restaurantId),
			proof?.merkle_root ? decode<BigNumber>('uint256', proof?.merkle_root ?? '') : BigNumber.from(0),
			proof?.nullifier_hash ? decode<BigNumber>('uint256', proof?.nullifier_hash ?? '') : BigNumber.from(0),
			proof?.proof
				? decode<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
						'uint256[8]',
						proof?.proof ?? ''
				  )
				: [
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
				  ],
          ACTION_ID
		],
	})
	const { write } = useContractWrite(config)



  /*const { write, isLoading } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT,
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
    //const restaurantIdNum = ethers.BigNumber.from(restaurantId).toNumber();
    write({ args: [reviewText, rating, Number(restaurantId)] });
  };*/
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-0 flex justify-center items-center ${!isOpen && 'hidden'}`}>
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden p-5 relative">
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-lg text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl text-gray-800 font-semibold mb-4">Create review</h2>
        {!isVerifying ? (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-10">
          <textarea
            placeholder="Rexy, How was your experience?"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none"
            value={reviewText}
            onChange={handleReviewChange}
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
              onClick={handleReviewSubmit}
              className="px-4 py-2 bg-green-300 hover:bg-green-500 text-white rounded-full disabled:bg-blue-300"
            >
              Add review
            </button>
          </div>
        </form>) : (
          address ? (
            proof ? (
              <button onClick={write}>submit tx</button>
            ) : 
          
          (
            <div className='div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden p-5 relative world-id-widget-class'>
              <IDKitWidget
              signal={address}
              action={ACTION_ID}
              onSuccess={handleVerificationSuccess}
              app_id={import.meta.env.VITE_WORLDCOIN_APP_ID!}
            >
              {({ open }) => <button onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
            </div>
            
          )) : (
            "connect your wallet"
          )
        )}
      </div>
    </div>
  );
};

export default AddReviewModal;
