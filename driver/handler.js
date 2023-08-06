'use strict';

const events = require('../eventPool');

function delivered(data) {
  const order = data.payload.orderId;
  events.emit('Delivered', { event: 'Delivered', order });
}

function enRoute(data) {
  const route = data.payload.address;
  const order = data.payload.orderId;
  events.emit('In-Transit', { event: 'In-Transit', route, order });
  setInterval(() => {
    delivered(data.payload);
  }, 200);
}
function pickedUp(data) {
  const order = data.payload.orderId;
  const route = data.payload.address;
  const time = Date.now().getTime();

  events.emit('Picked-Up', { event: 'Picked-Up', order, route, time });

  enRoute(data.payload);
}

module.exports = { pickedUp, enRoute, delivered };
