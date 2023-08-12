'use strict';
const {chance, event} = require('../utility.js');

function sendPickup(socket){
  const data = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('vendor is asking for pickup!',data);
  socket.emit(event.pickUpReady, data);
}

function ready(socket){
  sendPickup(socket);
  setTimeout(ready, chance.integer({min:4000, max:10000}));
}

function startVendor(socket){
  console.log('vendor is started');
  socket.on(event.delivered, (data) => console.log('thanks for the delivery', data.orderId) );
  ready();
}

function driverPickedUp(data){
  console.log(`DRIVER: PickedUp order ${data.orderId} from warehouse 25b0`);
}

function driverEnRoute(data){
  console.log(`DRIVER: enRoute to ${data.address}`);
}

function driverDelivered(data){
  // console.log('+++++++++',data);
  console.log(`DRIVER: delivered Up ${data.orderId}`);
}


module.exports = {driverDelivered, driverPickedUp, driverEnRoute, startVendor};
