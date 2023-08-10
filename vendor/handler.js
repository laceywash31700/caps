'use strict';


function driverPickedUp(data){
  console.log(`DRIVER: PickedUp order ${data.data.payload.orderId} from warehouse 25b0`);
}

function driverEnRoute(data){
  console.log('+++++++++',data);
  console.log(`DRIVER: enRoute to ${data.customer}`);
}

function driverDelivered(data){
  console.log(`DRIVER: delivered Up ${data.orderId} to ${data.address} at ${Date.now()}`);
}


module.exports = {driverDelivered, driverPickedUp, driverEnRoute };
