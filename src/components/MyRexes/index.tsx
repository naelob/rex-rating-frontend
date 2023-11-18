import { useAccount, useContractRead } from 'wagmi';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';
import { AddRestaurantForm } from './AddRestaurantForm';
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import { useState } from 'react';
import RestaurantReviews from '../RestaurantReviews';
import RestaurantReviewSolo from './RestaurantReviewSolo';

function formatAddress(address: `0x${string}`) {
  // Ensure the address is a string and has the expected length
  if (typeof address === 'string' && address.length >= 42) {
    // Get the first 6 characters (including '0x') and the last 4 characters
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  return address;
}

const MyRexes = () => {

  const [hasRestaurant, setHasRestaurant] = useState(false);
  const {address} = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: '0x',
    abi: restaurantReviewsAbi,
    functionName: 'getOwnerRestaurant',
    args: [address],
    onError(err) {
      toast.error('Failed to fetch getOwnerRestaurant()...')
    },
    onSuccess(data) {
      if(data) {
        setHasRestaurant(true);
      }
    }
  });
  if (isLoading) return <Spinner/>;


  return (
        <div className="mt-10 max-w-sm rounded overflow-hidden shadow-lg restaurant-card">
          <div className="px-16 py-10 text-black">
            {address && (
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-white bg-black py-1 px-3 rounded-full mb-2">
                Hey, {formatAddress(address)} !
                </p>
                {hasRestaurant ? (
                <RestaurantReviewSolo restaurantData={data}/>
              ) : (
                <AddRestaurantForm />
              )}
              </div>
            )}
          </div>
        </div>
    );
};

export default MyRexes;
