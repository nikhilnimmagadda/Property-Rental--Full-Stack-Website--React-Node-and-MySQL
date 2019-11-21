//Libraries
var express = require('express');
var pool = require('../models/UserDB.js');
var router = express.Router();
var crypt = require('../models/bcrypt.js');

// Validate traveller login user details
router.route('/traveller/login').post(function (req, res) {
  console.log("Inside traveller Login Post");
  var email = req.body.email;
  var lowercaseemail = email.toLowerCase();
  var trimemail = lowercaseemail.trim();
  var password = req.body.password;
  
  pool.query('SELECT * FROM users WHERE email = ?', [trimemail], (err, rows) => {
    
    if (err) {
      console.log("User does not exist");
      res.status(400).json({responseMessage: 'User does not exist'});
    } else {
      if (rows.length > 0) {
        // Check if password matches
        crypt.compareHash(password, rows[0].password, function (err, isMatch) {
          if (isMatch && !err) {
            res.cookie('cookie1',"travellercookie",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie2',trimemail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie3',rows[0].firstname,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = rows[0].email;
            res.status(200).json({responseMessage: 'Login Successful'});
            console.log("Traveler found in DB");
          } else {
            res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
            console.log("Authentication failed. Passwords did not match.");
          }
        })
      }
      else {
        res.status(402).json({responseMessage: 'Authentication failed. User does not exist.'})
        console.log("Authentication failed. User does not exist.");
        
      }
    }
  });
});

// Validate owner login user details
router.route('/owner/login').post(function (req, res) {
  console.log("Inside Owner Login Post");
  var email = req.body.email;
  var lowercaseemail = email.toLowerCase();
  var trimemail = lowercaseemail.trim();
  var password = req.body.password;
  
  pool.query('SELECT * FROM users WHERE email = ?', [trimemail], (err, rows) => {
    if (err) {
      console.log("User does not exist");
      res.status(400).json({responseMessage: 'User does not exist'});
    } else {
      if (rows.length > 0) {
        crypt.compareHash(req.body.password, rows[0].password, function (err, isMatch) {
          if (isMatch && !err && rows[0].isOwner == 'Y') {
            res.cookie('cookie1',"ownercookie",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie2',trimemail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie3',rows[0].firstname,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = rows[0].email;
            console.log("Owner found in DB");
            res.status(200).json({responseMessage: 'Login Successful'});
          } else {
            res.status(401).json({responseMessage: 'Authentication failed. Passwords did not match.'})
            console.log("Authentication failed. Passwords did not match.");
          }
        })
      }
      else {
        res.status(402).json({responseMessage: 'Authentication failed. User does not exist.'})
        console.log("Authentication failed. User does not exist.");
      }
    }
  });
});


// Add traveller users
router.route('/traveller/signup').post(function (req, res) {
  console.log("In traveller Signup Post");
  console.log(req.body);
  email = req.body.email.toLowerCase();
  trimemail = email.trim();
  var today = new Date();
  var year = today.getFullYear();
  
  pool.query('SELECT * FROM users WHERE email = ?', [trimemail], (err, rows) => {
    if (err){
        console.log(err);
        console.log("unable to read the database");
        res.status(400).json({responseMessage: 'unable to read the users database'});
    } else {
      if (rows.length > 0) {
        console.log("User already exists");
        res.status(400).json({responseMessage: 'User already exists'});
      } else {
        
        crypt.createHash(req.body.password, function (response) {
          encryptedPassword = response;

          var userData = {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": trimemail,
            "password": encryptedPassword,
            "created": year,
            "isOwner": 'N'
          }
        
          //Save the user in database
          pool.query('INSERT INTO users SET ?',userData, function (err) {
          if (err) {
            console.log("unable to insert into database", err);
            res.status(400).send("unable to insert into database");
          } else {
            console.log("User Added");
            res.cookie('cookie1',"travellercookie",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie2',trimemail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie3',req.body.firstname,{maxAge: 900000, httpOnly: false, path : '/'});
            res.status(200).json({responseMessage: 'User Added'});
          }});
      }, function (err) {
          console.log(err);
        });
      }
    }
  });
});

// Add owner users
router.route('/owner/signup').post(function (req, res) {
  console.log("In owner Signup Post");
  email = req.body.email.toLowerCase();
  trimemail = email.trim();
  var today = new Date();
  var year = today.getFullYear();
  
  pool.query('SELECT * FROM users WHERE email = ?', [trimemail], (err, rows) => {
    if (err){
        console.log(err);
        console.log("unable to read the database");
        res.status(400).json({responseMessage: 'unable to read the users database'});
    } else {
      if (rows.length > 0) {
        if (rows[0].isOwner == 'Y') {
          console.log("Owner already exists");
          res.status(400).json({responseMessage: 'Owner already exists'});
        } else{

          //Update traveller as owner in database
          var sqlquery = "UPDATE users SET isOwner = 'Y' where email = ?";
          pool.query(sqlquery, [trimemail], (err) =>  {
            if (err) {
              console.log(err);
              console.log("unable to update user to owner");
              res.status(400).json({responseMessage: 'unable to update user to owner'});
            } else{
              console.log("Owner profile added to traveller login");
              res.cookie('cookie1',"ownercookie",{maxAge: 900000, httpOnly: false, path : '/'});
              res.cookie('cookie2',trimemail,{maxAge: 900000, httpOnly: false, path : '/'});
              res.cookie('cookie3',req.body.firstname,{maxAge: 900000, httpOnly: false, path : '/'});
              res.status(201).json({responseMessage: 'Owner profile added to traveller login'});
            }
          })
        }
      } else {

        crypt.createHash(req.body.password, function (response) {
          encryptedPassword = response;
      
          var userData = {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": trimemail,
            "password": encryptedPassword,
            "created": year,
            "isOwner": 'Y'
          }
      
          //Save the user in database
          pool.query('INSERT INTO users SET ?',userData, function (err) {
          if (err) {
            console.log("unable to insert into database");
            res.status(400).json({responseMessage: 'unable to insert into users database'});
          } else {
            console.log("Owner Added");
            res.cookie('cookie1',"ownercookie",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie2',trimemail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('cookie3',req.body.firstname,{maxAge: 900000, httpOnly: false, path : '/'});
            res.status(200).json({responseMessage: 'Owner Added'});
          }});
        })
      }
    }
  })
});

// fetch user profile details
router.route('/profile').post(function (req, res) {
  console.log("Inside Profile fetch");
  var input_email = req.body.email;
  console.log(input_email);
  pool.query('SELECT * FROM users WHERE email = ?', [input_email], (err, result) => {
    if (err){
      console.log(err);
      res.status(400).json({responseMessage: 'User not found'});
    }else {
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result));
    }
  })
});

// save user profile details
router.route('/profilesave').post(function (req, res) {
  console.log("In profile save Post");
  email = req.body.email.toLowerCase();
  trimemail = email.trim();
  
  var userData = {
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "aboutMe" : req.body.aboutMe,
    "city" : req.body.city,
    "state" : req.body.state,
    "country" : req.body.country,
    "company" : req.body.company,
    "school" : req.body.school,
    "hometown" : req.body.hometown,
    "gender" : req.body.gender,
    "phone" : req.body.phone
  }

  console.log(userData);
  pool.query('UPDATE users SET ? WHERE email = ?', [userData, trimemail], function (err) {
    if (err) {
      console.log(err);
      console.log("unable to update database");
      res.status(400).json({responseMessage: 'unable to update database'});
    } else {
      pool.query('SELECT * FROM users WHERE email = ?', [trimemail], (err, result) => {
        if (err){
          console.log(err);
          res.status(400).json({responseMessage: 'User not found'});
        }else {
          res.writeHead(200, {'content-type':'application/json'});
          res.end(JSON.stringify(result));
        }
      })
    }
  })
});

module.exports = router;