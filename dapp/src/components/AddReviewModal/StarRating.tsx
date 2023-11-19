import React from 'react';

const StarRating = ({ rating, onRating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              onClick={() => onRating(ratingValue)}
            />
            <svg
              className={`w-8 h-8 cursor-pointer ${
                ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.942c.143.439.499.76.961.835l4.173.607c1.014.147 1.42 1.396.686 2.108l-3.019 2.942c-.349.34-.508.842-.416 1.322l.713 4.164c.178 1.045-.918 1.84-1.85 1.346l-3.737-1.965a1.34 1.34 0 00-1.248 0l-3.737 1.965c-.932.494-2.028-.3-1.85-1.345l.713-4.164c.092-.48-.067-.982-.416-1.322l-3.019-2.942c-.734-.712-.328-1.96.686-2.108l4.173-.607a1.34 1.34 0 00.961-.835l1.286-3.942z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
