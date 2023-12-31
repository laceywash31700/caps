'use strict';

// const events = require('./eventPool.js');
const { io } = require('socket.io-client');
const event = require('../utility.js');
const { startDriver} = require('./handler.js');

const driver = io('ws://localhost:3000');

driver.on(event.acknowledged, (data) => console.log(data.message));

startDriver(driver);
