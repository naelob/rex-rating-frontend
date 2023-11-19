const ethers = require('ethers');

async function main() {
    const provider = new ethers.JsonRpcProvider('https://rpc.public.zkevm-test.net');
    const txReceipt = await provider.getTransactionReceipt('0x73fb2a8ae959971a3f6c26464b9fe3029640b3b82b04749601761eb8b3a869e2');
    console.log(txReceipt.logs);
}

main().catch(console.error);