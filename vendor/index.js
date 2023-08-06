'use strict';

const events = require('./eventPool.js');
const {driverDelivered, driverEnRoute, driverPickedUp} = require('./handler.js');

const data = {
  event: 'Pick-Up',
  requested: Date.now().getTime(),
  payload: {
    store: 'Hello Fresh',
    orderId: 'e687-d2422-w8972-q5227',
    customer: 'Leaura & Dashuan White',
    address: '3278 S. Damen ave Chicago, IL 60659',
  },
};

events.on('Picked-Up', driverPickedUp);
events.on('In-Transit', driverEnRoute);
events.on('Delivered', driverDelivered);
setInterval( () => {
  console.log('------------------');
  events.emit('Pick-Up', data);
}, 10000);
