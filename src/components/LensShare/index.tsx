import { useAccount } from 'wagmi';
import { ShareToLens } from '@lens-protocol/widgets-react';
import { formatAddress } from '../../utils';

const LensShare = ({restaurantName}: {restaurantName: string}) => {
    const {address} = useAccount();
    const content = `Hey Frens ! I just reviewed the ${restaurantName} restaurant.`;
  return (
        <div className="mt-10 max-w-sm rounded overflow-hidden shadow-lg restaurant-card">
          <div className="px-6 py-4">
            {address && (
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-indigo-600 bg-indigo-100 py-1 px-3 rounded-full mb-2">
                  {formatAddress(address)}
                </p>
                <ShareToLens
                    content={content}
                />
              </div>
            )}
          </div>
        </div>
    );
};

export default LensShare;
