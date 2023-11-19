pragma solidity ^0.8.0;

import "./EAS.sol";

interface IWorldID {
	function verifyProof(
		uint256 root,
		uint256 groupId,
		uint256 signalHash,
		uint256 nullifierHash,
		uint256 externalNullifierHash,
		uint256[8] calldata proof
	) external view;
}


library ByteHasher {
	function hashToField(bytes memory value) internal pure returns (uint256) {
		return uint256(keccak256(abi.encodePacked(value))) >> 8;
	}
}

contract RestaurantReviews {
	using ByteHasher for bytes;

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
        uint timestamp; // The block time when the review is submitted
    }

    Restaurant[] public restaurants;
    Review[] public reviews;

	error InvalidNullifier();
	IWorldID internal immutable worldId;
	uint256 internal immutable groupId = 1;
    string internal _appId = "app_staging_44a2dc680e8983d2e95a139885be1e8a";

    mapping(uint => Restaurant) public restaurantById;
    mapping(uint => Review) public reviewById;
    mapping(uint => uint[]) public reviewsByRestaurant;
    mapping(address => mapping(uint => bool)) public hasReviewed;
    // Mapping from restaurant address to a mapping from client address to attestations ID
    mapping(address => mapping(address => bytes32[])) private restaurantClientAttestations;

    mapping(uint256 => mapping(uint256 => bool)) private worldcoinNullifiers;


    EAS eas;

	constructor(EAS _eas, IWorldID _worldId) {
        eas = _eas;
		worldId = _worldId;
	}

    function addAttestation(address restaurant, address client, bytes32 attestationId) private {
        restaurantClientAttestations[restaurant][client].push(attestationId);
    }

    function getAttestationIds(address restaurant, address client) public view returns (bytes32[] memory) {
        return restaurantClientAttestations[restaurant][client];
    }

    function getAttestations(address restaurant, address client) public view returns (Attestation[] memory) {
        bytes32[] memory attestationIds = getAttestationIds(restaurant, client);
        Attestation[] memory attestations = new Attestation[](attestationIds.length);
        for (uint i = 0; i < attestationIds.length; i++) {
            attestations[i] = eas.getAttestation(attestationIds[i]);
        }
        return attestations;
    }

    function hasAttestation(address restaurant, address client) public view returns (bool) {
        return restaurantClientAttestations[restaurant][client].length > 0;
    }

    function addRestaurant(
        string memory _name, 
        string memory _postalAddress, 
        string memory _city, 
        string memory _country, 
        string memory _photoUrl,
        string memory _latitude, 
        string memory _longitude
    ) public {
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
        uint _restaurantId,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        string memory _actionId
    ) public {
        require(_rating > 0 && _rating <= 5, "Invalid rating; must be between 1 and 5");
        require(_restaurantId < restaurants.length, "Invalid restaurant ID");
        require(hasAttestation(restaurants[_restaurantId].ethAddress, msg.sender), "User has not visited the restaurant");
        require(!hasReviewed[msg.sender][_restaurantId], "User has already reviewed this restaurant");

        uint256 actionNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
        require(!worldcoinNullifiers[actionNullifier][nullifierHash], "Nullifier has already been used");

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(msg.sender).hashToField(),
            nullifierHash,
            actionNullifier,
            proof
        );

        worldcoinNullifiers[actionNullifier][nullifierHash] = true;

        uint reviewId = reviews.length;
        Review memory newReview = Review(
            reviewId, 
            _reviewText, 
            _rating, 
            msg.sender, 
            _restaurantId,
            block.timestamp
        );
        reviews.push(newReview);
        reviewById[reviewId] = newReview;
        reviewsByRestaurant[_restaurantId].push(reviewId);
        hasReviewed[msg.sender][_restaurantId] = true;
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

    function getRestaurantsAndReviews() public view returns (Restaurant[] memory, Review[][] memory) {
        Restaurant[] memory restaurantList = getRestaurants();
        Review[][] memory reviewsList = new Review[][](restaurantList.length);

        for (uint i = 0; i < restaurantList.length; i++) {
            reviewsList[i] = getRestaurantReviews(restaurantList[i].id);
        }

        return (restaurantList, reviewsList);
    }

    function getRestaurantByOwner(address owner) public view returns (Restaurant memory) {
        for (uint i = 0; i < restaurants.length; i++) {
            if (restaurants[i].ethAddress == owner) {
                return restaurants[i];
            }
        }

        revert("No restaurant found");
    }

    function getClientRestaurantsAndReviews(address client) public view returns (Restaurant[] memory, Review[] memory) {
        uint restaurantCount = restaurants.length;
        Restaurant[] memory visitedRestaurants = new Restaurant[](restaurantCount);
        Review[] memory clientReviews = new Review[](restaurantCount);
        uint visitedCount = 0;

        for (uint i = 0; i < restaurantCount; i++) {
            if (hasAttestation(restaurants[i].ethAddress, client)) {
                visitedRestaurants[visitedCount] = restaurants[i];
                clientReviews[visitedCount] = _getClientReviewForRestaurant(client, i);
                visitedCount++;
            }
        }

        // Resize the arrays to the actual number of visited restaurants
        assembly {
            mstore(visitedRestaurants, visitedCount)
            mstore(clientReviews, visitedCount)
        }

        return (visitedRestaurants, clientReviews);
    }

    function _getClientReviewForRestaurant(address client, uint restaurantId) private view returns (Review memory) {
        uint[] memory reviewIds = reviewsByRestaurant[restaurantId];
        for (uint i = 0; i < reviewIds.length; i++) {
            Review memory review = reviews[reviewIds[i]];
            if (review.userAddress == client) {
                return review;
            }
        }

        return Review(0, "", 0, address(0), 0, 0); // Return an empty review if the client has not reviewed the restaurant
    }

    function attest(AttestationRequest calldata request) external payable returns (bytes32) {
        Restaurant memory restaurant = getRestaurantByOwner(msg.sender);
        bytes32 attestationId = eas.attest(request);
        addAttestation(restaurant.ethAddress, request.data.recipient, attestationId);
        return attestationId;
    }
}