'use strict';
const {event, chance} = require('../utility.js');

function delivered(payload , driver) {
  driver.emit(event.delivered, { event: 'Delivered', payload});
}

function enRoute(payload, driver) {
  console.log('+++++', payload);
  driver.emit(event.inTransit, { event: 'In-Transit', payload, message: `DRIVER: EnRoute to ${payload.order.data.address}`});
  setTimeout(() => {
    delivered(payload, driver);
  }, chance.integer({min: 5000, max:10000}));
}
function pickedUp(payload , driver) {
  const time = Date.now();
  driver.emit(event.pickedUp, { event: 'Picked-Up', payload , time , message: `Driver Picked-up order:${payload.messageId}`});
  enRoute(payload, driver);
}
function startDriver(driver){
  console.log('driver 2 is started');
  driver.emit(event.ready);
  driver.on(event.pickupReady, (payload) => pickedUp(payload, driver));
}
module.exports = { pickedUp, enRoute, delivered, startDriver };
