import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { useNavigate } from 'react-router-dom';

const Restaurant = ({
  restaurantId ,
  image,
  reviews
}: {
    restaurantId: string;
    image: string;
    reviews: number;
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
    <div className="px-6 py-4">
        <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-4" src="logo-rex.png" alt="Profile avatar" />
            <div className="text-sm">
                <a href=''></a><p className="text-black leading-none">Lens Protocol</p>
                <p className="text-black">13 days ago</p>
            </div>
        </div>
    <p className="text-grey-darker text-base mt-2 text-black">
      Lenny is heading to Devconnect and @lens/ethglobal Istanbul
    </p>
  </div>
  <img className="w-full" src={image} alt="Main content" />
  
  <div className="px-6 py-4 text-black">
    <h2 className=''>Summary</h2>
    SummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummarySummary
    Lenny is heading to Devconnect and @lens/ethglobal Istanbul
    Lenny is heading to Devconnect and @lens/ethglobal Istanbul
    Lenny is heading to Devconnect and @lens/ethglobal Istanbul
    Lenny is heading to Devconnect and @lens/ethglobal Istanbul


   </div>

   <div className="px-6 py-4 flex items-center">
  <span className="flex items-center mr-2">
    <img className="w-5 mr-2" src="coeur.svg" alt="like" />
    <span className='text-black'>Number of reviews</span>
  </span>
  <span className="text-black">{reviews}</span>
</div>
</div>

  );
};

export default Restaurant;
