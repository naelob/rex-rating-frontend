import { ShareToLens } from '@lens-protocol/widgets-react';

const LensShare = ({restaurantName}: {restaurantName: string}) => {
    const content = `Hey Frens ! I just reviewed the ${restaurantName} restaurant on Rexo 🦖.`;
  return (
    <ShareToLens
    content={content}
    />
    );
};

export default LensShare;
