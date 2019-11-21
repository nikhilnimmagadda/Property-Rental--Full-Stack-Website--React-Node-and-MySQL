// // Search Property without connection pooling for JMeter Testing
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

// var con = mysql.createConnection({
//   connectionLimit: 100,
//   host:'localhost',
//   user:'root',
//   password:'Sowmya123',
//   database:'homeaway',
//   port: 3306,
//   debug: false,
//   multipleStatements: true
// });

// router.route('/property/search').post(function (req, res) {
//   console.log(req.body);
  
//     con.query('SELECT * from `property` where (uid NOT IN (SELECT propertyID from `bookings` where ((? BETWEEN bookedFrom AND bookedTo) OR (? BETWEEN bookedFrom AND bookedTo)))) and city = ? and startDate <= ? and endDate >= ? and sleeps >= ?', [req.body.startDate, req.body.endDate, req.body.city.toLowerCase(), req.body.startDate, req.body.endDate, req.body.noOfGuests], function (error,result) {
//         if(error){
//             console.log(error);
//             console.log("No Properties Found");
//             res.status(400).send("No Properties Found");
//         }else{
//             console.log(JSON.stringify(result));
//             res.status(200).send(JSON.stringify(result));
//             console.log("Property Found");
//         }
//     });
// });

module.exports = router;