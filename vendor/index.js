'use strict';

// const events = require('./eventPool.js');
const {driverDelivered, driverEnRoute, driverPickedUp, startVendor} = require('./handler.js');
const { io } = require('socket.io-client');
const event = require('../utility.js');

const vendor = io('ws://localhost:3000');


vendor.on(event.acknowledged, (data) => console.log(data.message));
vendor.on(event.pickedUp, driverPickedUp);
vendor.on(event.inTransit, driverEnRoute);
vendor.on(event.delivered, driverDelivered);


setInterval(() => {
  console.log('------------------');
  startVendor(vendor);
}, 5000);


module.exports = { vendor };
