'use strict';

const { Server } = require('socket.io');
const event = require('./utility.js');

const io = new Server();

io.listen(3000);

function handlePickUp(data, socket) {
   socket.emit(event.acknowledged, {message: 'message is out to DRIVER'});
  io.emit(event.pickUpReady, {...data });
}

function handlePickUp(data, socket) {
  socket.emit(event.acknowledged, {message: 'message is out to Vendor'});
  io.emit(event.pickedUp, {...data });
}

function handleInTransit(data, socket) {
  socket.emit(event.acknowledged, {message: 'message is out to Vendor'});
  io.emit(event.inTransit, { ...data });
}


function handleDelivered(data, socket) {
  socket.emit(event.acknowledged, {message: 'message is out to Vendor'});
  io.emit(event.delivered, { ...data });
}


function connectionHandler(socket) {
  console.log(`we got connected on ${socket.id} `);
  socket.on(event.pickReady, (data) => handlePickUp(data, socket));
  socket.on(event.pickedUp, (data) => handlePickedUp(data,socket));
  socket.on(event.inTransit,(data) => handleInTransit(data,socket));
  socket.on(event.delivered, (data) => handleDelivered(data,socket));
}

function startServer() {
  console.log('The Server is up and running');
  io.on('connection', connectionHandler);
}

module.exports = { startServer };
