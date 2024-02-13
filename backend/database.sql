-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: worksocial
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blacklisted_tokens`
--

DROP TABLE IF EXISTS `blacklisted_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklisted_tokens` (
  `jwtToken` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `Company_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `URL` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Logo` text COLLATE utf8mb4_general_ci,
  `Phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Activity` text COLLATE utf8mb4_general_ci,
  `Address` text COLLATE utf8mb4_general_ci,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Company_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_user`
--

DROP TABLE IF EXISTS `company_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_user` (
  `Company_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Company_ID`,`User_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `company_user_ibfk_1` FOREIGN KEY (`Company_ID`) REFERENCES `companies` (`Company_ID`),
  CONSTRAINT `company_user_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_verification`
--

DROP TABLE IF EXISTS `email_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verification` (
  `verification_id` int NOT NULL,
  `User_ID` int NOT NULL,
  `verification_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `Event_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8mb4_general_ci,
  `EventName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Description` text COLLATE utf8mb4_general_ci,
  `Visibility` enum('Public','Private') COLLATE utf8mb4_general_ci NOT NULL,
  `ParticipantCount` int DEFAULT '0',
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_comment_likes`
--

DROP TABLE IF EXISTS `event_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_comment_likes` (
  `Like_ID` int NOT NULL AUTO_INCREMENT,
  `Comment_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Like_ID`),
  KEY `Comment_ID` (`Comment_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `event_comments` (`Comment_ID`),
  CONSTRAINT `event_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_comments`
--

DROP TABLE IF EXISTS `event_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Event_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_comments_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  CONSTRAINT `event_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_likes`
--

DROP TABLE IF EXISTS `event_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_likes` (
  `Event_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_likes_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  CONSTRAINT `event_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groupchat`
--

DROP TABLE IF EXISTS `groupchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupchat` (
  `GroupChat_ID` int NOT NULL AUTO_INCREMENT,
  `GroupImage` text COLLATE utf8mb4_general_ci,
  `GroupName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Content` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`GroupChat_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `groupchat_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groupparticipants`
--

DROP TABLE IF EXISTS `groupparticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupparticipants` (
  `GroupChat_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Joined_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`GroupChat_ID`,`User_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `groupparticipants_ibfk_1` FOREIGN KEY (`GroupChat_ID`) REFERENCES `groupchat` (`GroupChat_ID`),
  CONSTRAINT `groupparticipants_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `individualchat`
--

DROP TABLE IF EXISTS `individualchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individualchat` (
  `Chat_ID` int NOT NULL AUTO_INCREMENT,
  `Content` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID1` int DEFAULT NULL,
  `User_ID2` int DEFAULT NULL,
  PRIMARY KEY (`Chat_ID`),
  KEY `User_ID1` (`User_ID1`),
  KEY `User_ID2` (`User_ID2`),
  CONSTRAINT `individualchat_ibfk_1` FOREIGN KEY (`User_ID1`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `individualchat_ibfk_2` FOREIGN KEY (`User_ID2`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inviteFriends`
--

DROP TABLE IF EXISTS `inviteFriends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inviteFriends` (
  `invite_id` int NOT NULL AUTO_INCREMENT,
  `inviter_id` int NOT NULL,
  `invitee_id` int NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`invite_id`),
  KEY `inviter_id` (`inviter_id`),
  KEY `invitee_id` (`invitee_id`),
  CONSTRAINT `inviteFriends_ibfk_1` FOREIGN KEY (`inviter_id`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `inviteFriends_ibfk_2` FOREIGN KEY (`invitee_id`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `Post_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8mb4_general_ci,
  `Title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Content` text COLLATE utf8mb4_general_ci NOT NULL,
  `Visibility` enum('Public','Private') COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_comment_likes`
--

DROP TABLE IF EXISTS `post_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comment_likes` (
  `Like_ID` int NOT NULL AUTO_INCREMENT,
  `Comment_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Like_ID`),
  KEY `Comment_ID` (`Comment_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `post_comments` (`Comment_ID`),
  CONSTRAINT `post_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_comments`
--

DROP TABLE IF EXISTS `post_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Post_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Post_ID` (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_likes`
--

DROP TABLE IF EXISTS `post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_likes` (
  `Post_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Post_ID` (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reset_password_keys`
--

DROP TABLE IF EXISTS `reset_password_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_password_keys` (
  `unique_key` varchar(80) NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL DEFAULT ((now() + interval 15 minute)),
  PRIMARY KEY (`unique_key`),
  KEY `Email` (`Email`),
  CONSTRAINT `reset_password_keys_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `Survey_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8mb4_general_ci,
  `Title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Content` text COLLATE utf8mb4_general_ci NOT NULL,
  `Visibility` enum('Public','Private') COLLATE utf8mb4_general_ci NOT NULL,
  `EndDate` date DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  `Option1` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Option2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Option3` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Option4` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_comment_likes`
--

DROP TABLE IF EXISTS `survey_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_comment_likes` (
  `Like_ID` int NOT NULL AUTO_INCREMENT,
  `Comment_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Like_ID`),
  KEY `Comment_ID` (`Comment_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `survey_comments` (`Comment_ID`),
  CONSTRAINT `survey_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_comments`
--

DROP TABLE IF EXISTS `survey_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_comments_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_likes`
--

DROP TABLE IF EXISTS `survey_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_likes` (
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_likes_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_votes`
--

DROP TABLE IF EXISTS `survey_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_votes` (
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Voted_For` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_votes_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_votes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `LastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `FirstName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Address` text COLLATE utf8mb4_general_ci,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Biography` text COLLATE utf8mb4_general_ci,
  `hashedPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Role` enum('Admin','User') COLLATE utf8mb4_general_ci NOT NULL,
  `Gender` enum('Male','Female','Other') COLLATE utf8mb4_general_ci NOT NULL,
  `ProfileImage` text COLLATE utf8mb4_general_ci,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Company_ID` int DEFAULT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_user_company` (`Company_ID`),
  CONSTRAINT `fk_user_company` FOREIGN KEY (`Company_ID`) REFERENCES `company` (`Company_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_followers`
--

DROP TABLE IF EXISTS `user_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_followers` (
  `Follower_ID` int NOT NULL,
  `Following_ID` int NOT NULL,
  `Followed_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Follower_ID`,`Following_ID`),
  KEY `Following_ID` (`Following_ID`),
  CONSTRAINT `user_followers_ibfk_1` FOREIGN KEY (`Follower_ID`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `user_followers_ibfk_2` FOREIGN KEY (`Following_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'worksocial'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 15:36:27