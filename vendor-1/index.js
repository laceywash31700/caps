'use strict';

// const events = require('./eventPool.js');
const { io } = require('socket.io-client');
const {event} = require('../utility.js');
const {driverDelivered, driverEnRoute, driverPickedUp, startVendor} = require('../vendor-1/handler.js');

const client = io('ws://localhost:3000');

setInterval(() => {
  console.log('------------------');
  startVendor(client);
}, 5000);

client.on(event.acknowledged, (data) => console.log(data.message));
client.on(event.pickedUp, driverPickedUp);
client.on(event.inTransit, driverEnRoute);
client.on(event.delivered, driverDelivered);


module.exports = { client };

