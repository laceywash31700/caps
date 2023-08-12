'use strict';
const chance = require('chance');

let event = {
  pickUpReady: 'Pick-Up Ready',
  pickedUp: 'Picked-Up',
  inTransit: 'In-Transit',
  delivered: 'Delivered',
  acknowledged: 'acknowledged',
  ready: 'ready'
};

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = { chance, event, Queue };
