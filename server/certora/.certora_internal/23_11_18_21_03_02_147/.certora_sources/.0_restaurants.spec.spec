

methods {
    function addRestaurant(
        string memory _name, 
        string memory _postalAddress, 
        string memory _city, 
        string memory _country, 
        string memory _photoUrl,
        string memory _latitude, 
        string memory _longitude
    ) external envfree;
}

/* 
	Property: Make sur we can add restaurantd.
*/
rule reachability(method f)
{
	env e;
	calldataarg args;
	f(e,args);
	satisfy true, "a non-reverting path through this method was found";
}


//
// Invariants
//
