var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
var testInput_firstname = "Mocha";
var testInput_lastname =  "Test";
var testInput_email = "mocha.testemail@gmail.com";
var testInput_password = "test";
var propertyid = 43;
var bookingid = 10;

describe('HomeAway Test Cases:', () => {

    // Get Property details
    it("Test Case 1 - Details of an existing property Get", (done) => {
        chai.request('http://localhost:3001/homeaway')
        .get(`/property/${propertyid}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('array');
            res.status.should.be.equal(200);  
            expect(res.body[0].listedBy).to.equal('nikhil@gmail.com')
        done();
        });
    })

    // Get Booking details
    it("Test Case 2 - Details of an existing booking Get", (done) => {
        chai.request('http://localhost:3001/homeaway')
        .get(`/bookings/${bookingid}`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('array');
            res.status.should.be.equal(200);
            expect(res.body[0].propertyID).to.equal(45);
        done();
        });
    })

    // SignUp Traveler
    it("Test Case 3 - Traveler SignUp Post", (done) => { 

        const travelerSignupData = {
            "firstname" : testInput_firstname, 
            "lastname" : testInput_lastname,
            "email": testInput_email,
            "password" : testInput_password
        }

        chai.request('http://localhost:3001/homeaway')
        .post('/traveller/signup')
        .send(travelerSignupData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('responseMessage').equal('User Added');
        done();
        });
    })

    // Login as Traveler
    it("Test Case 4 - Traveler Login Post", (done) => {

        let travelerLoginData = {
            "email": testInput_email,
            "password" : testInput_password
        }

        chai.request('http://localhost:3001/homeaway')
        .post('/traveller/login')
        .send(travelerLoginData)
        .end(function (err, res) {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('responseMessage').equal('Login Successful');
        done();
        });
    })

    // SignUp Owner
    it("Test Case 5 - Owner SignUp Post", (done) => { 

        let ownerSignupData = {
            "firstname" : testInput_firstname, 
            "lastname" : testInput_lastname,
            "email": testInput_email,
            "password" : testInput_password
        }

        chai.request('http://localhost:3001/homeaway')
        .post('/owner/signup')
        .send(ownerSignupData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('responseMessage').equal('Owner profile added to traveller login');
        done();
        });
    })

    // Login as Owner
    it("Test Case 6 - Owner Login Post", (done) => {

        let ownerLoginData = {
            "email": testInput_email,
            "password" : testInput_password
        }
        chai.request('http://localhost:3001/homeaway')
        .post('/owner/login')
        .send(ownerLoginData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.body.should.have.property('responseMessage').equal('Login Successful');
        done();
        });
    })

    // Search for Property listings
    it("Test Case 7 - Search for Property listings Post", (done) => {

        let propertySearchdata = {
            city : "columbia",
            startDate : "2018-10-30",
            endDate : "2018-10-31",
            noOfGuests: "3"
        }
        chai.request('http://localhost:3001/homeaway')
        .post('/property/search')
        .send(propertySearchdata)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.should.be.json;
            expect(res.body.length).to.equal(3)
        done();
        });
    })

    // Get Profile details
    it("Test Case 8 - Get Profile Details Post", (done) => {
        chai.request('http://localhost:3001/homeaway')
        .post('/profile')
        .send({"email": testInput_email})
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.should.be.json;
            var obj = JSON.parse(res.text)
            expect(obj[0].firstname).to.equal("Mocha")
            expect(obj[0].lastname).to.equal("Test")
            expect(obj[0].created).to.equal("2018")
        done();
        });
    })
})