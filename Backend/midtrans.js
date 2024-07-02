const midtransClient = require('midtrans-client');

// Create Snap API instance
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-PUUdoGz-9cLzYr1JcTc_qZS-',
    clientKey: 'SB-Mid-client-jEtvZoEqwphlbnRo'
});

module.exports = snap;
