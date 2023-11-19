const ethers = require('ethers');
const fs = require('fs');
const provider = new ethers.JsonRpcProvider('https://rpc.public.zkevm-test.net');
const destinationAddress = '0x605952C802212D4455320Ed20163325c42D9e548';

async function checkAndTransfer() {
    const data = fs.readFileSync('wallets.txt', 'utf-8');
    const lines = data.split('\n');

    for (let line of lines) {
        const [privateKey, address] = line.split(' ');

        if (privateKey && address) {
            const wallet = new ethers.Wallet(privateKey, provider);
            const balance = await provider.getBalance(wallet.address);

            if (balance != 0) {
                const gasPrice = 50000000
                const gasLimit = 21000
                const allFunds = Number(balance) - (gasPrice * gasLimit);

                if (allFunds > 0) {
                    const tx = await wallet.sendTransaction({
                        to: destinationAddress,
                        value: allFunds.toString(),
                        gasLimit: gasLimit.toString(),
                        gasPrice: gasPrice.toString()
                    });

                    await tx.wait();
                    console.log(`Transferred ${allFunds / 1e18} ETH from ${address} to ${destinationAddress}`);
                }
            }
        }
    }
}

checkAndTransfer().catch(console.error);