
// Checkings that should be envfree are indeed envfree
methods {

    function addReview(
        string _reviewText, 
        uint _rating, 
        address _userAddress, 
        uint _restaurantId
    ) external returns (uint) envfree;

    function getRestaurants() external returns (RestaurantReviews.Restaurant[]) envfree;

    function getRestaurantReviews(uint _restaurantId) external returns (RestaurantReviews.Review[]) envfree;
}

//We check all functions are reachable which is not trivial here
// as we deployed a custom EAS version on ZK EVM
rule reachability(method f)
{
	env e;
	calldataarg args;
	f(e,args);
	satisfy true, "a non-reverting path through this method was found";
}

// The whole point of our application is that user are unique and can only let one unique review
// Hence we check that the user can't put two reviews for the same restaurant
rule cannotReviewTwice(address user, uint restaurantId, string reviewText, uint rating) {
    uint before_nb_reviews;
    uint after_nb_reviews;

    // First attempt to add a review.
    before_nb_reviews = addReview(reviewText, rating, user, restaurantId);
    
    // Attempt to add another review for the same restaurant by the same user.
    after_nb_reviews = addReview(reviewText, rating, user, restaurantId);
    assert before_nb_reviews == after_nb_reviews;
}

// We check the storage is actually modified when we add a new restaurant on the chain
// enabling EAS to be associated with it
rule checkStorageIsUpdated(
        string  _name, 
        string  _postalAddress, 
        string  _city, 
        string  _country, 
        string  _photoUrl,
        string  _latitude, 
        string  _longitude
    ) {
    uint total_restaurants;
    uint total_updated_restaurants;
    env e;

    // Addind a restaurant, getting the number of total restaurant
    total_restaurants = addRestaurant(e,_name, _postalAddress, _city, _country, _photoUrl, _latitude, _longitude);
    
    // Attempt to add another restaurant
    total_updated_restaurants = addRestaurant(e,_name, _postalAddress, _city, _country, _photoUrl, _latitude, _longitude);
   
    assert total_restaurants == total_updated_restaurants;
}






