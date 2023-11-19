function generateData(restaurantId, addr) {
    const data_to_encode_in_qr = `http://127.0.0.1:5173/qr-callback?restaurantId=${restaurantId}&addr=${addr}`;
    return data_to_encode_in_qr;
}


module.exports = {
    generateData
};