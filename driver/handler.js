'use strict';
const {event, chance} = require('../utility.js');

function delivered(data , driver) {
  const orderId = data.orderId;
  driver.emit(event.delivered, { event: 'Delivered', orderId });
}

function enRoute(data , driver) {
  const address = data.address;
  const orderId = data.orderId;
  driver.emit(event.inTransit, { event: 'In-Transit', address, orderId });
  setTimeout(() => {
    delivered(data, driver);
  }, chance.integer({min: 5000, max:10000}));
}
function pickedUp(data , driver) {
  const orderId = data.payload.orderId;
  const address = data.payload.address;
  const time = Date.now();
  driver.emit(event.pickedUp, { event: 'Picked-Up', orderId , address , time });
  enRoute(data.payload, driver);
}
function startDriver(io){
  console.log('driver is started');
  io.emit(event.ready);
  io.on(event.pickupReady, (data) => pickedUp(data));
}
module.exports = { pickedUp, enRoute, delivered, startDriver };
