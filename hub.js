'use strict';

const { Server } = require('socket.io');
const {event, Queue, } = require('./utility.js');

const io = new Server();

io.listen(3000);

const driverQueue = new Queue();
const packageQueue = new Queue();

function handlePickUp(data, socket) {
  if(driverQueue.isEmpty()){
    packageQueue.enqueue(data);
  }else{
    socket.emit(event.acknowledged, { message: 'message is out to DRIVER' });
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(event.pickUpReady, data);
  }
}

function handlePickedUp(data, socket) {
  socket.emit(event.acknowledged, { message: 'message is out to Vendor' });
  io.emit(event.pickedUp, data );
}

function handleInTransit(data, socket) {
  socket.emit(event.acknowledged, { message: 'message is out to Vendor' });
  io.emit(event.inTransit, data);
}

function handleDelivered(data, socket) {
  socket.emit(event.acknowledged, { message: 'message is out to Vendor' });
  io.emit(event.delivered, data);
}

function connectionHandler(socket) {
  console.log(`we got connected on ${socket.id} `);
  socket.on(event.pickUpReady, (data) => handlePickUp(data, socket));
  socket.on(event.pickedUp, (data) => handlePickedUp(data, socket));
  socket.on(event.inTransit, (data) => handleInTransit(data, socket));
  socket.on(event.delivered, (data) => handleDelivered(data, socket));
}

function startServer() {
  console.log('The Server is up and running');
  io.on('connection', connectionHandler);
}

module.exports = { startServer };
