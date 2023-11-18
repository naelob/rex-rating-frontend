import { useAccount, useEnsName } from 'wagmi';
import useQRCode from './useQrCode';
import toast from 'react-hot-toast';
import Spinner from '../Spinner';

const QRCode = () => {
    const {address} = useAccount();
    const { data, isError, isLoading } = useEnsName({
        address: address,
    })    
    const { qrCode, isLoading: isQrLoading, error } = useQRCode("0xfEec72d5153E5328fAC8adea4be592Ec15c9320a");
    
    function formatAddress(address: `0x${string}`) {
        // Ensure the address is a string and has the expected length
        if (typeof address === 'string' && address.length >= 42) {
          // Get the first 6 characters (including '0x') and the last 4 characters
          return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }
        return address;
    }

    if (isQrLoading) return <Spinner />;

    if (error){
        toast.error("An error occurred while generating QR code.");
    }
  return (
        <div className="mt-10 max-w-sm rounded overflow-hidden shadow-lg restaurant-card">
          <div className="px-6 py-4">
            {address && (
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full mb-2">
                  {formatAddress(address)}
                </p>
                {data && (
                  <p className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full mb-2">
                    {data}
                  </p>
                )}
                {qrCode && <img src={qrCode} alt="QR Code" />}
              </div>
            )}
          </div>
        </div>
    );
};

export default QRCode;
