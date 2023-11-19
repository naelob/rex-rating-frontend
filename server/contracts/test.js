const ethers = require('ethers');
const fs = require('fs');
const { exit } = require('process');

async function main(createRestaurants = true) {
    // Replace with your private key
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai');
    const wallet = new ethers.Wallet(privateKey, provider);

    // ABI of the SchemaRegistry contract
    const schemaRegistryAbi = [
        "function register(string calldata schema, address resolver, bool revocable) external returns (bytes32)"
    ];

    // ABI of the RestaurantReviews contract
    const restaurantReviewsAbi = JSON.parse(fs.readFileSync('./out/RestaurantReviews.sol/RestaurantReviews.json', 'utf8')).abi;
    const schemaRegistryAddress = '0x1f20b901A7459E548F587B934f937Ff9701266c4';

    // Address of the deployed RestaurantReviews contract
    const restaurantReviewsAddress = '0x9377942972FFEe975a57bFd90098ce1f8650Bec7';


    // Create a contract instance
    const schemaRegistryContract = new ethers.Contract(schemaRegistryAddress, schemaRegistryAbi, wallet);
    const restaurantReviewsContract = new ethers.Contract(restaurantReviewsAddress, restaurantReviewsAbi, wallet);

    // Call the register function
    const tx = await schemaRegistryContract.register('address client', '0x0000000000000000000000000000000000000000', false, { gasPrice: ethers.parseUnits('30', 'gwei') });
    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    const schemaId = receipt.logs[0].topics[1];
    console.log('Schema creation transaction was mined in block', receipt.blockNumber);
    console.log('Schema ID:', schemaId);
    //const schemaId = '0xaa745930d464c70d8272875f7e63ad05721b481ae1bf35ad76fff1e9024adaf1';
    
    /* const wallets = [];
    if (createRestaurants) {
        // Create 3 wallets and save their private keys to a txt file
        for (let i = 0; i < 3; i++) {
            const newWallet = ethers.Wallet.createRandom();
            const connectedWallet = newWallet.connect(provider);
            wallets.push(connectedWallet);
            fs.appendFileSync('wallets.txt', `${connectedWallet.privateKey} ${connectedWallet.address}\n`);
        }
    
        // Send 0.00001 eth to each wallet
        for (const restaurantWallet of wallets) {
            const tx = await wallet.sendTransaction({
                to: restaurantWallet.address,
                value: '100000000000000',
                gasPrice: ethers.parseUnits('0.1', 'gwei')
            });
            await tx.wait();
            console.log(`${wallet.address} sent 0.00001 ETH to ${restaurantWallet.address}`);
        }
        console.log('Restaurant wallets funded');

        // Create a list of 3 dict representing restaurants
        const restaurants = [
            {
                name: 'Restaurant 1',
                postalAddress: 'Address 1',
                city: 'City 1',
                country: 'Country 1',
                photoUrl: 'PhotoUrl 1',
                latitude: 'Latitude 1',
                longitude: 'Longitude 1'
            },
            {
                name: 'Restaurant 2',
                postalAddress: 'Address 2',
                city: 'City 2',
                country: 'Country 2',
                photoUrl: 'PhotoUrl 2',
                latitude: 'Latitude 2',
                longitude: 'Longitude 2'
            },
            {
                name: 'Restaurant 3',
                postalAddress: 'Address 3',
                city: 'City 3',
                country: 'Country 3',
                photoUrl: 'PhotoUrl 3',
                latitude: 'Latitude 3',
                longitude: 'Longitude 3'
            }
        ];

        // Use created wallets to add one restaurant with each
        for (let i = 0; i < 3; i++) {
            const restaurant = restaurants[i];
            const restaurantWallet = wallets[i];
            const tx = await restaurantReviewsContract.connect(restaurantWallet).addRestaurant(
                restaurant.name,
                restaurant.postalAddress,
                restaurant.city,
                restaurant.country,
                restaurant.photoUrl,
                restaurant.latitude,
                restaurant.longitude,
                { gasPrice: ethers.parseUnits('0.1', 'gwei') }
            );
            await tx.wait();
            console.log(`${restaurantWallet.address} created a restaurant ${restaurant.name}`);
        }
        console.log('Restaurant created')
    } else {
        const data = fs.readFileSync('wallets.txt', 'utf-8');
        const lines = data.split('\n');
        const lastThreeLines = lines.slice(-4, -1);
    
        for (let line of lastThreeLines) {
            const [privateKey, address] = line.split(' ');
            if (privateKey && address)
                wallets.push(new ethers.Wallet(privateKey, provider));
        }
    }

    // Create 3 wallets and save private keys in another txt
    const clientWallets = [];
    for (let i = 0; i < 3; i++) {
        const newWallet = ethers.Wallet.createRandom();
        const connectedWallet = newWallet.connect(provider);
        clientWallets.push(connectedWallet);
        fs.appendFileSync('clientWallets.txt', `${connectedWallet.privateKey} ${connectedWallet.address}\n`);
    }

    // Make each one be attested by one restaurant
    for (let i = 0; i < 3; i++) {
        const restaurantWallet = wallets[i];
        const clientWallet = clientWallets[i];
        const data = [
            clientWallet.address,
            0,
            false,
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            0
        ];
        const tx = await restaurantReviewsContract.connect(restaurantWallet).attest([schemaId, data], { gasPrice: ethers.parseUnits('0.1', 'gwei') });
        await tx.wait();
        console.log(`${restaurantWallet.address} attested that ${clientWallet.address} came`);
    }
    console.log('Attestations done');

    for (const clientWallet of clientWallets) {
        const tx = await wallet.sendTransaction({
            to: clientWallet.address,
            value: '100000000000000',
            gasPrice: ethers.parseUnits('0.1', 'gwei')
        });
        await tx.wait();
    }
    console.log('Client wallets funded');

    // Make each one review the restaurant he was been attested for
    for (let i = 0; i < 3; i++) {
        const clientWallet = clientWallets[i];
        const restaurantId = i; // Assuming restaurant IDs are sequential starting from 0
        const reviewText = 'Great restaurant!';
        const rating = 5;
        const tx = await restaurantReviewsContract.connect(clientWallet).addReview(reviewText, rating, restaurantId);
        await tx.wait();
        console.log(`${clientWallet.address} reviewed the restaurant with ID ${restaurantId}`);
    }
    console.log('Reviews leaved');

    // Try to make a client leave a review for a restaurant he was not attested by, and display the error
    try {
        const clientWallet = clientWallets[0]; // First client
        const restaurantId = 1; // ID of a restaurant the client was not attested by
        const reviewText = 'Bad restaurant!';
        const rating = 1;
        const tx = await restaurantReviewsContract.connect(clientWallet).addReview(reviewText, rating, restaurantId, { gasPrice: ethers.parseUnits('0.1', 'gwei') });
        await tx.wait();
    } catch (error) {
        console.error('Error leaving review:', error);
    } */
}

main(true)