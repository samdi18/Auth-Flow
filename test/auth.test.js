const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

describe('Login User!', function () {
  it('POST /api/auth', function (done) {
    chai
      .request(app)
      .post('/api/auth')
      .send({ email: 'samira@gmail.com', password: 'test123' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        expect(res.body).to.be.a('object');
        expect(res.body).to.contain.property('token');
      });

    done();
  });

  it('Wrong email or password /api/auth', function (done) {
    chai
      .request(app)
      .post('/api/auth')
      .send({ email: 'sam@gmail.com', password: 'test12' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(400);
        res.body.errors[0].msg.should.be.eq('Invalid Credentials');
      });

    done();
  });
});

describe('Get User', function () {
  it('GET /api/auth', function (done) {
    chai
      .request(app)
      .get('/api/auth')
      .set(
        'x-auth-token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwYjI1MGFjMWE1ZDkzNDljODJhMjJlIn0sImlhdCI6MTU5NDU2NTg5OSwiZXhwIjoxNTk0OTk3ODk5fQ.OQSu_SY5OCJ29LEg9aL2N8baRQnAYFs0rOxxy0DQCGc'
      )
      .end(function (err, res) {
        console.log(res.body);
        expect(res.body).to.be.a('object');
        expect(res.body).to.contain.property('_id');
        expect(res.body).to.contain.property('name');
        expect(res.body).to.contain.property('email');
      });

    done();
  });

  it('It should not give token if it doesnt exist', function (done) {
    chai
      .request(app)
      .get('/api/auth')
      .set('x-auth-token', '')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(401);
        res.body.msg.should.be.eq('No token, authorization denied');
      });

    done();
  });

  it('It should get if token is wrong', function (done) {
    chai
      .request(app)
      .get('/api/auth')
      .set('x-auth-token', 'wrongtoken')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(401);
        res.body.msg.should.be.eq('Token is not valid');
      });

    done();
  });
});
