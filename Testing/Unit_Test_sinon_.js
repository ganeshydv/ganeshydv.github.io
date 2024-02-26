const assert = require('assert');
const sinon = require('sinon');

// add.js
module.exports = function add(a, b) {
    return a + b;
};

  // test.js
const add = require('./add');
const chai = require('chai');
const expect = chai.expect;

describe('add function', () => {
  it('should add two numbers', () => {
    const result = add(1, 2);
    expect(result).to.equal(3);
  });

  it('should return a number', () => {
    const result = add(1, 2);
    expect(result).to.be.a('number');
  });
});