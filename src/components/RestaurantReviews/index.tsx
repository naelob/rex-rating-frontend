import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Review from './review';
import restaurantSummarys from './../../utils/index'

const RestaurantReviews = () => {
    const reviews = [
        {
            "id": 1
        },
        {
            "id": 1
        },
        {
            "id": 1
        },
        {
            "id": 1
        },
        {
            "id": 1
        },
        {
            "id": 1
        }
    ]
    //TODO: get restaurant id in the query param
    //const reviews = fetchReviews(restaurantId);
    const params = useParams();
    
  return (
    <div>
    <div className="mt-10 px-10 py-14 flex flex-col items-center">
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  <div className="p-4 space-y-2">
    <div className="flex items-center justify-between">
      <h5 className="text-xl font-bold leading-tight text-gray-900">Bouillon Pigalle</h5>
      <span className="flex items-center ml-10 bg-orange-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
        ⭐ GPT-4 Summary Generated
      </span>
      <span className="flex items-center bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
        ⭐ 10
      </span>
    </div>
    <div className="flex">
                    <div className="w-1/2">
                        <img src={"/bouillon.jpeg"} className='w-full h-full rounded-lg object-cover' />
                    </div>
                    <div className="w-1/2 p-4" style={{ overflowY: 'auto', maxHeight: '250px' }}>
                        {/* Long summary content here */}
                        <p className="text-gray-600">
                        {restaurantSummarys[Number(params.restaurantId)].split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
                       </p>
                        {/* Add custom scrollbar styles in your CSS */}
                    </div>
                </div>
    <div className="flex">
      <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full mr-2">Paris, France</span>
    
    </div>
  </div>

  {/* Review section at the bottom */}
  <div className="bg-gray-100 px-4 py-3">
    <div className="flex items-center">
      <img className="w-6 h-6 rounded-full mr-2" src="/logo-rex.png" alt="User avatar" />
      <div className="text-xl text-gray-900 font-bold">
        REVIEWS</div>
      {/*<div className="ml-auto text-xs text-gray-600">3 min ago</div>*/}
    </div>
    <p className="text-gray-600 text-sm mt-1">
        {
        reviews.map(review => {
            return (
                <Review key={review.id}/>
            )
        })
    }
    </p>
  </div>
</div>

    </div>
    </div>

  );
}

export default RestaurantReviews;