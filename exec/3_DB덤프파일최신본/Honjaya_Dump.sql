-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: my.domain.url.com    Database: honjaya_db
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ban`
--

DROP TABLE IF EXISTS `ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ban` (
  `ban_no` int NOT NULL AUTO_INCREMENT,
  `ban_user_email` varchar(50) NOT NULL,
  `ban_term` int NOT NULL,
  `ban_start_time` datetime NOT NULL,
  `ban_end_time` datetime NOT NULL,
  `ban_type` char(3) DEFAULT NULL,
  `ban_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ban_no`),
  UNIQUE KEY `UK_BAN_USER_EMAIL` (`ban_user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ban`
--

LOCK TABLES `ban` WRITE;
/*!40000 ALTER TABLE `ban` DISABLE KEYS */;
/*!40000 ALTER TABLE `ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_no` bigint NOT NULL AUTO_INCREMENT,
  `chatroom_no` bigint NOT NULL,
  `user_no` int NOT NULL,
  `chat_message` varchar(1000) DEFAULT NULL,
  `chat_time` datetime(6) DEFAULT NULL,
  `chat_read` int DEFAULT NULL,
  PRIMARY KEY (`chat_no`),
  KEY `FK50xvdunp59tosyf4upls3wa2q` (`chatroom_no`),
  KEY `FKe75tu2pd7wf7wowpy8r5nagfh` (`user_no`),
  CONSTRAINT `FK50xvdunp59tosyf4upls3wa2q` FOREIGN KEY (`chatroom_no`) REFERENCES `chatroom` (`chatroom_no`) ON DELETE CASCADE,
  CONSTRAINT `FKe75tu2pd7wf7wowpy8r5nagfh` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=873 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (546,13,15,' 제발되라','2022-08-15 10:34:05.704000',1),(548,13,15,'sad','2022-08-15 11:01:20.248000',1),(563,13,15,'ㅇ','2022-08-15 18:28:10.640000',1),(564,13,15,' ㅇ','2022-08-15 18:30:33.662000',1),(565,13,15,' ㅇ','2022-08-15 18:30:34.464000',1),(566,13,15,' ㅇ','2022-08-15 18:30:38.706000',1),(567,13,15,' ㅇ','2022-08-15 18:30:39.016000',1),(568,13,15,' ㅇ','2022-08-15 18:30:39.201000',1),(569,13,15,' ㅇ','2022-08-15 18:30:45.472000',1),(570,13,15,' ㅇ','2022-08-15 18:30:45.717000',1),(571,13,15,' ㅇㅇㅇ','2022-08-15 18:31:15.955000',1),(572,13,15,' ㅇㅇㅇ','2022-08-15 18:31:16.553000',1),(573,13,15,' ddd','2022-08-15 18:32:13.128000',1),(574,13,15,' d','2022-08-15 18:32:28.178000',1),(576,13,15,' d','2022-08-15 18:43:42.366000',1),(579,13,15,' ㅇ','2022-08-15 19:04:48.491000',1),(580,13,15,' d','2022-08-15 19:05:59.597000',1),(581,13,15,'d','2022-08-15 19:09:46.568000',1),(583,13,15,'d','2022-08-15 19:10:00.134000',1),(584,13,15,' ㅇㅇㅇ','2022-08-15 19:10:10.158000',1),(588,13,15,'d','2022-08-15 19:16:12.091000',1),(589,13,15,'뭔갸','2022-08-15 19:25:12.022000',1),(590,13,15,'이상','2022-08-15 19:26:01.144000',1),(591,13,15,'한가요? 아닌가요?','2022-08-15 19:26:06.429000',1),(592,13,15,'여러본 보내지나?','2022-08-15 20:08:45.424000',1),(593,13,15,'왜이러지','2022-08-15 20:08:50.713000',1),(594,13,15,'ㅇ','2022-08-15 20:10:41.018000',1),(597,13,15,'ㅎㅇㅎㅇ','2022-08-15 22:08:22.512000',1),(666,13,15,'ㅇㅇ','2022-08-17 16:05:49.789000',1),(667,13,15,'ㅇ','2022-08-17 16:05:53.304000',1),(672,23,15,'ㅎㅇ','2022-08-17 17:44:17.955000',1),(675,23,15,'안뇽','2022-08-17 17:44:25.698000',1),(676,23,15,'','2022-08-17 17:44:28.416000',1),(677,23,15,'','2022-08-17 17:44:29.702000',1),(691,23,15,'승현따라다라','2022-08-17 21:22:58.233000',1),(692,23,15,'땅땅','2022-08-17 21:22:59.170000',1),(726,23,15,'오이오이','2022-08-18 11:10:06.462000',1),(727,23,15,'닉넴한번바꿔봤다구','2022-08-18 11:10:09.461000',1),(732,23,15,'쩌러!','2022-08-18 11:10:16.560000',1),(735,23,15,'쩌러!','2022-08-18 11:10:20.148000',1),(736,23,15,'그건 모르겠고~','2022-08-18 11:10:24.624000',1),(738,23,15,'어엇','2022-08-18 11:10:30.523000',1),(740,23,15,'ㅇ','2022-08-18 11:11:01.203000',1),(741,23,15,'ㅊ','2022-08-18 11:11:06.356000',1),(742,23,15,'','2022-08-18 11:11:07.512000',1),(743,23,15,'ㄹ','2022-08-18 11:11:08.867000',1),(744,23,15,'','2022-08-18 11:11:09.326000',1),(871,33,36,'안녕하세요~','2022-08-19 02:05:03.323000',1),(872,33,41,'안녕하세요','2022-08-19 02:05:07.176000',1);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_ask`
