export const restaurantReviewsAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_country",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_latitude",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_longitude",
          "type": "string"
        }
      ],
      "name": "addRestaurant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_restaurantId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_photoUrl",
          "type": "string"
        }
      ],
      "name": "addRestaurantPhotoUrl",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_reviewText",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_rating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_userId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_restaurantId",
          "type": "uint256"
        }
      ],
      "name": "addReview",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "addUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_restaurantId",
          "type": "uint256"
        }
      ],
      "name": "getRestaurantReviews",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "reviewText",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "rating",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "userId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "restaurantId",
              "type": "uint256"
            }
          ],
          "internalType": "struct RestaurantReviews.Review[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRestaurants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "addresse",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "country",
              "type": "string"
            },
            {
              "internalType": "string[]",
              "name": "photoUrls",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "latitude",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "longitude",
              "type": "string"
            }
          ],
          "internalType": "struct RestaurantReviews.Restaurant[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "restaurantById",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addresse",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "country",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "latitude",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "longitude",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "restaurants",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addresse",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "country",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "latitude",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "longitude",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reviewById",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "reviewText",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "userId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "restaurantId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reviews",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "reviewText",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "userId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "restaurantId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "reviewsByRestaurant",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userById",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]