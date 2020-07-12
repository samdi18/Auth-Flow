const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');
let mongoose = require('mongoose');

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

// describe('Users', () => {
//   beforeEach((done) => {
//     Before each test we empty the database
//     User.remove({}, (err) => {
//       done();
//     });
//   });
// });
describe('Register User', function () {
  it('POST /api/user', function (done) {
    chai
      .request(app)
      .post('/api/user')
      .send({
        name: 'Samiram',
        email: 'samiram@gmail.com',
        password: 'test123',
      })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        expect(res.body).to.be.a('object');
        expect(res.body).to.contain.property('token');
      });

    done();
  });

  it('If user email already exists', function (done) {
    chai
      .request(app)
      .post('/api/user')
      .send({ name: 'Samira', email: 'samira@gmail.com', password: 'test123' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(400);
        res.body.errors[0].msg.should.be.eq('User already exists');
      });

    done();
  });

  it('If password length is less than 6', function (done) {
    chai
      .request(app)
      .post('/api/user')
      .send({ name: 'Ben', email: 'ben@gmail.com', password: 'test' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(400);
        res.body.errors[0].msg.should.be.eq(
          'Please enter a password with 6 or more characters'
        );
      });

    done();
  });

  it('Name is missing', function (done) {
    chai
      .request(app)
      .post('/api/user')
      .send({ email: 'ya@gmail.com', password: 'test123' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(400);
        res.body.errors[0].msg.should.be.eq('Name is required');
      });

    done();
  });

  it('Email is missing or not valid', function (done) {
    chai
      .request(app)
      .post('/api/user')
      .send({ name: 'Lora', email: 'loragmail', password: 'test123' })
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        console.log(res.body);
        res.should.have.status(400);
        res.body.errors[0].msg.should.be.eq('Please include a valid email');
      });

    done();
  });
});
