const { EAS, SchemaEncoder } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

async function getEasConnected(onChain) {
    const eas = new EAS(EASContractAddress);
    const provider = ethers.providers.getDefaultProvider(
      "sepolia"
    );

    const privateKey = "YOUR_PRIVATE_KEY"; //restaurator key
    const wallet = new ethers.Wallet(privateKey, provider);
    if (onChain == true) {
        eas.connect(wallet);
    }
    return eas, wallet
}

async function performAttestationOnChain() {
    
    const {eas,wallet}= getEasConnected();

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
    ]);

    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

    try {
        const tx = await eas.attest({
            schema: schemaUID,
            data: {
                recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
                expirationTime: 0,
                revocable: true,
                data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();
        console.log("New attestation UID:", newAttestationUID);
    } catch (error) {
        console.error("Error performing attestation:", error);
    }
    return uid;
}


async function performAttestationOffChain() {

    const {eas,wallet}= getEasConnected();
    const offchain = await eas.getOffchain();

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);


    const offchainAttestation = await offchain.signOffchainAttestation({
      recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: 0,
      // Unix timestamp of current time
      time: 1671219636,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      version: 1,
      nonce: 0,
      schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
      refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
      data: encodedData,
    }, wallet);

    return offchainAttestation;
}

async function retrieveAttestation(uid) {
    const eas = new EAS(EASContractAddress);
    const provider = ethers.providers.getDefaultProvider(
      "sepolia"
    );

    eas.connect(provider);

    const attestation = await eas.getAttestation(uid);

    console.log(attestation); 

    return attestation;
}



module.exports = {
    performAttestationOnChain,
    retrieveAttestation
};