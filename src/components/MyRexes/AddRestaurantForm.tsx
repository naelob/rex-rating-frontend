import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useContractWrite } from 'wagmi'
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';


async function getCoordinates(address: string): Promise<{ lat: string, lng: string}> {
    // Use your geocoding service here
    // Example with Google Geocoding API (replace with your actual API call)
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_MAPS_API_KEY}`);
    const data = await response.json();
    if (data.status === "OK") {
      return data.results[0].geometry.location; // { lat: ..., lng: ... }
    } else {
        return {
            lat: '', lng: ''
        }
      //throw new Error('Geocoding failed');
    }
  }
  

export const AddRestaurantForm = () => {
    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
        abi: restaurantReviewsAbi,
        functionName: 'addRestaurant',
    })
    const formik = useFormik({
      initialValues: {
        name: '',
        city: '',
        address: '',
        country: '',
        photo_url: '',
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        photo_url: Yup.string().required('Required'), // Assuming this is required; adjust as needed
        }),
      onSubmit: async(values) => {
        try {
            console.log(values);
            // Combine address components
            const fullAddress = `${values.address}, ${values.city}, ${values.country}`;
            const coordinates = await getCoordinates(fullAddress);
      
        
            const contractParams = {
                args: [values.name, values.address, values.city, values.country, values.photo_url, coordinates.lat, coordinates.lng],
            };
    
            // Invoke the write function
            write(contractParams);

            toast.success('Transaction Submitted');
          } catch (error) {
            toast.error(error.message || 'Failed to add restaurant');
          }
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-2'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-3">Restaurant Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className='border-[0.7px] border-black text-black bg-green-100 rounded-md outline-none px-3'
        />
        {formik.touched.name && formik.errors.name ? <div className="text-xs font-semibold text-white bg-red-400 py-1 mx-[70px] rounded-full mb-2">{formik.errors.name}</div> : null}
    
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mt-3">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className='border-[0.7px] border-black text-black bg-green-100 rounded-md outline-none px-3'
        />
        {formik.touched.address && formik.errors.address ? <div className="text-xs font-semibold text-white bg-red-400 py-1 mx-[70px] rounded-full mb-2">{formik.errors.address}</div> : null}
  
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mt-3">City</label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          className='border-[0.7px] border-black text-black bg-green-100 rounded-md outline-none px-3'
        />
        {formik.touched.city && formik.errors.city ? <div className="text-xs font-semibold text-white bg-red-400 py-1 mx-[70px] rounded-full mb-2">{formik.errors.city}</div> : null}
  
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mt-3">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          className='border-[0.7px] border-black text-black bg-green-100 rounded-md outline-none px-3'
        />
        {formik.touched.country && formik.errors.country ? <div className="text-xs font-semibold text-white bg-red-400 py-1 mx-[70px] rounded-full mb-2">{formik.errors.country}</div> : null}
  
        <label htmlFor="photo-url" className="block text-sm font-medium text-gray-700 mt-3">Image</label>
        <input
          id="photo_url"
          name="photo_url"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.photo_url}
          className='border-[0.7px] border-black text-black bg-green-100 rounded-md outline-none px-3'
        />
        {formik.touched.photo_url && formik.errors.photo_url ? <div className="text-xs font-semibold text-white bg-red-400 py-1 mx-[70px] rounded-full mb-2">{formik.errors.photo_url}</div> : null}
  

        <button type="submit" className='bg-black hover:bg-neutral-700	 text-white'>Add a new restaurant</button>
      </form>
    );
  };
  