import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactConfetti from 'react-confetti';

const RandomNoun = () => {
      const [imageUrl, setImageUrl] = useState('');
  const [style, setStyle] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const changeImage = () => {
      // Images named from 0.jpeg to 15.jpeg
      const imageNumber = Math.floor(Math.random() * 16);
      const newPath = `/nouns/images/nouns_${imageNumber}.svg`;
      setImageUrl(newPath);

      // Get random location within window size
      const x = Math.floor(Math.random() * (window.innerWidth - 100)); // Adjust size as needed
      const y = Math.floor(Math.random() * (window.innerHeight - 100)); // Adjust size as needed
      setStyle({
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 1000 // Ensure the image is above other elements
      });

      // Show the image
      setIsVisible(true);

      // Hide the image after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Change image every 60 seconds
    const intervalId = setInterval(changeImage, 200000);

    // Set first image on initial load
    changeImage();

    // Clear interval on unmount
    return () => {
      clearInterval(intervalId);
      setIsVisible(false); // Ensure the image is hidden
    };
  }, []);

  const handleImageClick = () => {
    setShowConfetti(true);
    //TODO:
    toast.success("Congrats! You get a discount on your next meal!", { position: "bottom-right" });
    setTimeout(() => setShowConfetti(false), 7000); // Stop confetti after 2 seconds
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
          {showConfetti && <ReactConfetti />}
          <img src={imageUrl} alt="Random noun" style={style} className="w-24 h-24 object-cover" onClick={handleImageClick}/>

    </>
  );
};

export default RandomNoun;
