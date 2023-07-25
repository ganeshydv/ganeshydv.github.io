// Mocha  : test framework for unit testing as well as Integration testing
//        https://mochajs.org/
// Supertest : module for api test

// Sinon    : module/ lib for using 'stub' function which is used to run 
//         instead of original function

// Frisby   : used for API testing: sends request to API

// Chai : Assertion Library : https://www.chaijs.com/api/bdd/
// ----------------------------------------------------------
// Supertest :  https://github.com/ladjs/supertest 
//              https://github.com/ladjs/superagent/blob/master/test/node/agency.js

// - It is used for writing API test cases where you have to send rquest to A API

// EX :
const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });

//---------- for auth  ------------------
describe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/user')
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


//---------------- VIMP ---------------
// jab .end() ko use karoge tab expect me agar assertion fail hota hai to wo 
// error end() ko bhejega

//If you are using the .end() method .expect() assertions that fail will not 
// throw - they will return the assertion as an error to the .end() callback. In 
// order to fail the test case, you will need to rethrow or pass err to done(), as follows:
// A
describe('POST /users', function () {
  it('responds with json', function (done) {
    request(app)
      .post('/users')
      .send({ name: 'john' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
// B - promise use then() instead of end and then assert()
describe('GET /users', function () {
  it('responds with json', function () {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(response.body.email, 'foo@bar.com')
      })
  });
});

// C - async/await 
describe('GET /users', function () {
  it('responds with json', async function () {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('foo@bar.com');
  });
});


//------------ send URL params -----------
// Sending a GET request with URL parameters
request(expressApp)
  .get('/api/users/:id')
  .params({ id: 123 })
  .expect(200)
  .end((err, res) => {
    // Your test assertions here
  });

// -------- query() : send QUERY params  -----------

// Sending a GET request with query parameters ex :
//API:   /api/users?name='john'&age=30
request(expressApp)
  .get('/api/users')
  .query({ name: 'John', age: 30 })
  .expect(200)
  .end((err, res) => {
    // Your test assertions here
  });

// --------------- attach() :add files --------

// Example of sending a POST request with a file attached
request(expressApp)
  .post('/upload')
  .attach('fieldname', 'path/to/file.jpg') // Attach the file with the fieldname
  .expect(200)
  .end((err, res) => {
    // Your test assertions here
  });

//---------------------------------------------------------
// HOW to modify response before assertion

//Expectations are run in the order of definition.
//This characteristic can be used to modify the
//response body or headers before executing an assertion.








