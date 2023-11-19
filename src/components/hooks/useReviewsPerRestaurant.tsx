import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import toast from 'react-hot-toast';

// Assuming your Restaurant and Review types are defined somewhere
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';

const useReviewsPerRestaurant = () => {
  const [reviewCounts, setReviewCounts] = useState<{ [key: number]: number }>({});

  const { data, isError, isLoading } = useContractRead({
    address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
    abi: restaurantReviewsAbi,
    functionName: 'getRestaurantsAndReviews',
    onSuccess(data) {
      // Handle data processing here
      console.log(data);
    },
    onError(error) {
      console.error('Error fetching data', error);
      toast.error("An error occurred while fetching data.");
    },
  });

  useEffect(() => {
    if (data) {
      const counts = processRestaurantReviews(data[0], data[1]);
      setReviewCounts(counts);
    }
  }, [data]);

  // Function to process data and count reviews
  const processRestaurantReviews = (restaurants, reviews_) => {
    const counts: { [key: string]: number } = {};

    restaurants.forEach((restaurant, index) => {        
      counts[restaurant.id] = reviews_[index].length;
    });

    console.log("counts is "+ JSON.stringify(counts));
    

    return counts;
  };

  return { reviewCounts, isError, isLoading };
};

export default useReviewsPerRestaurant;
