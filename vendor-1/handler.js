'use strict';
const { chance, event } = require('../utility.js');

function sendPickup(client) {
  const data = {
    store: 'chicago',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    company: 'Acme-Widgets',
  };
  const payload = {
    event: 'pickup',
    messageId: data.orderId,
    clientId: 'Acme-Widgets',
    order: data,
  };
  console.log('client is asking for pickup!', payload);
  client.emit(event.pickUpReady, payload);
}

function deliveryReceipt(payload, client) {
  console.log('+++++++++', payload);
  console.log('Thanks for the delivery!', payload.messageId);
  client.emit('received', payload);
}
function startVendor(client) {
  console.log('client is started');
  client.emit('getAll', 'Acme-Widgets');
  client.on(event.delivered, (payload) =>
    console.log('thanks for the delivery', payload.messageId)
  );
  client.on(event.delivered, (payload) => deliveryReceipt(payload, client));
  function ready() {
    sendPickup(client);
    setTimeout(ready, chance.integer({ min: 4000, max: 10000 }));
  }
  ready();
}

function driverPickedUp(payload) {
  console.log(
    `DRIVER: PickedUp order ${payload.messageId} for ${payload.clientId}`
  );
}

function driverEnRoute(payload) {
  console.log(`DRIVER: enRoute to ${payload.order.data.address}`);
}

function driverDelivered(payload) {
  console.log(
    `DRIVER: delivered Up ${payload.messageId} for ${payload.clientId}`
  );
}

module.exports = {
  driverDelivered,
  driverPickedUp,
  driverEnRoute,
  startVendor,
};
