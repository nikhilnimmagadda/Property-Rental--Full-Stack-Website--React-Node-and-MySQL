var express = require('express');
var pool = require('../models/UserDB.js');
var router = express.Router();
var async = require('async');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    fileExtension = file.originalname.split('.')[1] // get file extension from original file
    callback(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + fileExtension);
  },
});
var upload = multer({ storage : storage })


// Add Property
router.route('/owner/listproperty').post(upload.array('uploadedPhoto',5), function (req, res) {

  console.log("req.files");
  console.log(req.files);

  let filenamearray =[];
  req.files.forEach(file => {filenamearray.push(file.filename);});
  console.log(filenamearray);

  var stringObj = JSON.stringify(filenamearray);
  console.log(stringObj);
  console.log("In Owner Property Post");

  var userData = {
    listedBy: req.body.listedBy,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    streetAddress: req.body.streetAddress,
    city: req.body.city.toLowerCase(),
    state: req.body.state.toLowerCase(),
    country: req.body.country.toLowerCase(),
    zipcode: req.body.zipcode,
    headline: req.body.headline,
    description: req.body.description,
    propertyType: req.body.propertyType,
    bedrooms: req.body.bedrooms,
    sleeps: req.body.sleeps,
    bathrooms: req.body.bathrooms,
    baseRate: req.body.baseRate,
    currency: req.body.currency,
    minStay: req.body.minStay,
    amenities: req.body.amenities,
    image1:  (req.files.length >= 1) ?req.files[0].filename:"",
    image2:  (req.files.length >= 2) ?req.files[1].filename:"",
    image3:  (req.files.length >= 3) ?req.files[2].filename:"",
    image4:  (req.files.length >= 4) ?req.files[3].filename:"",
    image5:  (req.files.length >= 5) ?req.files[4].filename:"",
  }

  console.log(userData.image1);
  pool.query('INSERT INTO property SET ?',userData, function (error,result) {
    if (error) {
      console.log(error);
      console.log("unable to insert into database");
      res.status(400).json({responseMessage: 'unable to insert into database'});
    } else {
      console.log(result);
      console.log("Property Added");
      res.status(200).json({responseMessage: 'Property Added'});
    }
  });    
});

// Search Property
router.route('/property/search').post(function (req, res) {
  console.log(req.body);
  
  pool.query('SELECT * from `property` where (uid NOT IN (SELECT propertyID from `bookings` where ((? BETWEEN bookedFrom AND bookedTo) OR (? BETWEEN bookedFrom AND bookedTo)))) and city = ? and startDate <= ? and endDate >= ? and sleeps >= ?', [req.body.startDate, req.body.endDate, req.body.city.toLowerCase(), req.body.startDate, req.body.endDate, req.body.noOfGuests], function (error,result) {
    if (error) {
      console.log(error);
      console.log("unable to search database");
      res.status(400).json({responseMessage: 'unable to search database'});
    } else {
      console.log(JSON.stringify(result));
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result));
      console.log("Property Found");
    }
  });    
});

// Search Property by id
router.route('/property/:id').get(function (req, res) {
  console.log(req.params.id);
  pool.query('SELECT * from `property` where uid = ? ', [req.params.id], function (error,result) {
    if (error) {
      console.log(error);
      console.log("Property not found");
      res.status(400).json({responseMessage: 'Property not found'});
    } else {
      console.log(JSON.stringify(result));
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result));
      console.log("Property Details Found");
    }
  });    
});

// Search Booking by id
router.route('/bookings/:id').get(function (req, res) {
  console.log(req.params.id);
  pool.query('SELECT * from `bookings` where bookingID = ? ', [req.params.id], function (error,result) {
    if (error) {
      console.log(error);
      console.log("Booking not found");
      res.status(400).json({responseMessage: 'Booking not found'});
    } else {
      console.log(JSON.stringify(result));
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result));
      console.log("Booking Details Found");
    }
  });    
});

// List Property by owner
router.route('/owner/propertylistings').post(function (req, res) {
  console.log(req.body);

  pool.query('SELECT * from `property` where listedBy = ? ', [req.body.listedBy], function (error,result) {
    if (error) {
      console.log(error);
      console.log("Property not found");
      res.status(400).json({responseMessage: 'Property not found'});
    } else {
      
      var resultCopy = result;
      async.eachOfSeries (resultCopy, function(value, i, inner_callback) {
        value.bookingID = []
        value.bookedFrom = []
        value.bookedTo = []
        value.bookedBy = []
        value.noOfGuests = []
        value.price = []
        console.log("Property ID: ", value.uid)
        pool.query('SELECT * from `bookings` a JOIN `users` b ON a.bookedBy = b.email where propertyID = ? ', [value.uid], function (error,bookingResult) {
          if (!error){
            if (bookingResult.length > 0){
              console.log("Inside query");
              console.log("bookingResult: ", bookingResult)
              Object.keys(bookingResult).map(function(j){
                console.log("Value of value.uid is ", value.uid)
                var tempbookedFrom = bookingResult[j].bookedFrom.getFullYear() + '-' + (bookingResult[j].bookedFrom.getMonth()+1) + '-' + bookingResult[j].bookedFrom.getDate()
                value.bookedFrom.push(tempbookedFrom)
                var tempbookedTo = bookingResult[j].bookedTo.getFullYear() + '-' + (bookingResult[j].bookedTo.getMonth()+1) + '-' + bookingResult[j].bookedTo.getDate()
                value.bookedTo.push(tempbookedTo)
                var tempbookedBy = bookingResult[j].firstname + ' ' + bookingResult[j].lastname
                value.bookedBy.push(tempbookedBy)
                value.noOfGuests.push(bookingResult[j].NoOfGuests)
                value.price.push(bookingResult[j].price)
                value.bookingID.push(bookingResult[j].bookingID)
              })
            }
            inner_callback(null);
          } else {
            console.log("Error while performing Query");
            inner_callback(error);
          }
        });
      }, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("Property Found");
          console.log(resultCopy);
          res.writeHead(200, {'content-type':'application/json'});
          res.end(JSON.stringify(resultCopy));
        }
      });
    }
  })
});

// Book Property
router.route('/bookproperty').post(function (req, res) {

  console.log("In Property Booking");

  var userData = {
    bookedBy: req.body.bookedBy,
    bookedFrom: req.body.bookedFrom,
    bookedTo: req.body.bookedTo,
    propertyID: req.body.propertyid,
    NoOfGuests : req.body.NoOfGuests,
    price: req.body.pricePaid,
  }

  console.log(userData);
  pool.query('INSERT INTO `bookings` SET ?',userData, function (error,result) {
    if (error) {
      console.log(error);
      console.log("unable to insert into bookings database");
      res.status(400).json({responseMessage: 'unable to insert into bookings database'});
    } else {
      console.log(result);
      console.log("Booking Added");
      res.status(200).json({responseMessage: 'Booking Added'});
    }
  });    
});

// List all trips by a traveller
router.route('/traveller/triplistings').post(function (req, res) {
  console.log(req.body.bookedBy);
  pool.query('SELECT * from `bookings` a INNER JOIN `property` b ON a.propertyID = b.uid where a.bookedBy = ? ', [req.body.bookedBy], function (error,result) {
    if (error) {
      console.log(error);
      console.log("Trips not found");
      res.status(400).json({responseMessage: 'Trips not found'});
    } else {
      console.log(JSON.stringify(result));
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result));
      console.log("Trips Found");
    }
  });    
});

module.exports = router;