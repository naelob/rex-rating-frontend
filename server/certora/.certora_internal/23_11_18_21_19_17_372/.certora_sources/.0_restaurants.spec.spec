

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
        string memory _reviewText, 
        uint _rating, 
        address _userAddress, 
        uint _restaurantId
    ) external envfree;

    function getRestaurants() external envfree;

    function getRestaurantReviews() external envfree;
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

hook addRestaurant(string memory _name, ...) {
    uint restaurantId = restaurants.length - 1;
    assert(restaurants[restaurantId].id == restaurantId);
    assert(keccak256(bytes(restaurants[restaurantId].name)) == keccak256(bytes(_name)));
    ...
}



//
// Invariants
//
