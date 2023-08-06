'use strict';


function driverPickedUp(data){
  console.log(`DRIVER: PickedUp order ${data.payload.orderId} from warehouse 25b0`);
}

function driverEnRoute(data){
  console.log(`DRIVER: enRoute to ${data.payload.customer}`);
}

function driverDelivered(data){
  console.log(`DRIVER: delivered Up ${data.payload.orderId} to ${data.payload.address} at ${Date.now().getTime()}`);
}


module.exports = {driverDelivered, driverPickedUp, driverEnRoute };
