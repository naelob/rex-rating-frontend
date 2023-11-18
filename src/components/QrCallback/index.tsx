import React from 'react';
import { useLocation } from 'react-router-dom';

const QrCallback = () => {
    //TODO
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); 

  const handleAttestClick = () => {
    console.log(`Attest clicked for ID: ${id}`);
    // Additional logic for attestation
  };

  return (
    <div>
      <button onClick={handleAttestClick} className='hover:border-1  hover:border-yellow-400 outline-none'>Scan Client QR</button>
    </div>
  );
};

export default QrCallback;