--

DROP TABLE IF EXISTS `chat_ask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_ask` (
  `chat_ask_no` int NOT NULL AUTO_INCREMENT,
  `chat_ask_from` int NOT NULL,
  `chat_ask_to` int NOT NULL,
  PRIMARY KEY (`chat_ask_no`),
  UNIQUE KEY `UK_CHAT_ASK_USER` (`chat_ask_from`,`chat_ask_to`),
  KEY `FK4ojeiw8jvy8dd65jykunhg4ds` (`chat_ask_to`),
  CONSTRAINT `FK4ojeiw8jvy8dd65jykunhg4ds` FOREIGN KEY (`chat_ask_to`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKahyjfphebfoychjwban7cb7j8` FOREIGN KEY (`chat_ask_from`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_ask`
--

LOCK TABLES `chat_ask` WRITE;
/*!40000 ALTER TABLE `chat_ask` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_ask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `chatroom_no` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`chatroom_no`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
INSERT INTO `chatroom` VALUES (13),(15),(23),(28),(32),(33);
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom_user`
--

DROP TABLE IF EXISTS `chatroom_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom_user` (
  `chatroom_user_no` bigint NOT NULL AUTO_INCREMENT,
  `chatroom_no` bigint NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`chatroom_user_no`),
  UNIQUE KEY `UK_CHATROOM_USER` (`user_no`,`chatroom_no`),
  KEY `IDX_CHATROOM_USER_CHATROOMNO` (`chatroom_no`),
  CONSTRAINT `FKjqfqtbgya5n4do1pcs4l9gd1` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKr5stdkjxambritwoas3sni3aw` FOREIGN KEY (`chatroom_no`) REFERENCES `chatroom` (`chatroom_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom_user`
--

LOCK TABLES `chatroom_user` WRITE;
/*!40000 ALTER TABLE `chatroom_user` DISABLE KEYS */;
INSERT INTO `chatroom_user` VALUES (19,13,15),(40,23,15),(59,33,36),(60,33,41);
/*!40000 ALTER TABLE `chatroom_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code`
--

DROP TABLE IF EXISTS `code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code` (
  `group_code` char(3) NOT NULL,
  `code` char(3) NOT NULL,
  `code_name` varchar(50) DEFAULT NULL,
  `code_use_yn` char(1) DEFAULT 'y',
  PRIMARY KEY (`group_code`,`code`),
  CONSTRAINT `FK2lt6j0n2k5mtwlb2wk3qem38v` FOREIGN KEY (`group_code`) REFERENCES `group_code` (`group_code`),
  CONSTRAINT `code_chk_1` CHECK ((`code_use_yn` in (_utf8mb4'y',_utf8mb4'n')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code`
--

LOCK TABLES `code` WRITE;
/*!40000 ALTER TABLE `code` DISABLE KEYS */;
INSERT INTO `code` VALUES ('001','001','solo','y'),('001','002','avatar','y'),('001','003','commander','y');
/*!40000 ALTER TABLE `code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_code`
--

DROP TABLE IF EXISTS `group_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_code` (
  `group_code` char(3) NOT NULL,
  `group_code_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_code`
--

LOCK TABLES `group_code` WRITE;
/*!40000 ALTER TABLE `group_code` DISABLE KEYS */;
INSERT INTO `group_code` VALUES ('001','user role in room');
/*!40000 ALTER TABLE `group_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag` (
  `hash_no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `hash_text` varchar(11) NOT NULL,
  PRIMARY KEY (`hash_no`),
  KEY `FKqhh9pglc2s7i0i190g04fvsfs` (`user_no`),
  CONSTRAINT `FKqhh9pglc2s7i0i190g04fvsfs` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (264,14,'안녕~'),(318,19,'123'),(319,19,'222'),(320,19,'333'),(390,15,'리액트가뭔데'),(391,15,'둘이야'),(395,40,'안녕'),(396,40,'나만냥이없어'),(397,40,'떡볶이❤'),(399,36,'화난닭'),(400,15,'뚱땅이'),(401,42,'푸푸언니'),(403,42,'신남주의');
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `rate_no` int NOT NULL AUTO_INCREMENT,
  `rate_from` int NOT NULL,
  `rate_to` int NOT NULL,
  `rate_score` decimal(2,1) NOT NULL,
  PRIMARY KEY (`rate_no`),
  UNIQUE KEY `UK_RATE_FROM_TO` (`rate_from`,`rate_to`),
  KEY `FKaq6htdqi1o5uycws0y0dp1v9m` (`rate_to`),
  CONSTRAINT `FKaq6htdqi1o5uycws0y0dp1v9m` FOREIGN KEY (`rate_to`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKr9lqvworgahndxiqduc3aneub` FOREIGN KEY (`rate_from`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (41,41,40,3.5),(42,40,41,3.0);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_no` int NOT NULL AUTO_INCREMENT,
  `report_from` int NOT NULL,
  `report_to` int NOT NULL,
  `report_type` char(3) NOT NULL,
  `report_message` varchar(255) DEFAULT NULL,
  `report_time` datetime DEFAULT NULL,
  PRIMARY KEY (`report_no`),
  UNIQUE KEY `UK_REPORT_FROM_TO` (`report_from`,`report_to`),
  KEY `FK9d8380wvvn6lldbivmerg4lmb` (`report_to`),
  CONSTRAINT `FK9d8380wvvn6lldbivmerg4lmb` FOREIGN KEY (`report_to`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKgriga99mvxhdng1nwmr15dvj9` FOREIGN KEY (`report_from`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(65) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_gender` char(1) NOT NULL DEFAULT 'm',
  `user_phone` varchar(45) DEFAULT NULL,
  `user_profile_pic_url` varchar(255) DEFAULT NULL,
  `user_reg_time` datetime DEFAULT NULL,
  `user_point` int NOT NULL DEFAULT '0',
  `user_token` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK_USER_EMAIL` (`user_email`),
  UNIQUE KEY `UK_USER_NICKNAME` (`user_nickname`),
  CONSTRAINT `user_chk_1` CHECK ((`user_gender` in (_utf8mb4'm',_utf8mb4'f'))),
  CONSTRAINT `user_chk_2` CHECK ((`user_point` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,'kublaihkan@naver.com','b3df2b46c0b94cb9d2105a9adfdb0f27985cfd2c5ea8c1647b905778b1d71ae6','쿠빌라이칸','안영원','2022-06-16','m','010-0000-0000','/004.png','2022-08-08 00:32:07',1500,NULL),(15,'nename8@naver.com','973a4de4dc49b5241ffd6379dd0a46c84c8c3bacbed04471f5f213efe3fd4da5','송송','배송윤','2022-08-23','m','123-2312-2321','/001.png','2022-08-08 13:53:18',7100,NULL),(16,'gsmj1712@gmail.com','febd93f04bda1aec0d374f8fd014d062525934feb1f1b81ee7c64d61f66b84b1','컨설턴트','김민정','2022-08-01','f','010-1111-1111','/001.png','2022-08-09 03:28:59',0,NULL),(19,'ansgml6491@naver.com','b156ee08e59431ce900b02b851232b0ddf111751da1123a7ff105ee997a595ba','muni','muni','1980-05-05','f','010-9999-8888','/005.png','2022-08-11 07:56:30',4000,NULL),(36,'wntjdcl1@naver.com','febd93f04bda1aec0d374f8fd014d062525934feb1f1b81ee7c64d61f66b84b1','UCC1등팀','김상현','2001-01-01','m','010-1234-5678','/005.png','2022-08-19 00:18:22',450,NULL),(40,'zsda3131@naver.com','d0daed83b6a8b3b1882e10e29fe8e8c6077403dc745df3f23bcb6bd189996639','누리호','김누리','1996-10-23','f','010-3468-2869','/004.png','2022-08-19 00:56:35',1050,'eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjYwODM4MjMyMTAzLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjEwMTgyMzIsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyTm8iOjQwfQ.O1u5U4-s6y9WYQ5SGSlLQqghfxigq5clyaZIKTQnSE8'),(41,'bds01088@naver.com','cd06f8c2b0dd065faf6ef910c7f15934363df71c33740fd245590665286ed268','기묘한사람','김효근','2022-08-18','m','010-2866-7155','/003.png','2022-08-19 00:56:49',500,'eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjYwODM4MjEzNjEzLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjEwMTgyMTMsInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyTm8iOjQxfQ.XXVAiKI9TajP3yrr5-VIKnY34MAV_J7R1kkiJxPJ0-g'),(42,'window8397@naver.com','a51a7c8e6b22c6c8a5e7715364c8b7423ae137fbc643243e8a7587ab317ec6ea','승현따라땅','이승현','1999-03-02','f','010-1234-5678','/004.png','2022-08-19 09:34:25',500,'eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjYwODY5MjY5MDM3LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjEwNDkyNjksInN1YiI6InJlZnJlc2gtdG9rZW4iLCJ1c2VyTm8iOjQyfQ.CKWf2mBN_kJxpKepMFW8i7uykHS7xP0D9N1qu5fW7rg'),(43,'test@test.com','febd93f04bda1aec0d374f8fd014d062525934feb1f1b81ee7c64d61f66b84b1','테스트','김테스트','2022-08-19','m','010-0000-0000','/001.png','2022-08-19 09:57:31',500,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 10:10:41
