import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { useNavigate } from 'react-router-dom';
import { RestaurantType } from '../../utils/types';
import restaurantSummarys from '../../utils';

const Restaurant = ({
  restaurantId ,
  data
}: {
    restaurantId: string;
    data: RestaurantType
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurants/${restaurantId}`);
    };
    
  return (
    <div 
    className="mt-10 max-w-sm rounded overflow-hidden shadow-lg restaurant-card"
    onClick={handleClick}
    >
      <div className="px-6">
        <div className="flex flex-col justify-center px-6 py-4">
          <div className="flex items-center mb-2">
            <img className="w-10 h-10 rounded-full mr-4" src="logo-rex.png" alt="Profile avatar" />
            <div className="flex flex-col justify-center">
              <p className="text-black leading-none">{data.name}</p>
            </div>
          </div>
          <div className='px-[70px] mb-2'>
            <p className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 rounded-full mr-2">{data.city}, {data.country}</p>
          </div>
          <p className="text-grey-darker text-base text-black">
            French restaurant in Paris
          </p>
        </div>
      </div>
      <img className="w-full" src={data.photoUrl as string} alt="Main content" />
  
      <div className="px-6 py-4 text-black">
        <h2 className=''>Summary</h2>
        <p className="text-gray-600 text-sm">
                        {restaurantSummarys[Number(restaurantId)].split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
                       </p>
      </div>

      <div className="px-6 py-4 flex items-center">
        <span className="flex items-center mr-2">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
            Number of reviews</span>
        </span>
        <span className="flex items-center bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2">
          12
          <img className="w-3 ml-1" src="coeur.svg" alt="like"/>
        </span>

      </div>
    </div>

  );
};

export default Restaurant;
