// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Restaurant from './Restaurant';

const Home: React.FC = () => {

    const restaurants = [
        {
            "id": "1",
            "name": "bouillon pigalle",
            "location": "paris, france",
            "number_reviews": 12,
            "image": "bouillon.jpeg"
        },
        {
            "id": "2",
            "name": "bouillon pigalle",
            "location": "paris, france",
            "number_reviews": 12,
            "image": "istanbul.jpg"

        },
        {
            "id": "3",
            "name": "bouillon pigalle",
            "location": "paris, france",
            "number_reviews": 12,
            "image": "nyc-steak.webp"

        }
    ]
  return (
    <div>
        <div className="px-10 py-14 flex flex-col items-center">

        {restaurants.map(restaurant => {
            return (
                <div style={{marginBottom: 10}} key={restaurant.id}>
                    <Restaurant
                        restaurantId={restaurant.id}
                        image={restaurant.image}
                        reviews={restaurant.number_reviews}
                    />
                </div>
            )
        })}
        </div>
    </div>
  );
};

export default Home;
