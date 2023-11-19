import React from 'react';
import { useLocation } from 'react-router-dom';
import { useContractWrite } from 'wagmi';
import { restaurantReviewsAbi } from '../../utils/abis/restaurantReviewsAbi';
import toast from 'react-hot-toast';

const data = [
  "",
  0,
  false,
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  0
];


const QrCallback = () => {
    //TODO
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const addr = searchParams.get('addr'); 
  const schemaId = '0xaa745930d464c70d8272875f7e63ad05721b481ae1bf35ad76fff1e9024adaf1';
  
  const { write, isLoading } = useContractWrite({
    address: '0x9377942972FFEe975a57bFd90098ce1f8650Bec7',
    abi: restaurantReviewsAbi,
    functionName: 'attest',
    onError(error) {
        toast.error('Failed to fetch attest()...')
    },
    onSuccess(data) {
        toast.success("You successfully executed the transaction !")
        console.log('Success', data);
    } 
  });
  
  const handleAttestClick = () => {
    data[0] = addr;
    write({ args: [[schemaId, data]] });

  };

  return (
    <div>
      <button onClick={handleAttestClick} className='hover:border-1  hover:border-yellow-400 outline-none'>Scan Client QR</button>
    </div>
  );
};

export default QrCallback;
