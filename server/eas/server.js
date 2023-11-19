const express = require('express');
const cors = require('cors');
const app = express();
const { performAttestationOnChain, retrieveAttestation } = require('./attestation');
const { generateData } = require('./utils');
const QRCode = require('qrcode');

app.use(cors({
    origin: 'http://127.0.0.1:5173',
})); // This will enable CORS for all routes

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send('Running like hell');
});

/*app.get('/scan-qr', async (req, res) => {
    try {
        // Extract data from request body, e.g., eventId, voteIndex
        const { restaurantId, addr } = req.query;

        // Call your attestation function here
        const uid = await performAttestationOnChain(); 

        //TODO: store the attestation somewhere, call to Maxence API

        res.json({ success: true, uid: uid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});*/

app.get('/submit-review', async (req, res) => {
    try {
        // Extract necessary data from request, user ID and attestation UID
        const { userId, attestationUid } = req.query;

        // Retrieve the attestation
        const attestation = await retrieveAttestation(attestationUid);

        // Validate the attestation (implement the validation logic as needed)
        if (isValidAttestation(attestation, userId)) {
            // Logic to handle the review submission
            // e.g., save the review to a database

            res.json({ success: true, message: 'Review submitted successfully.' });
        } else {
            res.status(403).json({ success: false, message: 'Invalid or expired attestation.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/generate-qr', async (req, res) => {
    // You can pass parameters via query strings if needed
    const { restaurantId, addr } = req.query; 


    if (!restaurantId) {
        return res.status(400).send('No data provided for QR code');
    }
    
    const emb_data = generateData(restaurantId, addr);
    console.log(emb_data);

    try {
        // Generate QR Code
        const qrImage = await QRCode.toDataURL(emb_data);

        // Send QR Code Image as response
        res.send(qrImage);
    } catch (error) {
        console.error('Error generating QR code:', error);
        return res.status(500).send('Error generating QR code');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


function isValidAttestation(attestation, userId) {
    // Involve checking the attestation's expiration, matching user IDs, etc.
    // Return true if valid, false otherwise
    return true
}



//const uid = performAttestation(0,0);
//const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
//retrieveAttestation(userId,uid);


// User scan restaurant QR -> call API to generate attestation
// Later ...
// User click on review -> call to retrieve attestation

// From frontEND to create qr code
// GET http://localhost/generate_qr?restaurantId=0 -> retrieve image

// From front end when checking for attestation
// GET http://localhost/submit-review?user_wallet


