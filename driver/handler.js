'use strict';

const events = require('../eventPool');

function delivered(data) {
  const orderId = data.payload.orderId;
  events.emit('Delivered', { event: 'Delivered', orderId });
}

function enRoute(data) {
  const address = data.payload.address;
  const orderId = data.payload.orderId;
  events.emit('In-Transit', { event: 'In-Transit', address, orderId });
  setInterval(() => {
    delivered(data);
  }, 200);
}
function pickedUp(data) {
  const orderId = data.payload.orderId;
  const address = data.payload.address;
  const time = Date.now().getTime();

  events.emit('Picked-Up', { event: 'Picked-Up', orderId , address , time });

  enRoute(data.payload);
}

module.exports = { pickedUp, enRoute, delivered };
