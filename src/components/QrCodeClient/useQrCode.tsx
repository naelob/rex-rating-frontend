import React, { useState, useEffect } from 'react';

const useQRCode = (userAddress: `0x${string}`) => {
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userAddress) {
        const fetchQRCode = async () => {
          try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/generate-qr?restaurantId=0&addr=${userAddress}`);
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response);
            const imageBlob = await response.text()
            
            //const imageUrl = await response.json();
            //console.log('DATA QR '+ imageUrl);

            setQrCode(imageBlob);
          } catch (err) {
            console.log("ERROR: "+ err);
            
            //setError(err as Errpr);
          } finally {
            setIsLoading(false);
          }
        };
  
        fetchQRCode();
      } else {
        // Set loading to false if parameters are not defined
        setIsLoading(false);
    }
}, [userAddress]);

return { qrCode, isLoading, error };
};

export default useQRCode;