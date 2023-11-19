const { ethers } = require('ethers');
const fs = require('fs');

// RPC provider URL
const provider = new ethers.JsonRpcProvider('https://rpc.public.zkevm-test.net');

// Path to the ABI file
const abiPath = './out/RestaurantReviews.sol/RestaurantReviews.json';
// Read the ABI file
const abiJsonContent = fs.readFileSync(abiPath);
const abi = JSON.parse(abiJsonContent).abi;

// Contract address
const contractAddress = '0xe9f59c82D0B974d95880d13bBCA5bbA881e1FB1B';

// Create a contract instance
const restaurantContract = new ethers.Contract(contractAddress, abi, provider);

// Function to get all restaurants
async function getAllRestaurants() {
    try {
        const restaurants = await restaurantContract.hasAttestation('0x4857B9be8cc276A29A4f396B9388B0F361696a14', '0x567d1D21Cad95ac3ddc009ae4603191d7a2FEF8B');
        console.log(restaurants);
        return restaurants;
    } catch (error) {
        console.error('Failed to fetch restaurants:', error);
    }
}

// Execute the function
getAllRestaurants();
