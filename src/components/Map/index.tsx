import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { RestaurantType } from '../../utils/types';
import { useContractRead } from 'wagmi';
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import toast from 'react-hot-toast';

const containerStyle = {
  width: '800px',
  height: '450px'
};

const center = {
  lat:  41.032830,
  lng: 28.983250
};

const MyMapComponent = () => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
    const { data, isError, isLoading } = useContractRead({
        address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
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
    const locations = [
      { lat: 41.032830, lng: 28.983250 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
      // Add as many locations as you like
    ];
    
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY} // Replace with your API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyMapComponent);
