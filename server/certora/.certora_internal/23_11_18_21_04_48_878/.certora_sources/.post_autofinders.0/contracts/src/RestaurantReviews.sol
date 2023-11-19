pragma solidity ^0.8.19;

import "./EAS.sol";

contract RestaurantReviews {

    struct Restaurant {
        uint id;
        string name;
        string postalAddress;
        string city;
        string country;
        string photoUrl;
        string latitude;
        string longitude;
        address ethAddress;
    }

    struct Review {
        uint id;
        string reviewText;
        uint rating; // e.g., from 1 to 5
        address userAddress;
        uint restaurantId;
    }

    Restaurant[] public restaurants;
    Review[] public reviews;

    mapping(uint => Restaurant) public restaurantById;
    mapping(uint => Review) public reviewById;
    mapping(uint => uint[]) public reviewsByRestaurant;
    mapping(address => mapping(uint => bool)) public hasReviewed;

    EAS eas;

    constructor(EAS _eas) {
        eas = _eas;
    }

    function addRestaurant(
        string memory _name, 
        string memory _postalAddress, 
        string memory _city, 
        string memory _country, 
        string memory _photoUrl,
        string memory _latitude, 
        string memory _longitude
    ) public {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020000, 1037618708482) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020001, 7) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020003, 5461) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00026006, _longitude) }
        uint restaurantId = restaurants.length;
        Restaurant memory newRestaurant = Restaurant(
            restaurantId, 
            _name, 
            _postalAddress, 
            _city, 
            _country, 
            _photoUrl, 
            _latitude, 
            _longitude,
            msg.sender
        );
        restaurants.push(newRestaurant);
        restaurantById[restaurantId] = newRestaurant;
    }

    function addReview(
        string memory _reviewText, 
        uint _rating, 
        address _userAddress, 
        uint _restaurantId
    ) public {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000000, 1037618708480) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000001, 4) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000003, 85) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00006003, _restaurantId) }
        require(_rating > 0 && _rating <= 5, "Invalid rating; must be between 1 and 5");
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");
        //require(eas.hasAttestation(restaurants[_restaurantId].ethAddress, _userAddress), "User has not visited the restaurant");
        require(!hasReviewed[_userAddress][_restaurantId], "User has already reviewed this restaurant");

        uint reviewId = reviews.length;
        Review memory newReview = Review(
            reviewId, 
            _reviewText, 
            _rating, 
            _userAddress, 
            _restaurantId
        );
        reviews.push(newReview);
        reviewById[reviewId] = newReview;
        reviewsByRestaurant[_restaurantId].push(reviewId);
        hasReviewed[_userAddress][_restaurantId] = true;
    }

    function getRestaurants() public view returns (Restaurant[] memory) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010000, 1037618708481) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010001, 0) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010002, 0) }
        return restaurants;
    }

    function getRestaurantReviews(uint _restaurantId) public view returns (Review[] memory) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030000, 1037618708483) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030001, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030003, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00036000, _restaurantId) }
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");

        uint[] memory reviewIds = reviewsByRestaurant[_restaurantId];
        Review[] memory restaurantReviews = new Review[](reviewIds.length);

        for (uint i = 0; i < reviewIds.length; i++) {
            restaurantReviews[i] = reviews[reviewIds[i]];
        }

        return restaurantReviews;
    }
}