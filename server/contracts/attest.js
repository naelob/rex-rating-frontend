const ethers = require('ethers');

async function main() {
    // Replace with your private key
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.JsonRpcProvider('https://rpc.public.zkevm-test.net');
    const wallet = new ethers.Wallet(privateKey, provider);

    // ABI of the EAS contract
    const abi = [
        "function attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256))) external payable returns (bytes32)"
    ];

    // Address of the deployed EAS contract
    const contractAddress = '0xb4089b7456101EcB72Cb294fC9DED97864d56704';

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Call the attest function
    const tx = await contract.attest([
        '0xaa745930d464c70d8272875f7e63ad05721b481ae1bf35ad76fff1e9024adaf1',
        [
            '0x605952C802212D4455320Ed20163325c42D9e548',
            0,
            false,
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            0
        ]
    ]);

    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction was mined in block', receipt.blockNumber);
}

main().catch(console.error);