

methods {

    function addReview(
        string _reviewText, 
        uint _rating, 
        address _userAddress, 
        uint _restaurantId
    ) external envfree;

    function getRestaurants() external returns (RestaurantReviews.Restaurant[]) envfree;

    function getRestaurantReviews(uint _restaurantId) external returns (RestaurantReviews.Review[]) envfree;
}

/* 
	Classic reachability
*/

rule reachability(method f)
{
	env e;
	calldataarg args;
	f(e,args);
	satisfy true, "a non-reverting path through this method was found";
}


rule cannotReviewTwice(address user, uint restaurantId, string reviewText, uint rating) {
    Restaurant[] restaurants;
    require restaurantId < restaurants.length; // Restaurant exists.
    require rating >= 0 && rating <= 5; // Valid rating.
    require !hasReviewed[user][restaurantId]; // User has not reviewed this restaurant yet.

    // First attempt to add a review.
    addReview(reviewText, rating, user, restaurantId);
    assert hasReviewed[user][restaurantId]; // After adding, user should have reviewed.

    // Attempt to add another review for the same restaurant by the same user.
    addReview(reviewText, rating, user, restaurantId);
    assert lastTransactionReverted(); // This transaction should fail.
}

/*
  Invariants
*/

/*invariant disallowTwoReviewFromSameUser() 
    1 == 1
{
    preserved addRestaurant(
        string  _name, 
        string  _postalAddress, 
        string  _city, 
        string  _country, 
        string  _photoUrl,
        string  _latitude, 
        string  _longitude
        ) with (env e)
    {
        //require recipient    == alice || recipient    == bob;
        //require e.msg.sender == alice || e.msg.sender == bob;
        require restaurants.length == restaurantById.keys().length;
    }
}*/






