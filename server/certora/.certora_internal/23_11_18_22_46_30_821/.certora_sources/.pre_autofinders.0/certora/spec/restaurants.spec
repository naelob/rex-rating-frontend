

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
    uint before_nb_reviews;
    uint after_nb_reviews;

    // First attempt to add a review.
    before_nb_reviews = addReview(reviewText, rating, user, restaurantId);
    
    // Attempt to add another review for the same restaurant by the same user.
    after_nb_reviews = addReview(reviewText, rating, user, restaurantId);
    require before_nb_reviews == after_nb_reviews;
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






