-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: homeaway
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bookings` (
  `bookedBy` varchar(45) NOT NULL,
  `bookedFrom` date NOT NULL,
  `bookedTo` date NOT NULL,
  `propertyID` int(11) NOT NULL,
  `NoOfGuests` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bookingID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bookingID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('gsowmya@gmail.com','2018-10-01','2018-10-04',45,4,486,9),('shivanigowri@gmail.com','2018-10-07','2018-10-09',45,4,324,10),('gsowmya@gmail.com','2018-10-21','2018-10-24',46,3,345,11);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `property` (
  `listedBy` varchar(25) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `sleeps` int(11) NOT NULL DEFAULT '1',
  `bedrooms` int(3) DEFAULT NULL,
  `bathrooms` int(3) DEFAULT NULL,
  `baseRate` int(3) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `headline` varchar(100) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `minStay` int(3) DEFAULT NULL,
  `amenities` varchar(255) DEFAULT NULL,
  `streetAddress` varchar(45) DEFAULT NULL,
  `propertyType` varchar(45) DEFAULT NULL,
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(45) DEFAULT NULL,
  `image3` varchar(45) DEFAULT NULL,
  `image4` varchar(45) DEFAULT NULL,
  `image5` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES ('partha.murali@gmail.com','2018-09-30','2018-10-31',8,4,3,200,'usa','sunnyvale','california','94086','Serene Family Home','Living is easy in this impressive, generously spacious residence with Delta views and access.\n\nThe open floor plan encompasses four spacious bedrooms with plenty of room for study, sleep and storage, four and a half luxurious bathrooms, and a sleek and stylish gourmet kitchen that flows through to the dining room.  The expansive living room opens up to a spacious rear patio with pool and spa and private boat dock on San Joaquin Delta. The master bedroom, complete with walk-in closet and ensuite, ensures parents have a private space where they can enjoy the Delta views on their private balcony.\n\nPerfect for anyone, this home is ideally positioned to enjoy summers on the Delta.  Truly resort style living in Brookside Country Club Estates.','USD',1,'Internet, Air Conditioning, Satellite or Cable, Children Welcome, Washer & Dryer,TV, No Smoking','655 S Fair Oaks Avenue','Family Home',43,'Image1-1538369075510.jpg','Image2-1538369075514.jpg','Image3-1538369075517.jpg','Image4-1538369075519.jpg','Image5-1538369075527.jpg'),('partha.murali@gmail.com','2018-09-30','2018-10-31',6,3,2,162,'usa','sunnyvale','california','43224','Lovely home w/ private hot tub - ideal location, year-round outdoor activities!','This lovely three-bedroom home in Tahoe City is perfect for a small family or a couple wanting to leave the daily grind behind and experience the beauty and peaceful vibe of stunning Lake Tahoe.\n\nNot only can you walk to a nice selection of restaurants and a pub, you can also walk to a grocery store and a drug store. With Commons Beach a mere 600 yards from your door, you\'ll enjoy a stress-free vacation without ever having to leave your immediate neighborhood. And if that isn\'t enough, Tahoe State Recreation Area is also within walking distance and offers picnicking, bike trails, fishing, swimming, and surfing/windsurfing. If you visit during the winter, experience top-notch skiing and boarding with Squaw Valley seven miles away, and Northstar and Diamond Peak just 16 miles away in either direction.\n\nThe living room boasts a wall of floor-to-ceiling windows, letting in natural light. During the winter, relax and take in the view or curl up with a good book and warm up with the gas fireplace. In the summer, head out to the deck and breath in the fresh, pine-scented air while you revel in your beautiful natural surroundings.','USD',1,'Clothes dryer, Fireplace, Linen provided, Towels provided, Washing machine, Phone / Internet access, Pool / Spa, Jacuzzi or hot tub','910 E Hamilton Avenue','Family Home',45,'Image1-1538454206364.jpg','Image2-1538454206367.jpg','Image3-1538454206368.jpg','Image4-1538454206371.jpg',''),('gsowmya@gmail.com','2018-10-05','2018-11-05',6,3,2,115,'usa','sunnyvale','california','94087','Acreage Living At Its Absolute Finest','Paradise at The Point! This luxurious 4 bedroom 4.5 bath Dienst-built estate on the Lake Norman peninsula is a dream home in a high-end community that\'s home to Trump National Golf Club. Spanning over 4900 SF, this magnificent waterfront residence graced by soaring ceilings and wall-to-wall windows is a haven for gazing at Lake Norman views from multiple vantage points. The grand entryway with a sweeping staircase draws you into a voluminous layout made for entertaining. The 2-story great room with French doors to the rear deck is the dramatic focal point of the main level, accompanied by an elegant formal dining room, tremendous chef\'s kitchen, den/family room with a marble fireplace and glass doors to the backyard, and home office with gorgeous built-ins. ','USD',1,'Washer and Dryer, Air Conditioning, Washer and Dryer, Furniture, Patio, Hardwood Floors, Dishwasher, Fireplace, Walk-in Closets, Wi-Fi','575 E Remington Dr','Family Home',46,'Image1-1538799920076.JPG','Image2-1538799920097.jpg','Image3-1538799920099.jpg','','');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` char(60) NOT NULL,
  `created` varchar(45) NOT NULL,
  `isOwner` varchar(1) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `aboutMe` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `school` varchar(45) DEFAULT NULL,
  `hometown` varchar(45) DEFAULT NULL,
  `languages` varchar(45) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Sowmya','Gowrishankar','gsowmya@gmail.com','$2a$10$t5D0WvN0pZ7d/xEQ99vmJODBjrRrT5eNeuGuUrl4GlM31ST1KFs5W','2018','Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Partha Sarathy','Murali','partha.murali@gmail.com','$2a$10$dAOY5bs3C18Oty7FTBDU3OazrN3i5azknjddoaZ4pEg.GeNISDBai','2018','Y','4081234567','I am a tennis player with stamp-collection as a hobby!','Sunnyvale','USA','Redpine','Stanford','Chennai',NULL,'Male','California'),('Shivani','G','shivanigowri@gmail.com','$2a$10$fc23RB24bE2qOgC/TcgrCusmbe28V8vMKNqsKDWP97LcHwJqBGGgm','2018','N',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-05 22:32:58
