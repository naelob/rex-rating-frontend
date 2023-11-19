pragma solidity ^0.8.19;
pragma certoraRun verify

contract RestaurantReviews {

    struct Restaurant {
        uint id;
        string name;
        string addresss;
        string city;
        string country;
        string[] photoUrls;
    }

    struct User {
        uint id;
        string username;
    }

    struct Review {
        uint id;
        string reviewText;
        uint rating; // e.g., from 1 to 5
        uint userId;
        uint restaurantId;
    }

    Restaurant[] public restaurants;
    User[] public users;
    Review[] public reviews;

    mapping(uint => Restaurant) public restaurantById;
    mapping(uint => User) public userById;
    mapping(uint => Review) public reviewById;
    mapping(uint => uint[]) public reviewsByRestaurant;

    function addRestaurant(string memory _name, string memory _address, string memory _city, string memory _country) public {
        uint restaurantId = restaurants.length;
        string[] memory photoUrls;
        Restaurant memory newRestaurant = Restaurant(restaurantId, _name, _address, _city, _country, photoUrls);
        restaurants.push(newRestaurant);
        restaurantById[restaurantId] = newRestaurant;
    }

    function addRestaurantPhotoUrl(uint _restaurantId, string memory _photoUrl) public {
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");
        restaurants[_restaurantId].photoUrls.push(_photoUrl);
    }

    function addUser(string memory _username) public {
        uint userId = users.length;
        User memory newUser = User(userId, _username);
        users.push(newUser);
        userById[userId] = newUser;
    }

    function addReview(string memory _reviewText, uint _rating, uint _userId, uint _restaurantId) public {
        require(_rating > 0 && _rating <= 5, "Invalid rating; must be between 1 and 5");
        require(_userId < users.length, "Invalid user ID");
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");

        uint reviewId = reviews.length;
        Review memory newReview = Review(reviewId, _reviewText, _rating, _userId, _restaurantId);
        reviews.push(newReview);
        reviewById[reviewId] = newReview;
        reviewsByRestaurant[_restaurantId].push(reviewId);
    }

    function getRestaurants() public view returns (Restaurant[] memory) {
        return restaurants;
    }

    function getRestaurantReviews(uint _restaurantId) public view returns (Review[] memory) {
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");

        uint[] memory reviewIds = reviewsByRestaurant[_restaurantId];
        Review[] memory restaurantReviews = new Review[](reviewIds.length);

        for (uint i = 0; i < reviewIds.length; i++) {
            restaurantReviews[i] = reviews[reviewIds[i]];
        }

        return restaurantReviews;
    }

}