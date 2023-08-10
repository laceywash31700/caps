'use strict';

// const events = require('./eventPool.js');
const {driverDelivered, driverEnRoute, driverPickedUp} = require('./handler.js');
const { io } = require('socket.io-client');
const event = require('../utility.js');

const vendor = io('ws://localhost:3000');


vendor.on(event.acknowledged, (data) => console.log(data.message));
vendor.on(event.pickedUp, driverPickedUp);
vendor.on(event.inTransit, driverEnRoute);
vendor.on(event.delivered, driverDelivered);

const data = {
  event: 'Pick-Up',
  requested: Date.now(),
  payload: {
    store: 'Hello Fresh',
    orderId: 'e687-d2422-w8972-q5227',
    customer: 'Leaura & Dashuan White',
    address: '3278 S. Damen ave Chicago, IL 60659',
  },
};


setInterval(() => {
  console.log('------------------');
  vendor.emit(event.pickUpReady, data);
}, 5000);


module.exports = { vendor };
