

methods {
    function addRestaurant(
        string  _name, 
        string  _postalAddress, 
        string  _city, 
        string  _country, 
        string  _photoUrl,
        string  _latitude, 
        string  _longitude
    ) external envfree;


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

/*rule reachability(method f)
{
	env e;
	calldataarg args;
	f(e,args);
	satisfy true, "a non-reverting path through this method was found";
}*/

/*
  Invariants
*/

invariant restaurantCount() 
    balanceOf(0) == 0
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
        require recipient    == alice || recipient    == bob;
        require e.msg.sender == alice || e.msg.sender == bob;
        require restaurants.length == restaurantById.keys().length;
    }
}






