const ethers = require('ethers');

async function main() {
    // Replace with your private key
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.JsonRpcProvider('https://rpc.public.zkevm-test.net');
    const wallet = new ethers.Wallet(privateKey, provider);

    // ABI of the SchemaRegistry contract
    const abi = [
        "function register(string calldata schema, address resolver, bool revocable) external returns (bytes32)"
    ];

    // Address of the deployed SchemaRegistry contract
    const contractAddress = '0xB8ee10271a113FB684EaE02C3d84F7e729a7bb9c';

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Call the register function
    const tx = await contract.register('address client', '0x0000000000000000000000000000000000000000', false);

    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction was mined in block', receipt.blockNumber);
}

main().catch(console.error);