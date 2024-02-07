-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2024 at 09:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `worksocial`
--

-- --------------------------------------------------------

--
-- Table structure for table `blacklisted_tokens`
--

CREATE TABLE `blacklisted_tokens` (
  `jwtToken` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blacklisted_tokens`
--

INSERT INTO `blacklisted_tokens` (`jwtToken`, `createdAt`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNTgyNjY4NCwiZXhwIjoxNzA1ODQxMDg0fQ.ab9TinN0xJFHM22VFW0t9KzXg7-CKESofyrJa7xdWBA', '2024-01-21 08:46:32'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNTgyNTcyMSwiZXhwIjoxNzA1ODQwMTIxfQ.zcwnydOARzi2abt3uCwaj5fsjnqOlqPdnY2q5hWgCSY', '2024-01-21 09:07:34'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkyMDIyOCwiZXhwIjoxNzA1OTM0NjI4fQ.fc6wSpmuGyQMtf1ig5hbSsYIwJ8zfNvw2NcT8WzzKzo', '2024-01-22 13:54:37'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNTkzMTcyNiwiZXhwIjoxNzA1OTQ2MTI2fQ.7pACGzB8GAAtPZ9bP8Kv_oWs6uONvwB-oi9MdlSCw4I', '2024-01-22 13:56:05'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNTkzMTc3MywiZXhwIjoxNzA1OTQ2MTczfQ.nlBZsv7iIbpw1g1xBITQlKwBHXqJCBk9hWqwcXBSfmw', '2024-01-22 16:50:31'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNTkxMjIzOSwiZXhwIjoxNzA3MzUyMjM5fQ.AN_WB7euIDcuQm3ccyoxPL3tpWDRY4M5HqEMzijfG2E', '2024-01-22 20:16:00'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNTk5NTk4MiwiZXhwIjoxNzA2MDEwMzgyfQ.mqPGF6u8j8kyS9evUsIwMOTVWDkAySA9A8jr7X-yiyA', '2024-01-23 07:57:01'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNTk5NjYyOCwiZXhwIjoxNzA2MDExMDI4fQ.Zfpj48eVApf9RKC4P2PzXnxNJn5gpnGKi9vqLwwD8FQ', '2024-01-23 08:07:06'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNTk5NzIzMywiZXhwIjoxNzA2MDExNjMzfQ.vtYkd7Vx9SJtddSBSS3Z5-p6r6tfcQuxL4Rs-dn_fuw', '2024-01-23 10:14:08'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTcwNjAwNDg2NSwiZXhwIjoxNzA2MDE5MjY1fQ.hqMzzrTlD_ChlMACIPwOu4oRusSXkxy6UM9uaxxukVk', '2024-01-23 10:47:42'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjEwMDkxMSwiZXhwIjoxNzA2MTE1MzExfQ.YSpfNcOnF4X3jaUkyUE58LqgX3TQTdF-CMk60sNuo_c', '2024-01-24 13:25:04'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjEwMjcxNiwiZXhwIjoxNzA2MTE3MTE2fQ.gEX90V2jBMmKqH6CGU8favV5Kzwxqhp_DCCUfenOv9s', '2024-01-24 14:09:50'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMDQxOSwiZXhwIjoxNzA2NDQ0ODE5fQ.9gLb2QUyICOgnlJwjpgwc9G97jRZ53IYkAXib7ZLTwM', '2024-01-28 08:27:29'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMTU2MCwiZXhwIjoxNzA2NDQ1OTYwfQ.rH60gqruzVHrBj-Lhw_zz366LQrR_3A1sPsigj-xVgU', '2024-01-28 08:46:12'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMTY0NCwiZXhwIjoxNzA2NDQ2MDQ0fQ.uUX0CTemd4Mp3TjJbNDs7b19my-vmRAorZrlkasgr6I', '2024-01-28 08:47:50'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMTc3OCwiZXhwIjoxNzA2NDQ2MTc4fQ.lpfKCBwoFa0TkQEQorsqOk8EvF09jU711F98OuSYqRw', '2024-01-28 08:51:06'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMTg3NCwiZXhwIjoxNzA2NDQ2Mjc0fQ.0CQ-DGQir4E90DlgUdjCHV7Awf9VOa1CSeKqj1uKAOk', '2024-01-28 08:55:37'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzMzUyNiwiZXhwIjoxNzA2NDQ3OTI2fQ.uN0XUaDuuf81mgQ43omPNpwdRjBAExFJuy0ipzMyJPU', '2024-01-28 09:18:55'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzNDA5MSwiZXhwIjoxNzA2NDQ4NDkxfQ.SmW9Xs_o3bvh3kOo6L7adA8VNN9ak8x1qI0UDDwDI8k', '2024-01-28 09:28:34'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzNDE0NSwiZXhwIjoxNzA2NDQ4NTQ1fQ.E5zXW8mnOLlmFA0v-kW6WF56pJ84548NPp0qgC-T4PQ', '2024-01-28 09:32:54'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzNDM4NSwiZXhwIjoxNzA2NDQ4Nzg1fQ.lqTKfLtYalsRam3LkUV0uG_U23kGeORZ6zKQgTLxJWI', '2024-01-28 09:49:47'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzNTM5NiwiZXhwIjoxNzA2NDQ5Nzk2fQ.EM6zy4SKW2FHIeQzko_7gdd-s9pHVAyeNHh2l_jSz5A', '2024-01-28 09:51:31'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzODY3MywiZXhwIjoxNzA2NDUzMDczfQ.9GGqZTZW8BhAxrtoVElCIEnxsAZxqBatoIWJunLkzx0', '2024-01-28 10:44:37'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQzOTk0NSwiZXhwIjoxNzA2NDU0MzQ1fQ.rE925-r4npkX9EHwUTP5kWv9iV4_jwHE1bj_TOqV0MI', '2024-01-28 11:05:52'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2MjY4MiwiZXhwIjoxNzA2NDc3MDgyfQ.AF6WX9xChcM2-mWHcTK3tyym5FBFV_2L2n3IMF7Scao', '2024-01-28 17:24:44'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2Mzg0MiwiZXhwIjoxNzA2NDc4MjQyfQ.iDw1x2gXL8tLhF5LgUupi0oXq0RlkhW2MOL_pcB9zJs', '2024-01-28 17:44:10'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NDEwNywiZXhwIjoxNzA2NDc4NTA3fQ.Mj9bjNnfGHKK1wSlJ8mMdgk9P_p6UT51s9NcIEVyYXw', '2024-01-28 17:50:08'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NDU5OCwiZXhwIjoxNzA2NDc4OTk4fQ.coIsABRyLX9Rjn1q-eklS87vPO1yWloAfeY7VwvyVvM', '2024-01-28 18:00:07'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NDg0MiwiZXhwIjoxNzA2NDc5MjQyfQ.F5acsgJlPrMLfQx9-sAxCveCeD7CRFbS6ZH-gpX4x4s', '2024-01-28 18:08:46'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NDI0MSwiZXhwIjoxNzA2NDc4NjQxfQ.Y2nVrA8ecg3F0C1QYA9WcpUbYAaWBFWRXSKm-DrmuWI', '2024-01-28 18:08:50'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NTUwNCwiZXhwIjoxNzA2NDc5OTA0fQ.Xcc3uIBHgTDiTmS7yPVvYCXKZTIgyp5BAe-HZDofg2I', '2024-01-28 18:14:33'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NjAyNywiZXhwIjoxNzA2NDgwNDI3fQ.3wbyw8AjhLyjMemNtpIda5VYtdpQn1Ah2Dan6K4NFKo', '2024-01-28 18:22:34'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NjQ3MCwiZXhwIjoxNzA2NDgwODcwfQ.E4TSc7gfGCUnfbjRGsCl-QH-98_CRCoeK6N9jtqWjvw', '2024-01-28 18:29:32'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NjY4OSwiZXhwIjoxNzA2NDgxMDg5fQ.Kod9hOK2gtYO_MGmU08h2wnT3ugHAjfuCF3vBADiGzk', '2024-01-28 18:31:33'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2NjU4OSwiZXhwIjoxNzA2NDgwOTg5fQ.PxqoqS6c-Ymb5NTVgQmbTwsfAhEZuMt6qnViTkf6gPc', '2024-01-28 18:31:37'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjQ2Njc2MywiZXhwIjoxNzA2NDgxMTYzfQ.bgYp090fXn-UwpFR8l56zrJyq6yp5vnZzKzL0FiGc84', '2024-01-28 18:35:14'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNTUxMiwiZXhwIjoxNzA2NTI5OTEyfQ.y8EuwOyWpdUASOykhr1-NYfyxzQYZLIsNmCMnkrYe0E', '2024-01-29 08:05:15'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjI0MywiZXhwIjoxNzA2NTMwNjQzfQ.c01iR8j5sJdnRxDECC3f4NAXozsvp7VfQBL4KdNRkDM', '2024-01-29 08:17:29'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjI1NCwiZXhwIjoxNzA2NTMwNjU0fQ.8tVb-x3cscPS-VikT-RZoxANinz7jCJU6YVaaR7Qy4A', '2024-01-29 08:19:55'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjUxNywiZXhwIjoxNzA2NTMwOTE3fQ.esMGktI7nMHm1R4u8Jj5eXZuIhiG383_8aQv89qK3x0', '2024-01-29 08:22:02'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjY4MywiZXhwIjoxNzA2NTMxMDgzfQ.sOfPg7FpMlEH8O7LmVYgj0AmJP_BIvefj5GJKMm0m5Q', '2024-01-29 08:28:31'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjU1MSwiZXhwIjoxNzA2NTMwOTUxfQ.hJQ7iCEJgsNrZaGdAb9yqcKl9CS2fENuYRT5qRRdFJI', '2024-01-29 08:29:28'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxODU4NiwiZXhwIjoxNzA2NTMyOTg2fQ.Mp_-ZWPz3Ltr7wPvmpprb_lQekRTWyqPn_oN0Ic7FVY', '2024-01-29 09:00:52'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxNjk5MCwiZXhwIjoxNzA2NTMxMzkwfQ.MFh2foWWzQh7eeFIV4rvlloi3sQFW8HlETixm8wAmPc', '2024-01-29 09:42:34'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUxODg1OSwiZXhwIjoxNzA2NTMzMjU5fQ.MBFTMima6rXdZPyCMPGtL_Bj4kUUuwFYp2YzCceXgvk', '2024-01-29 09:42:44'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUyMTU2MiwiZXhwIjoxNzA2NTM1OTYyfQ.8blhhKOnHaZVW2XJeDXU3mQyTZNRas5K0wvrD4fDbk8', '2024-01-29 11:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `email_verification`
--

CREATE TABLE `email_verification` (
  `verification_id` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `verification_code` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_verification`
--

INSERT INTO `email_verification` (`verification_id`, `User_ID`, `verification_code`, `expires_at`) VALUES
(4, 53, 'emsfCKSy', '2024-02-05 11:45:50'),
(5, 53, 'RWyhL75L', '2024-02-05 11:54:22'),
(6, 53, 'tGU7FsDo', '2024-02-05 11:55:22'),
(7, 53, 'amKgGiyD', '2024-02-05 11:55:31'),
(8, 53, 'cf5I2zes', '2024-02-05 11:58:05'),
(9, 53, 'RCHcMH6d', '2024-02-05 12:04:05'),
(10, 53, 'JUxyrMl4', '2024-02-05 12:26:42'),
(11, 53, 'W4jyf2md', '2024-02-05 12:29:22'),
(12, 53, '08NgrLI3', '2024-02-05 12:29:29'),
(13, 53, 'Gqgk10gS', '2024-02-05 12:33:13'),
(14, 53, 'RAnrz2WG', '2024-02-05 12:34:51'),
(15, 53, 'QO2jgv79', '2024-02-05 12:35:43'),
(16, 54, 'ZS8yWzCt', '2024-02-05 12:40:28'),
(17, 54, 'ohHTnGtG', '2024-02-05 14:15:00'),
(18, 54, 'mIoBigZl', '2024-02-05 14:18:55'),
(19, 54, 'KfN2A31u', '2024-02-05 14:21:14'),
(20, 54, 'hEmcXPhz', '2024-02-05 14:22:36'),
(21, 54, 'pwbHI3Ka', '2024-02-05 15:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `Event_ID` int(11) NOT NULL,
  `Image` text DEFAULT NULL,
  `EventName` varchar(255) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Visibility` enum('Public','Private') NOT NULL,
  `ParticipantCount` int(11) DEFAULT 0,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_comments`
--

CREATE TABLE `event_comments` (
  `Comment_ID` int(11) NOT NULL,
  `Event_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Comment` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_comment_likes`
--

CREATE TABLE `event_comment_likes` (
  `Like_ID` int(11) NOT NULL,
  `Comment_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_likes`
--

CREATE TABLE `event_likes` (
  `Like_ID` int(11) NOT NULL,
  `Event_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupchat`
--

CREATE TABLE `groupchat` (
  `GroupChat_ID` int(11) NOT NULL,
  `GroupImage` text DEFAULT NULL,
  `GroupName` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupparticipants`
--

CREATE TABLE `groupparticipants` (
  `GroupChat_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Joined_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `individualchat`
--

CREATE TABLE `individualchat` (
  `Chat_ID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_ID1` int(11) DEFAULT NULL,
  `User_ID2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `individualchat`
--

INSERT INTO `individualchat` (`Chat_ID`, `Content`, `Created_At`, `Updated_At`, `User_ID1`, `User_ID2`) VALUES
(40, 'kjhgbfcl', '2024-02-04 21:00:33', '2024-02-04 21:00:33', 50, 49),
(41, 'mlj', '2024-02-04 21:00:36', '2024-02-04 21:00:36', 50, 49),
(42, '!:klj', '2024-02-04 21:00:39', '2024-02-04 21:00:39', 50, 49),
(43, '!:mkj', '2024-02-04 21:00:42', '2024-02-04 21:00:42', 50, 51),
(44, '!:;,hnm!;', '2024-02-04 21:00:45', '2024-02-04 21:00:45', 50, 48),
(45, '§/.,', '2024-02-04 21:00:54', '2024-02-04 21:00:54', 50, 51),
(46, '!:;,', '2024-02-04 21:00:57', '2024-02-04 21:00:57', 50, 51);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `Post_ID` int(11) NOT NULL,
  `Image` text DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Visibility` enum('Public','Private') NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `Comment_ID` int(11) NOT NULL,
  `Post_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Comment` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_comment_likes`
--

CREATE TABLE `post_comment_likes` (
  `Like_ID` int(11) NOT NULL,
  `Comment_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `Like_ID` int(11) NOT NULL,
  `Post_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `Survey_ID` int(11) NOT NULL,
  `Image` text DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `VoteCount` int(11) DEFAULT 0,
  `Visibility` enum('Public','Private') NOT NULL,
  `EndDate` date DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey_comments`
--

CREATE TABLE `survey_comments` (
  `Comment_ID` int(11) NOT NULL,
  `Survey_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Comment` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey_comment_likes`
--

CREATE TABLE `survey_comment_likes` (
  `Like_ID` int(11) NOT NULL,
  `Comment_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey_likes`
--

CREATE TABLE `survey_likes` (
  `Like_ID` int(11) NOT NULL,
  `Survey_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Biography` text DEFAULT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `Role` enum('Admin','User') NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `ProfileImage` text DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `Username`, `LastName`, `FirstName`, `BirthDate`, `Age`, `Address`, `Email`, `Phone`, `Biography`, `hashedPassword`, `Role`, `Gender`, `ProfileImage`, `Created_At`, `Updated_At`) VALUES
(48, 'aaaaaaaaa', 'aaaaa', 'aaaa', '2008-02-02', 16, 'Marche, Italia', 'aaa@aa.aa', '+213123546978', 'aaaaa', '$argon2id$v=19$m=65536,t=5,p=1$CG5R2u7kfwC8YaVqmDP8tw$vKZKEeYoZVDxbnOo15nrBW58XosxI1MWuZn54A5GBf8', 'User', 'Male', '1706897216565-rn_image_picker_lib_temp_9228dbd9-c963-4198-affc-c5905f02878d.jpg', '2024-02-02 18:06:56', '2024-02-02 18:06:56'),
(49, 'aaa', 'aaaa', 'aaa', '2008-02-04', 16, 'aa', 'aaa@aa.aaa', '+330659165303', 'first', '$argon2id$v=19$m=65536,t=5,p=1$mN3DTecXdLkcAkZxk6E55g$J+hmvjngcQnolZw8gBKXtX6m6t0+a//NehkQOZ4dcvA', 'User', 'Male', '1707040044816-rn_image_picker_lib_temp_e8f9c106-3547-49e6-948e-4107bd96892a.jpg', '2024-02-04 09:47:24', '2024-02-04 09:47:24'),
(50, 'aaaaaaa', 'aaaa', 'aaaa', '2008-02-04', 16, 'Francette, Port de Suffren, Paris, France', 'aa@aa.aa', '+330659165306', 'aaaaa', '$argon2id$v=19$m=65536,t=5,p=1$FHdZwS3Qh2bLH5kN47itcQ$4y8gJCYKlNShyN2n9YFlnIPJaXEBpRJDoiqPwK8hBgM', 'User', 'Male', '1707074656797-rn_image_picker_lib_temp_dee453b1-d63e-4dfa-9574-976ba07ab862.jpg', '2024-02-04 19:24:16', '2024-02-04 19:24:16'),
(51, 'aaaa', 'vvvvv', 'nnnnn', '2008-02-04', 16, 'Francette, Port de Suffren, Paris, France', 'aa@aa.aai', '+330659165305', 'oooooi', '$argon2id$v=19$m=65536,t=5,p=1$sa2zmI+x/p/Y/BxzRXIPUA$yisdlAEYlx5elIrbQNweWwXfU46sAUQsUFURhpet6P4', 'User', 'Female', '1707080206671-rn_image_picker_lib_temp_116b4eca-9ca3-44e9-bf09-8c71652ef315.jpg', '2024-02-04 20:56:46', '2024-02-04 20:56:46'),
(52, 'aaaaa', 'aaaa', 'aaaa', '2008-02-04', 16, 'Francette, Port de Suffren, Paris, France', 'aa@aa.aaa', '+330659165302', 'zzzzz', '$argon2id$v=19$m=65536,t=5,p=1$SEWv75nJtIhQZTcH7sVTsA$Q7JOQW+Gbzd1E2Ota5yLZz23dXJl+pxw9uvP2QKLLg4', 'User', 'Male', '1707085154048-rn_image_picker_lib_temp_844ca594-ca1c-4c86-9ed1-5e36a92b4e2a.jpg', '2024-02-04 22:19:14', '2024-02-04 22:19:14'),
(53, 'aaaaaa', 'aaa', 'aaa', '2008-02-05', 16, 'USA', 'Aa@aa.aaf', '+3306591653058', 'Aaaaa', '$argon2id$v=19$m=65536,t=5,p=1$J2nOfBsk0+zUOWRFQp3ZmQ$dPau+4D8Q5JM28vDlNY2gqwt8kylzZoudIBWiBQ2y7Q', 'User', 'Male', '1707120823709-rn_image_picker_lib_temp_6ebcaa95-0fad-4e19-a5b1-1df5595edbf1.jpg', '2024-02-05 08:13:43', '2024-02-05 08:13:43'),
(54, 'justbil47', 'bilel', 'zara', '1981-03-27', 42, '2 Pl. du Dr Vauthier, 13009 Marseille, France', 'justbil47@gmail.com', '+3306591653033', 'justbil47@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$XEMfMsxu1IE7xcoGC2tEFg$hQq+8hulF+OUU93MbyatywPp4An3EzKQ9fja4sY2hLU', 'User', 'Male', '1707135862274-rn_image_picker_lib_temp_0bc4d6f4-3ef4-4b2a-b71c-7b002ac5dcc3.jpg', '2024-02-05 12:24:22', '2024-02-05 12:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `user_followers`
--

CREATE TABLE `user_followers` (
  `Follower_ID` int(11) NOT NULL,
  `Following_ID` int(11) NOT NULL,
  `Followed_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_verification`
--
ALTER TABLE `email_verification`
  ADD PRIMARY KEY (`verification_id`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `event_comments`
--
ALTER TABLE `event_comments`
  ADD PRIMARY KEY (`Comment_ID`),
  ADD KEY `Event_ID` (`Event_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `event_comment_likes`
--
ALTER TABLE `event_comment_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Comment_ID` (`Comment_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `event_likes`
--
ALTER TABLE `event_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Event_ID` (`Event_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `groupchat`
--
ALTER TABLE `groupchat`
  ADD PRIMARY KEY (`GroupChat_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `groupparticipants`
--
ALTER TABLE `groupparticipants`
  ADD PRIMARY KEY (`GroupChat_ID`,`User_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `individualchat`
--
ALTER TABLE `individualchat`
  ADD PRIMARY KEY (`Chat_ID`),
  ADD KEY `User_ID1` (`User_ID1`),
  ADD KEY `User_ID2` (`User_ID2`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`Post_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`Comment_ID`),
  ADD KEY `Post_ID` (`Post_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Comment_ID` (`Comment_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Post_ID` (`Post_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`Survey_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `survey_comments`
--
ALTER TABLE `survey_comments`
  ADD PRIMARY KEY (`Comment_ID`),
  ADD KEY `Survey_ID` (`Survey_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `survey_comment_likes`
--
ALTER TABLE `survey_comment_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Comment_ID` (`Comment_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `survey_likes`
--
ALTER TABLE `survey_likes`
  ADD PRIMARY KEY (`Like_ID`),
  ADD KEY `Survey_ID` (`Survey_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Username_2` (`Username`),
  ADD UNIQUE KEY `Phone` (`Phone`);

--
-- Indexes for table `user_followers`
--
ALTER TABLE `user_followers`
  ADD PRIMARY KEY (`Follower_ID`,`Following_ID`),
  ADD KEY `Following_ID` (`Following_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_verification`
--
ALTER TABLE `email_verification`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `Event_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_comments`
--
ALTER TABLE `event_comments`
  MODIFY `Comment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_comment_likes`
--
ALTER TABLE `event_comment_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_likes`
--
ALTER TABLE `event_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groupchat`
--
ALTER TABLE `groupchat`
  MODIFY `GroupChat_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `individualchat`
--
ALTER TABLE `individualchat`
  MODIFY `Chat_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `Post_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `Comment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey`
--
ALTER TABLE `survey`
  MODIFY `Survey_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey_comments`
--
ALTER TABLE `survey_comments`
  MODIFY `Comment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey_comment_likes`
--
ALTER TABLE `survey_comment_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `survey_likes`
--
ALTER TABLE `survey_likes`
  MODIFY `Like_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `email_verification`
--
ALTER TABLE `email_verification`
  ADD CONSTRAINT `email_verification_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `event_comments`
--
ALTER TABLE `event_comments`
  ADD CONSTRAINT `event_comments_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  ADD CONSTRAINT `event_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `event_comment_likes`
--
ALTER TABLE `event_comment_likes`
  ADD CONSTRAINT `event_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `event_comments` (`Comment_ID`),
  ADD CONSTRAINT `event_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `event_likes`
--
ALTER TABLE `event_likes`
  ADD CONSTRAINT `event_likes_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  ADD CONSTRAINT `event_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `groupchat`
--
ALTER TABLE `groupchat`
  ADD CONSTRAINT `groupchat_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `groupparticipants`
--
ALTER TABLE `groupparticipants`
  ADD CONSTRAINT `groupparticipants_ibfk_1` FOREIGN KEY (`GroupChat_ID`) REFERENCES `groupchat` (`GroupChat_ID`),
  ADD CONSTRAINT `groupparticipants_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `individualchat`
--
ALTER TABLE `individualchat`
  ADD CONSTRAINT `individualchat_ibfk_1` FOREIGN KEY (`User_ID1`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `individualchat_ibfk_2` FOREIGN KEY (`User_ID2`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `post_comment_likes`
--
ALTER TABLE `post_comment_likes`
  ADD CONSTRAINT `post_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `post_comments` (`Comment_ID`),
  ADD CONSTRAINT `post_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `survey_comments`
--
ALTER TABLE `survey_comments`
  ADD CONSTRAINT `survey_comments_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  ADD CONSTRAINT `survey_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `survey_comment_likes`
--
ALTER TABLE `survey_comment_likes`
  ADD CONSTRAINT `survey_comment_likes_ibfk_1` FOREIGN KEY (`Comment_ID`) REFERENCES `survey_comments` (`Comment_ID`),
  ADD CONSTRAINT `survey_comment_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `survey_likes`
--
ALTER TABLE `survey_likes`
  ADD CONSTRAINT `survey_likes_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  ADD CONSTRAINT `survey_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `user_followers`
--
ALTER TABLE `user_followers`
  ADD CONSTRAINT `user_followers_ibfk_1` FOREIGN KEY (`Follower_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `user_followers_ibfk_2` FOREIGN KEY (`Following_ID`) REFERENCES `user` (`User_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
