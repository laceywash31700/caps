'use strict';

const { Server } = require('socket.io');
const { event, Queue } = require('./utility.js');

const io = new Server();

io.listen(3000);

const driverQueue = new Queue();
const packageQueue = new Queue();
let acmeSocket = null;
let flowerSocket = null;
const acmeVendor = new Queue();
const flowersVendor = new Queue();

function handlePickUp(payload) {
  if (driverQueue.isEmpty()) {
    packageQueue.enqueue(payload);
  } else {
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(event.pickUpReady, payload);
  }
}

function handleDelivered(payload, socket) {
  console.log('vendor acknowledged delivery', payload.messageId);
  if (payload.clientId === '1-800-Flowers') {
    flowersVendor.enqueue(payload);
    flowerSocket.emit(event.delivered, payload);
  }
  if (payload.clientId === 'Acme-Widgets') {
    acmeVendor.enqueue(payload);
    acmeSocket.emit(event.delivered, payload);
  }
  socket.emit(event.acknowledged, { message: 'message is out to Vendor' });
  io.emit(event.delivered, payload);
}

function handleReady(socket) {
  if (packageQueue.isEmpty()) {
    driverQueue.enqueue(socket);
  } else {
    const parcel = packageQueue.dequeue();
    socket.emit(event.pickUpReady, parcel);
  }
}

function handleReceived(payload) {
  if (payload.clientId === '1-800-Flowers') {
    flowersVendor.dequeue();
  } else if (payload.clientId === 'Acme-Widgets') {
    acmeVendor.dequeue();
  }
}

function handleGetAll(storeName, socket) {
  if (storeName === '1-800-Flowers') {
    flowerSocket = socket;
    flowersVendor.queue.forEach((order) => socket.emit(event.delivered, order));
  } else if (storeName === 'Acme-Widgets') {
    acmeSocket = socket;
    acmeVendor.queue.forEach((order) => socket.emit(event.delivered, order));
  }
}

function handlePickedUp(payload) {
  if (payload.clientId === '1-800-Flowers') {
    flowersVendor.enqueue(payload.message);
  } else if (payload.clientId === 'Acme-Widgets') {
    acmeVendor.enqueue(payload.message);
  }
}

function handleInTransit(payload) {
  if (payload.clientId === '1-800-Flowers') {
    flowersVendor.enqueue(payload.message);
  } else if (payload.clientId === 'Acme-Widgets') {
    acmeVendor.enqueue(payload.message);
  }
}

function connectionHandler(socket) {
  console.log(`we got connected on ${socket.id} `);
  socket.on(event.pickUpReady, (payload) => handlePickUp(payload, socket));
  socket.on(event.pickedUp, (payload) => handlePickedUp(payload, socket));
  socket.on(event.ready, (payload) => handleReady(payload, socket));
  socket.on(event.inTransit, (payload) => handleInTransit(payload, socket));
  socket.on(event.delivered, (payload) => handleDelivered(payload, socket));
  socket.on('received', handleReceived);
  socket.on('getAll', (storeName) => handleGetAll(storeName, socket));
}

function startServer() {
  console.log('The Server is up and running');
  io.on('connection', connectionHandler);
}

module.exports = {
  io,
  startServer,
  handlePickUp,
  handlePickedUp,
  handleInTransit,
  handleGetAll,
  handleDelivered,
  handleReady
};
