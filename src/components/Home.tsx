import React, { useEffect, useState } from 'react';
import Restaurant from './Restaurant';
import { useContractRead } from 'wagmi';
import { restaurantReviewsAbi } from '../utils/abis/restaurantReviewsAbi';
import { RestaurantType } from '../utils/types';
import toast from 'react-hot-toast';
import Spinner from './Spinner'; // Import Spinner component

const Home: React.FC = () => {
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
    const { data, isError, isLoading } = useContractRead({
        address: '0x9B019130eE20a37A36a154bc14657B99FE2266F1',
        abi: restaurantReviewsAbi,
        functionName: 'getRestaurants',
        onSuccess(data) {
            console.log('Success', data as RestaurantType[])
            setRestaurants(data as RestaurantType[])
        },
        onError(error) {
            console.log('Error', error)
            toast.error("An error occurred while fetching data.");
        },
    })

    if (isLoading) {
        return <Spinner />;
    }

  return (
    <div>
        <div className="px-10 py-14 flex flex-col items-center">

        {
            !restaurants ? '' : 
            restaurants.map(restaurant => {
            return (
                <div style={{marginBottom: 10}} key={restaurant.id}>
                    <Restaurant
                        restaurantId={String(restaurant.id)}
                        data={restaurant}
                    />
                </div>
            )
        })}
        </div>
    </div>
  );
};

export default Home;
