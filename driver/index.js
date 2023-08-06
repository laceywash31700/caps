'use strict';

const events = require('./eventPool.js');
const {pickUp} = require('./handler.js');
const {enRoute} = require('./handler.js');

events.on('Pick-up', pickUp);
events.on('In-Transit', enRoute);
