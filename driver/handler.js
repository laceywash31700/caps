'use strict';
const event = require('../utility.js');

function delivered(data) {
  const orderId = data.orderId;
  driver.emit(event.delivered, { event: 'Delivered', orderId });
}

function enRoute(data) {
  const address = data.address;
  const orderId = data.orderId;
  driver.emit(event.inTransit, { event: 'In-Transit', address, orderId });
  setInterval(() => {
    delivered(data);
  }, 10000);
}
function pickedUp(data) {
  const orderId = data.payload.orderId;
  const address = data.payload.address;
  const time = Date.now();
  driver.emit(event.pickedUp, { event: 'Picked-Up', orderId , address , time });
  enRoute(data.payload);
}

module.exports = { pickedUp, enRoute, delivered };
