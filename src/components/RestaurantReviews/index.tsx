import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Review from './review';
import {restaurantSummarys} from './../../utils/index'
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import { useContractRead } from 'wagmi';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';
import AddReviewModal from '../AddReviewModal';

const RestaurantReviews = () => {
    const params = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    const { data, isError, isLoading } = useContractRead({
      address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
      abi: restaurantReviewsAbi,
      functionName: 'restaurantById',
      args: [params.restaurantId],
      onError(err) {
        toast.error('Failed to fetch restaurantById()...')
      },
      onSuccess(data) {
        console.log(data);
      }
    });

    const { data: data1, isError: isError1, isLoading: isloading1 } = useContractRead({
      address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
      abi: restaurantReviewsAbi,
      functionName: 'getRestaurantReviews',
      args: [params.restaurantId],
      onError(err) {
        toast.error('Failed to fetch getRestaurantReviews()...')
      },
      onSuccess(data) {
        console.log(data);
        //setDATA(data);
      }
    });
    if (isLoading ||isloading1) return <Spinner/>;
    
  return (
    <div>
    <div className="mt-10 px-10 py-14 flex flex-col items-center">
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  <div className="p-4 space-y-2">
    <div className="flex items-center justify-between">
      <h5 className="text-xl font-bold leading-tight text-gray-900">{data[1]}</h5>
      <span className="flex items-center ml-10 bg-orange-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
        ⭐ GPT-4 Summary Generated
      </span>
      <span className="flex items-center bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
        ⭐ 10
      </span>
    </div>
    <div className="flex">
                    <div className="w-1/2">
                        <img src={data[5]} className='w-full h-full rounded-lg object-cover' />
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
      <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full mr-2">{data[3]}, {data[4]}</span>
    
    </div>
  </div>

  {/* Review section at the bottom */}
  <div className="bg-gray-100 px-4 py-3">
    <div className="flex items-center">
      <img className="w-6 h-6 rounded-full mr-2" src="/logo-rex.png" alt="User avatar" />
      <div className="text-xl text-gray-900 font-bold">
        REVIEWS
      </div>
      <div className="ml-auto text-md rounded-lg px-4 py-1">
        <button onClick={toggleModal}>ADD REVIEW</button>
        <AddReviewModal
          restaurantId={params.restaurantId}
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
        />
      </div>
      
    </div>
    <p className="text-gray-600 text-sm mt-1">
        {
        data1.map(review => {
            return (
                <Review key="1" data={review}/>
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