-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: worksocial
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

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
-- Table structure for table `blacklisted_tokens`
--

DROP TABLE IF EXISTS `blacklisted_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `blacklisted_tokens` (
  `jwtToken` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklisted_tokens`
--

/*!40000 ALTER TABLE `blacklisted_tokens` DISABLE KEYS */;
INSERT INTO `blacklisted_tokens` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTUzMDIxOSwiZXhwIjoxNzA1NTQ0NjE5fQ.NWTR0dMHheB0InAFmg6pKtAWQIUMMEribRlgzB0TdyA','2024-01-17 23:54:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTUzNzA1MywiZXhwIjoxNzA1NTUxNDUzfQ.pNNb1bYWMq47SCJBcZDGfEB-S5tZ4_N0T8aFQSYH1-8','2024-01-18 00:18:17'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTUzNzM2NywiZXhwIjoxNzA1NTUxNzY3fQ.C1pn4xGm36iypuwR1Y0S1ld8_uQ_iTdXXDli3EfIZUg','2024-01-18 00:23:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTU2ODYzNCwiZXhwIjoxNzA1NTgzMDM0fQ.UYDnxVn8efpi0May3N3_OpbTSab6yOMsE7hMEmGls0k','2024-01-18 09:04:35'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTU2ODczNCwiZXhwIjoxNzA1NTgzMTM0fQ.S172ajAiDdtwAdQnJ8jPvF73JW1zcEsBxxTtdkJir2k','2024-01-18 09:06:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTY1NzIyNiwiZXhwIjoxNzA1NjcxNjI2fQ.qOaneELeXIkdTIjol7uoxKIy96rCmNm8JxTGbbbirs8','2024-01-19 09:40:31'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTY1NzI0MywiZXhwIjoxNzA1NjcxNjQzfQ.21IMnBVEKBPkxKUMVEH54gh-hcwS3WQrG1OHMzDfFVE','2024-01-19 09:47:01'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTY1NzYzMSwiZXhwIjoxNzA1NjcyMDMxfQ.fUz_gAUXJ1YRptjHCZFOPCmXP0gLdFl0h6hyqXRF2Q8','2024-01-19 12:39:28'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTY2Nzk3MiwiZXhwIjoxNzA1NjgyMzcyfQ.6W-eNZb31lDKafT__3s4GFE2TkLHZrijMdheWRxT_UY','2024-01-19 13:04:53'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4MjgwNSwiZXhwIjoxNzA1Nzk3MjA1fQ.nv4Zu5SBBKtcVg_3DSH0NDC8ELG0FuMOgfpZuLhi7vI','2024-01-20 20:56:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4NjQ5MiwiZXhwIjoxNzA1ODAwODkyfQ.1gudqwz-d_MBEMlDxf-DCVLabmURrmWVkjKbOLi2LKQ','2024-01-20 21:40:53'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDU3ODY4NjIsImV4cCI6MTcwNTgwMTI2Mn0.zKt1rYU4IlCXWf6a56baB6zpFn3k7ebFnS6Okq1kb1Y','2024-01-20 21:43:21'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4NzUwNSwiZXhwIjoxNzA1ODAxOTA1fQ.48ockVSstZIq4VCPkdpYkTH2sQKXMY8-6BlX2hVBy-o','2024-01-20 21:59:21'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4ODA3OSwiZXhwIjoxNzA1ODAyNDc5fQ.36pox9AR_3WjNleklvts8lnRIg6An_4Cb121lul5ec0','2024-01-20 22:11:42'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4ODc0MiwiZXhwIjoxNzA1ODAzMTQyfQ.5pWxwOQ_xqGQcW641mPAPlmvTGX_2-K65xyzh9-lPrc','2024-01-20 22:14:25'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDU3OTE2MzQsImV4cCI6MTcwNTgwNjAzNH0.dAjLLHgZFE2EE7lROpUwlklz1RyqQ7Esspj5H8abXZA','2024-01-20 23:04:04'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc5MTg1MCwiZXhwIjoxNzA1ODA2MjUwfQ.jrLofnB5-iNzATw9ZiFfQZVu04kapv0DKaSrJxZHQ6o','2024-01-20 23:05:03'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc4ODc0MiwiZXhwIjoxNzA1ODAzMTQyfQ.5pWxwOQ_xqGQcW641mPAPlmvTGX_2-K65xyzh9-lPrc','2024-01-20 23:14:20'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTc5MjU3NywiZXhwIjoxNzA1ODA2OTc3fQ.9L-7vYBq2vD6qJYTOJuB_Gszmaxi2dBsiBNtP46SzAI','2024-01-20 23:19:40'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTg0Nzk5MiwiZXhwIjoxNzA1ODYyMzkyfQ.OBAJdnOKARSY6zPEciUqrLCcKVuefcCaeusnmz_au3I','2024-01-21 14:50:30'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTg0ODY0MCwiZXhwIjoxNzA1ODYzMDQwfQ.ZeG81d5j9jjsajLmpHZiSVIy2gqKucDyJQ5pHfxq7MA','2024-01-21 15:01:42'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkxMDgwNywiZXhwIjoxNzA1OTI1MjA3fQ.3pnKes373R0VNhWnhTl4BM6ULso50ER8CawUJFpeUMM','2024-01-22 08:48:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkxNDk3NywiZXhwIjoxNzA1OTI5Mzc3fQ.gB0mcdWdWToWppUIXWnCZYGjeKaLga_I_RMuU08_A2Q','2024-01-22 09:31:47'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkxNTkxNiwiZXhwIjoxNzA1OTMwMzE2fQ.XOJa3XIo3kgMPSvPAPhLWlraK3Nc_Cao0BMf78mwWIY','2024-01-22 10:14:39'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJpYXQiOjE3MDU5MTg1MzksImV4cCI6MTcwNTkzMjkzOX0.cE_5Og2_hwRkLhrtnwBUXYwAKmuez5Lbjb7jID5tLU8','2024-01-22 12:05:30'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkyNTEzNSwiZXhwIjoxNzA1OTM5NTM1fQ.ed7niwBP_hiBLFwrTT14eTIxlVJcxxINWeiY0ZlGU1I','2024-01-22 13:03:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDU5Mjg2MzEsImV4cCI6MTcwNTk0MzAzMX0.HHZqPJXmL7jzQsF6GoGj88VL2JsanPND6WoGyNCzwtE','2024-01-22 13:07:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNTkyODgzMywiZXhwIjoxNzA1OTQzMjMzfQ.iLtK34dLk6w0EvLHmHjZWvheA6uGkwHZGIQxlghYYx8','2024-01-22 14:40:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDU5MzQ0NTIsImV4cCI6MTcwNTk0ODg1Mn0.bTR2gOXoKFTP90wXTtfdUODC5WazqYSXMukEwssYUZo','2024-01-22 14:48:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDU5OTg5NjAsImV4cCI6MTcwNjAxMzM2MH0.i2fObWEemXuyrzFEzn6AcLIHubxEYyfHI26F8oaJK1w','2024-01-23 10:04:57'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYwMDQzMDIsImV4cCI6MTcwNjAxODcwMn0._JUViI_d9JErlcsmK47MwrDrRquMOgG1XiFYWA8kxOM','2024-01-23 12:22:18'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjAxMjU0MywiZXhwIjoxNzA2MDI2OTQzfQ.TG-eiegzls4qejPxuA9MVj6Qt_qYIzTMwYNPmI7EdaA','2024-01-23 12:22:33'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYwMTI1NTcsImV4cCI6MTcwNjAyNjk1N30.I0VXXRLz2SStRvRylZW-cwkehCy3naK3bdaJCbnvnPw','2024-01-23 13:56:20'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjAxODg5OCwiZXhwIjoxNzA2MDMzMjk4fQ.gSXCZZlJVzzoDuKwOMO07eO5u7mRbM2pfqB8lv5kzfE','2024-01-23 14:31:32'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjA4MzMxMCwiZXhwIjoxNzA2MDk3NzEwfQ.K0ge1yOwmEMvCICXLKClhNfbhCsJu7CLekcSiISOZ0U','2024-01-24 08:02:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjE3MDEzMywiZXhwIjoxNzA2MTg0NTMzfQ.7f-CHT5caZ2hM24DOvHcAuulMp6jjDA6MOwgehTqhg4','2024-01-25 09:56:14'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYxNzY1ODIsImV4cCI6MTcwNjE5MDk4Mn0.Z061MQ04-Cs2Wx9s8AigcE36k8vVHaHw54TXAuvGqEY','2024-01-25 13:27:55'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjE4OTI3OSwiZXhwIjoxNzA2MjAzNjc5fQ.8Ziw0_cHlagdQQY_G18lz8eqdFuqwpZYg6L4OsVyBE4','2024-01-25 13:28:37'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjI1NjkxMiwiZXhwIjoxNzA2MjcxMzEyfQ.OM9s8kfv87ItRmEfQKTo4_2P0uwc_A1Vgi0Xgthj83M','2024-01-26 08:20:26'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYyNTcyMzAsImV4cCI6MTcwNjI3MTYzMH0.Pl0495coEnCNdr0h8mbYy3Y7bn_kKtbajoX-YxE2468','2024-01-26 10:15:38'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjI2NDE1MiwiZXhwIjoxNzA2Mjc4NTUyfQ.BIYOnns51sBjP2bDhnOaUNKHGAgsJOOCQpfLV6_JadI','2024-01-26 10:46:43'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYyNjYwMDcsImV4cCI6MTcwNjI4MDQwN30.Vgz2pMZh4YSSnKcgNPrauhzlxwRdopwxBeqQ3h-1Fms','2024-01-26 13:06:14'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjI3NDM4MCwiZXhwIjoxNzA2Mjg4NzgwfQ.naH3MH-RJtSh7fcq7lisfiVL2CocN6bhQAPPtN9vWiM','2024-01-26 14:48:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDYyODA0OTcsImV4cCI6MTcwNjI5NDg5N30.xvicHmBIhfXqz-gdEwMrWq5BQsP96AC_qsIENEHHJFg','2024-01-26 15:32:47'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjU1NzY1MywiZXhwIjoxNzA2NTcyMDUzfQ.LlBVGWw-T6GA_ZqPAzm4Zi9NRXErmTCr0M3GKU12iKs','2024-01-29 19:49:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY2MTY4MzEsImV4cCI6MTcwNjYzMTIzMX0.ROcpTAiiVJ6dTC7C_d2Lbol7fy3HJVqhFPVeFNuNmBY','2024-01-30 14:33:17'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTcwNjc5MDUxMCwiZXhwIjoxNzA2ODA0OTEwfQ.k-4Ni8rhpmtXeB1M4vBQfDXwdgrI5yS_AZR13Hs0248','2024-02-01 15:19:20'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4NjEwNDIsImV4cCI6MTcwNjg3NTQ0Mn0.jquUb2uRIgGCbPaHEbYOqrVUocd_UCT-C-Y5FRSGAPk','2024-02-02 12:00:51'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4NzUyNTUsImV4cCI6MTcwNjg4OTY1NX0.HzxujC1pGC-2QGs2geakqcTUIkWFlevMXJRtiokqTxg','2024-02-02 13:39:50'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4ODExOTgsImV4cCI6MTcwNjg5NTU5OH0.01MXdZeeLwhUyJqTUcpOb3qrpho7Ihhav9fovdpYzAU','2024-02-02 13:55:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4ODIxMzEsImV4cCI6MTcwNjg5NjUzMX0.1Ocig7pv1HrBGf1FXsCQ3CeuiD0Ah9UrT_UCjiaYH7A','2024-02-02 15:23:42'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4ODc0MjcsImV4cCI6MTcwNjkwMTgyN30.J4DKi9C31dkfR1G2IZclGe5n6zCV2Lx72YvCX5Gildo','2024-02-02 15:42:43'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDY4ODkyMDUsImV4cCI6MTcwNjkwMzYwNX0.OZqOhoe_NAD5FJq2-QqIl_cropDXh4CVV5vd2lpS0nk','2024-02-02 15:56:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcxMjI3NTYsImV4cCI6MTcwNzEzNzE1Nn0.Fbg8aCAhE4D2qkBAI5AqGJIJV2bVXyECdrgE9yLqXE0','2024-02-05 10:06:09'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDcxMjc2NzgsImV4cCI6MTcwNzE0MjA3OH0.Ws97vPqMuk46CO2p1MMfF70MfRMOB2fLEHLvFw9Fdog','2024-02-05 10:22:38'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcxNDcxNjcsImV4cCI6MTcwNzE2MTU2N30.xuA473gZBH4vgWZAufuG6-a0AT_oJl0vnp5EUkCj8KQ','2024-02-05 15:36:13'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyMjE4MjMsImV4cCI6MTcwNzIzNjIyM30.Z55A8Ds7RvHFh58L0CPzetZTLErnyuZKCdFWfuS7Hew','2024-02-06 12:19:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDcyMjIwNDEsImV4cCI6MTcwNzIzNjQ0MX0.4HPIvjHG2E3dJEycREfGbEuK7t7hrsOeu4equI4bRyk','2024-02-06 15:03:59'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyMzE4NzEsImV4cCI6MTcwNzI0NjI3MX0.huAJqRc4PjUDTj2wQ0az3OMoColKbKnSgRtJ5cUc2X0','2024-02-06 15:37:14'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTI0MjYsImV4cCI6MTcwNzMwNjgyNn0.wtQe4Jp_L_2SzIxyVF1NyOGGmUrnxfBhA5XX_chKHBQ','2024-02-07 08:15:55'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTM3NjUsImV4cCI6MTcwNzMwODE2NX0.MC7I0MUPRFWbEgDGIJlkP75h1ldS6Ri05I7Chmd1lz8','2024-02-07 08:23:27'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTQzMTQsImV4cCI6MTcwNzMwODcxNH0.qzasTA7D9QXb8U2gp3u2yqbMw_9NcpHy3e_Z6arbvaA','2024-02-07 08:40:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTYwOTcsImV4cCI6MTcwNzMxMDQ5N30.zhj4QkjDFdQdQimO-SbVTuYAiuq0CGZ1la2HmwqX5ys','2024-02-07 09:19:28'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDcyOTc1ODksImV4cCI6MTcwNzMxMTk4OX0.jSa-QKj74y76sKqn5x7ehO5jY3yBBkkAsWRNXcKOgOI','2024-02-07 09:26:09'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTgxOTQsImV4cCI6MTcwNzMxMjU5NH0.sfybquOBCWkwznAcc35xJqH1hGcy_Hvh85r1OHSHkXw','2024-02-07 09:32:35'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDcyOTgzNjEsImV4cCI6MTcwNzMxMjc2MX0.I_KkeovDM5UGj5z_15BLzOPe7T5yrVOF9GCS1klnJ80','2024-02-07 09:42:40'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDcyOTg5NjQsImV4cCI6MTcwNzMxMzM2NH0.J5nXq6xdl5Nk8tqB7LM_BMIimW3MAVOlcnDfBZkLLBk','2024-02-07 09:44:05'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDcyOTkwNTAsImV4cCI6MTcwNzMxMzQ1MH0.jsq2eDlEITSdX0SAKPcO939WOfkJigkizw7BHWpCd78','2024-02-07 10:02:19'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDAyODEsImV4cCI6MTcwNzMxNDY4MX0.xwxhEo3sWBXEL_AFenEO7pIoeWVcsixTHMj6GKw3Pls','2024-02-07 10:05:22'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDA5MDUsImV4cCI6MTcwNzMxNTMwNX0.L-pJx2E81uSSUCD8dTZeq5kcNgGm86V1AzbcVQxU17Q','2024-02-07 10:18:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDEyODcsImV4cCI6MTcwNzMxNTY4N30.LgflCHZ2q-8p_D-Xg3TYSg0Yv2VqnJlXIYLQBel-Gsk','2024-02-07 10:31:34'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDE5MDYsImV4cCI6MTcwNzMxNjMwNn0.YpEMjqO0DEljm80s94ufNBcLtIVGdu-L6cg5gIt50Vs','2024-02-07 10:35:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDIxMzMsImV4cCI6MTcwNzMxNjUzM30.aq97138GZzCiFN0ijb3G0PjnOPIVOxPKIAasbXqIDjE','2024-02-07 10:36:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDIyNjksImV4cCI6MTcwNzMxNjY2OX0.i3dvXKYJfvCpBzLfYqjNBbBBG_-Sg4DtwF3XXStTWWY','2024-02-07 10:43:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDI3NDksImV4cCI6MTcwNzMxNzE0OX0.Zh_sBYQsXChN3zHbdtfn34H29gu-zKcKIo9Nk44hAwo','2024-02-07 10:45:56'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDI5NTUsImV4cCI6MTcwNzMxNzM1NX0.RLm1XtLczAZKu5PdgcVPVp-3kT5s7bq9_kZZ6nThW84','2024-02-07 10:49:45'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDczMDMzMDYsImV4cCI6MTcwNzMxNzcwNn0.rAUvsyOVyHjW9aG3ZjqH4UhL9T3zIgIeofg0nQJrJuA','2024-02-07 10:56:36'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDM0NTEsImV4cCI6MTcwNzMxNzg1MX0.Ann27siNUE_O8F7yAkrtgWXYzQw-aXK9qW3WEEPxqEM','2024-02-07 10:58:11'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDM0OTksImV4cCI6MTcwNzMxNzg5OX0.xs5fbmDd3N8kOfcm6YrqcTiXCkkoyphRVZuZ23yDOoM','2024-02-07 10:58:58'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDM1NDIsImV4cCI6MTcwNzMxNzk0Mn0.o2hmAEpt0GVTcbmtQZNP2bXsp-MRG7blSNABjMj6TFw','2024-02-07 11:00:45'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDM2OTksImV4cCI6MTcwNzMxODA5OX0.WqsuJ18_wCOtnFlzkgB_k327LiPjOvaRn--pXLizgQU','2024-02-07 11:09:19'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDQyMjUsImV4cCI6MTcwNzMxODYyNX0.c7xYjW4iMpcf75hiOPy0BbX23tmrLafT0ebW8qDNHxg','2024-02-07 11:13:09'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDQ1NTQsImV4cCI6MTcwNzMxODk1NH0.KTv0251mY_n2KCpq7DhMnnSKSSQKJrefXOFKoxxYi5Q','2024-02-07 11:21:43'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDQ5NjYsImV4cCI6MTcwNzMxOTM2Nn0.gmooyevMg2tqid9XJqxwg-dsgbNaoFnqPukR4ndZYDI','2024-02-07 12:08:27'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDc3MTIsImV4cCI6MTcwNzMyMjExMn0.-GYHbCXLNXLIn7HtyE78R3dJOQpa9eygWgAoa6ZJBZM','2024-02-07 12:10:46'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDc4NzgsImV4cCI6MTcwNzMyMjI3OH0.Dl3y03ESOptzEwmmRgK2xEI6ENTcUIx7HKU53CkBq1M','2024-02-07 12:12:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3MDczMDc5NTAsImV4cCI6MTcwNzMyMjM1MH0.WcOE5bzyVrsVnWhr3uX4AEW1LOUZDpwIW99ObaYZFxc','2024-02-07 12:16:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDgyOTksImV4cCI6MTcwNzMyMjY5OX0.mHx8aSUYvy45y9LCySwcP-QRlJvjpj9q-Y3ppLr0-1s','2024-02-07 12:19:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDgzNzMsImV4cCI6MTcwNzMyMjc3M30.UXkFwlnyd6nRyIL3YsPr3Opc66g5t_wQrVAmobV87lw','2024-02-07 12:22:12'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDg1MzgsImV4cCI6MTcwNzMyMjkzOH0.MytsAWgzZQHLXgUmvaNVO5lYEKMymclIZI3diNM4Tro','2024-02-07 12:28:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMDg5MzUsImV4cCI6MTcwNzMyMzMzNX0.8q7oVQrP4_tanIyLW4v_p9KL-zyqWvapRTzuXI-Zm_M','2024-02-07 13:21:25'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMTIwOTksImV4cCI6MTcwNzMyNjQ5OX0.YKW1eSIe_CY3axS5QCAeAhY4uFfTeWgEJ6UQSMj333Y','2024-02-07 15:16:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMTg5ODMsImV4cCI6MTcwNzMzMzM4M30.ilBZTV9V7ri3pFwOop4NxL7tUsozDl-q1EoprJaQ8HY','2024-02-07 15:42:31'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczMzUyNjIsImV4cCI6MTcwNzM0OTY2Mn0.JpSx9v2CdcaIchwrq8VGG4p-6VliA2F85thHzvNKjbk','2024-02-07 21:34:31'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczNDE4ODksImV4cCI6MTcwNzM1NjI4OX0.lTwylBwkuvRyaji4OTBv5mi70eHfPBwuqYG5moXRRso','2024-02-07 22:00:18'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczNDMyNDcsImV4cCI6MTcwNzM1NzY0N30.ewEMfe1zBflHl2gSdZpPUHaJhC8KmU4drMCKLWhj_Jc','2024-02-07 22:11:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDczNzk2MjIsImV4cCI6MTcwNzM5NDAyMn0.55qTxs5JgbDLPi7epHAYilGmWtzYApG4KiU1zJuLRw4','2024-02-08 08:35:02'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0MDU4NjksImV4cCI6MTcwNzQyMDI2OX0.onQdFfdTvpwOoFDLcxACtJb50ChD980RUsBuNAnWDLA','2024-02-08 15:24:47'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0MTkxMjEsImV4cCI6MTcwNzQzMzUyMX0.FKMrd-IrVvMW_SYIGOnp0DmIarfV42mx16AZeSYXeQ4','2024-02-08 19:06:02'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0MjA3NzIsImV4cCI6MTcwNzQzNTE3Mn0.DWl29yIiicQODK3H4utn9fPKhY_tJNOhJ2AzypdO0Pk','2024-02-08 19:52:15'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0MjIwMDIsImV4cCI6MTcwNzQzNjQwMn0.ykel_F2emGD7I7h-FnklpaVXIgRksBYA9MMfukhjNfs','2024-02-08 20:01:39'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0MjI1MDYsImV4cCI6MTcwNzQzNjkwNn0.QSS2RK5Pi8-bsZc4FhxBLs3vqTl3E5gEcJ0oQYS1WEo','2024-02-08 20:08:45'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0NzM1NTIsImV4cCI6MTcwNzQ4Nzk1Mn0.fTIzUpHQdHv8VFIaMkhbvq7i4YRDLdJwxXZqhaYJBic','2024-02-09 10:12:42'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0NzM2NjAsImV4cCI6MTcwNzQ4ODA2MH0.JDCZXEB2Y8YKLFirFPB4YY7jTsKMS_R3wcfNCw0SnLw','2024-02-09 10:26:04'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0NzQ2OTAsImV4cCI6MTcwNzQ4OTA5MH0.ljgCZFFx77Ec0x5a8aX0Z3LxOW4vjpt57vnsbfXYPD4','2024-02-09 10:31:43'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0NzQ4MjIsImV4cCI6MTcwNzQ4OTIyMn0.sMLlvq4Lnc6HeBYW4n1_AHIRwO_2o52BtExgNXVX2JI','2024-02-09 10:46:29'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc0ODI0NDQsImV4cCI6MTcwNzQ5Njg0NH0.UYgiJwfaPtSX8ExFtxA1DCqs-7T11fKv1wUjWZ7AIWg','2024-02-09 13:27:53'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3MjU4NjIsImV4cCI6MTcwNzc0MDI2Mn0.CUTQ28YdAn1XllXLAMlrG11anaxzHDy1rYdvXeo0emU','2024-02-12 08:21:26'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3Mjg0NTQsImV4cCI6MTcwNzc0Mjg1NH0.60kqyDQlIcXovF1CcnJSayvKAIhiGOSVmKouodDfVkQ','2024-02-12 09:01:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3NDA2NzksImV4cCI6MTcwNzc1NTA3OX0.6NxKqLtT1_uHXqfBqmwx__aykekIABa1iXeMpkaUeZg','2024-02-12 12:26:01'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3NDA0MTEsImV4cCI6MTcwNzc1NDgxMX0.9uzXse63OQV_Qv2LThU15yOTXB4ikuh1m_Ad4ioOE0I','2024-02-12 13:06:35'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3NDE5ODAsImV4cCI6MTcwNzc1NjM4MH0.KdZ3l5fc9JyJaPo6VlHJ_NUzbw_u8jgi0X2s2__DcX8','2024-02-12 13:12:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc3NDYwNzQsImV4cCI6MTcwNzc2MDQ3NH0.uQfZN-WvptPYFkpUmzJmcZzKRdlirMIYsHcIjNi3rBw','2024-02-12 16:04:36'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MDc4MTMyODksImV4cCI6MTcwNzgyNzY4OX0.LpkzR3nJdOL0d73-FoAmsYyF0ZLcrjcM7H4eV3TXB78','2024-02-13 12:03:42');
/*!40000 ALTER TABLE `blacklisted_tokens` ENABLE KEYS */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `Company_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `URL` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `Logo` text COLLATE utf8_general_ci,
  `Phone` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `Activity` text COLLATE utf8_general_ci,
  `Address` text COLLATE utf8_general_ci,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Company_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Unknown','unknown.com','logo.png','123-456-7890','info@unknown.com','Unknown','Unknown','2024-02-13 08:25:29','2024-02-13 08:28:04');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

--
-- Table structure for table `company_user`
--

DROP TABLE IF EXISTS `company_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `company_user` (
  `Company_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Company_ID`,`User_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `company_user_ibfk_1` FOREIGN KEY (`Company_ID`) REFERENCES `companies` (`Company_ID`),
  CONSTRAINT `company_user_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_user`
--

/*!40000 ALTER TABLE `company_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_user` ENABLE KEYS */;

--
-- Table structure for table `email_verification`
--

DROP TABLE IF EXISTS `email_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `email_verification` (
  `verification_id` int NOT NULL,
  `User_ID` int NOT NULL,
  `verification_code` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verification`
--

/*!40000 ALTER TABLE `email_verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_verification` ENABLE KEYS */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `Event_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8_general_ci,
  `EventName` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Description` text COLLATE utf8_general_ci,
  `Visibility` enum('Public','Private') COLLATE utf8_general_ci NOT NULL,
  `ParticipantCount` int DEFAULT '0',
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (4,NULL,'Trial 4','2024-01-17',NULL,NULL,NULL,'This event was updated','Public',NULL,'2024-01-16 10:04:02','2024-01-16 10:04:02',5),(5,NULL,'asdfasdf','2024-02-08','2024-02-09','00:00:00','15:00:00','1234123','Public',NULL,'2024-02-02 09:53:47','2024-02-02 09:53:47',18),(6,NULL,'45674567','2024-02-09','2024-02-10','12:00:00','18:00:00','asdfasdf','Public',NULL,'2024-02-02 09:56:05','2024-02-02 09:56:05',18),(7,NULL,'123','2024-02-09','2024-02-10','12:00:00','15:00:00','zxcvzxcvzxcv','Public',NULL,'2024-02-02 10:12:30','2024-02-02 10:12:30',18),(8,'1706870088591-neom-igw-14UnNjg-unsplash.jpg','Image Trial','2024-02-09','2024-02-09','00:00:00','15:00:00','Image Trial','Public',NULL,'2024-02-02 10:34:48','2024-02-02 10:34:48',18),(9,'1707225238146-neom-igw-14UnNjg-unsplash.jpg','Trial','2024-02-08','2024-02-09','00:00:00','15:00:00','asdfasdf','Public',NULL,'2024-02-06 13:13:58','2024-02-06 13:13:58',14),(11,'1707829476789-neom-igw-14UnNjg-unsplash.jpg','Trial Upcoming Event','2024-02-28','2024-02-29','00:00:00','15:00:00','This is to  check if the upcoming events function is working or not on the Dashboard page.','Public',NULL,'2024-02-13 13:04:36','2024-02-13 13:04:36',18),(12,'1707831615117-neom-igw-14UnNjg-unsplash.jpg','Upcoming Event 2','2024-02-23','2024-02-24','20:00:00','22:00:00','This is another trial even to check the display of the order of events','Public',NULL,'2024-02-13 13:40:15','2024-02-13 13:40:15',18);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

--
-- Table structure for table `event_comment_likes`
--

DROP TABLE IF EXISTS `event_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_comment_likes`
--

/*!40000 ALTER TABLE `event_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_comment_likes` ENABLE KEYS */;

--
-- Table structure for table `event_comments`
--

DROP TABLE IF EXISTS `event_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `event_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Event_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_comments_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  CONSTRAINT `event_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_comments`
--

/*!40000 ALTER TABLE `event_comments` DISABLE KEYS */;
INSERT INTO `event_comments` VALUES (6,9,14,'Trial Comment on Events','2024-02-06 13:56:29');
/*!40000 ALTER TABLE `event_comments` ENABLE KEYS */;

--
-- Table structure for table `event_likes`
--

DROP TABLE IF EXISTS `event_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `event_likes` (
  `Event_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `event_likes_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `event` (`Event_ID`),
  CONSTRAINT `event_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_likes`
--

/*!40000 ALTER TABLE `event_likes` DISABLE KEYS */;
INSERT INTO `event_likes` VALUES (6,14,'2024-02-06 14:19:35'),(9,18,'2024-02-07 12:19:59');
/*!40000 ALTER TABLE `event_likes` ENABLE KEYS */;

--
-- Table structure for table `groupchat`
--

DROP TABLE IF EXISTS `groupchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `groupchat` (
  `GroupChat_ID` int NOT NULL AUTO_INCREMENT,
  `GroupImage` text COLLATE utf8_general_ci,
  `GroupName` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Content` text COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`GroupChat_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `groupchat_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupchat`
--

/*!40000 ALTER TABLE `groupchat` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupchat` ENABLE KEYS */;

--
-- Table structure for table `groupparticipants`
--

DROP TABLE IF EXISTS `groupparticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `groupparticipants` (
  `GroupChat_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Joined_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`GroupChat_ID`,`User_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `groupparticipants_ibfk_1` FOREIGN KEY (`GroupChat_ID`) REFERENCES `groupchat` (`GroupChat_ID`),
  CONSTRAINT `groupparticipants_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupparticipants`
--

/*!40000 ALTER TABLE `groupparticipants` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupparticipants` ENABLE KEYS */;

--
-- Table structure for table `individualchat`
--

DROP TABLE IF EXISTS `individualchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `individualchat` (
  `Chat_ID` int NOT NULL AUTO_INCREMENT,
  `Content` text COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID1` int DEFAULT NULL,
  `User_ID2` int DEFAULT NULL,
  PRIMARY KEY (`Chat_ID`),
  KEY `User_ID1` (`User_ID1`),
  KEY `User_ID2` (`User_ID2`),
  CONSTRAINT `individualchat_ibfk_1` FOREIGN KEY (`User_ID1`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `individualchat_ibfk_2` FOREIGN KEY (`User_ID2`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individualchat`
--

/*!40000 ALTER TABLE `individualchat` DISABLE KEYS */;
INSERT INTO `individualchat` VALUES (1,'Hello','2024-01-22 08:46:30','2024-01-22 08:46:30',5,1);
/*!40000 ALTER TABLE `individualchat` ENABLE KEYS */;

--
-- Table structure for table `inviteFriends`
--

DROP TABLE IF EXISTS `inviteFriends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inviteFriends`
--

/*!40000 ALTER TABLE `inviteFriends` DISABLE KEYS */;
/*!40000 ALTER TABLE `inviteFriends` ENABLE KEYS */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `Post_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8_general_ci,
  `Title` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Content` text COLLATE utf8_general_ci NOT NULL,
  `Visibility` enum('Public','Private') COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (34,'1706012579230-neom-igw-14UnNjg-unsplash.jpg','I am Venom! Edited on 25/01 14:30','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Public','2024-01-23 12:22:59','2024-01-25 13:29:56',14),(36,'1706045909519-neom-igw-14UnNjg-unsplash.jpg','A Day in Singapore Edited on 26/01 11:25','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Public','2024-01-23 21:38:29','2024-01-26 10:23:38',5),(39,'1706265787179-neom-igw-14UnNjg-unsplash.jpg','This is a New Post 11:45 26/01','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Public','2024-01-26 10:43:07','2024-01-26 10:43:07',5),(40,'1706282439221-00-MVP-et-non-MVP.png','erqwer`','asdfasdfasdf','Public','2024-01-26 15:20:39','2024-01-26 15:20:39',14),(41,'1706557933766-neom-igw-14UnNjg-unsplash.jpg','Post by Pilgrim 22:13','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Public','2024-01-29 19:52:13','2024-01-29 21:13:30',18),(42,'1706606220312-neom-igw-14UnNjg-unsplash.jpg','Created Using React Bootstrap Styling','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Public','2024-01-30 09:17:00','2024-01-30 09:17:00',18);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

--
-- Table structure for table `post_comment_likes`
--

DROP TABLE IF EXISTS `post_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comment_likes`
--

/*!40000 ALTER TABLE `post_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_comment_likes` ENABLE KEYS */;

--
-- Table structure for table `post_comments`
--

DROP TABLE IF EXISTS `post_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `post_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Post_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Post_ID` (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comments`
--

/*!40000 ALTER TABLE `post_comments` DISABLE KEYS */;
INSERT INTO `post_comments` VALUES (2,39,5,'This is a trial comment','2024-01-26 13:09:27'),(3,39,5,'This is another comment on the same post','2024-01-26 13:12:15'),(4,39,5,'3rd comment to test emptying input field','2024-01-26 13:12:37'),(5,39,5,'Let\'s try 1 more coment','2024-01-26 13:15:06'),(6,39,14,'Comment by Venom','2024-01-26 14:48:37'),(7,40,14,'This is a comment','2024-01-26 15:21:02'),(8,34,5,'Let\'s see if this works','2024-01-29 10:50:24'),(9,34,5,'I want to see what happens now','2024-01-29 10:54:41'),(10,36,5,'This is a comment','2024-01-29 11:51:35'),(11,34,5,'Comment added 12:54','2024-01-29 11:54:09'),(12,34,5,'Comment added 12:56','2024-01-29 11:55:58'),(13,34,5,'Comment added 12:57','2024-01-29 11:56:11'),(14,40,5,'This is added at 12:57','2024-01-29 11:57:26'),(15,40,5,'Commented at 14:53','2024-01-29 13:53:26'),(16,39,5,'Does this work?','2024-01-29 15:42:31'),(17,41,18,'Comment by Pilgrim 21:24','2024-01-29 20:25:00'),(18,39,18,'One More comment on this post','2024-01-29 20:42:37'),(19,36,18,'Testing comments','2024-02-02 12:33:34'),(20,42,18,'This is a comment with Profile Image 13:46','2024-02-02 12:46:42'),(21,42,18,'This comment was added 07/02 9h39','2024-02-07 08:39:26'),(22,42,18,'Commentaire ajoute 07/02 16:34','2024-02-07 15:35:02');
/*!40000 ALTER TABLE `post_comments` ENABLE KEYS */;

--
-- Table structure for table `post_likes`
--

DROP TABLE IF EXISTS `post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `post_likes` (
  `Post_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Post_ID` (`Post_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`Post_ID`),
  CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
INSERT INTO `post_likes` VALUES (34,14,'2024-01-26 10:14:57'),(36,14,'2024-01-26 10:15:01'),(36,5,'2024-01-26 10:41:38'),(34,5,'2024-01-26 10:41:40'),(39,5,'2024-01-26 10:46:15'),(39,14,'2024-01-26 10:46:59'),(40,14,'2024-01-26 15:20:49'),(40,5,'2024-01-29 11:57:52'),(39,18,'2024-01-29 20:42:57'),(42,18,'2024-02-01 10:33:37'),(42,5,'2024-02-01 15:05:24'),(36,18,'2024-02-02 12:39:53'),(40,18,'2024-02-02 12:47:58');
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;

--
-- Table structure for table `reset_password_keys`
--

DROP TABLE IF EXISTS `reset_password_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `reset_password_keys` (
  `unique_key` varchar(80) NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL DEFAULT ((now() + interval 15 minute)),
  PRIMARY KEY (`unique_key`),
  KEY `Email` (`Email`),
  CONSTRAINT `reset_password_keys_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password_keys`
--

/*!40000 ALTER TABLE `reset_password_keys` DISABLE KEYS */;
INSERT INTO `reset_password_keys` VALUES ('339a8c2d91a28c76c0bba5d56efc525689f6e7aebb5fb46b5726dc3573f106a8','hell@me.me','2024-02-09 13:28:02','2024-02-09 13:43:02'),('e18a3cc47eece08fbec6252f5a35031f8ae789546ef43e454d5ada907a8c550e','hell@me.me','2024-02-12 10:12:39','2024-02-12 10:27:39'),('ec703ce269a3503104fed9b31d57afbc3186055d7d216d6ec0ce32f6d0bf60ae','hell@me.me','2024-02-12 09:00:00','2024-02-12 09:15:00');
/*!40000 ALTER TABLE `reset_password_keys` ENABLE KEYS */;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `survey` (
  `Survey_ID` int NOT NULL AUTO_INCREMENT,
  `Image` text COLLATE utf8_general_ci,
  `Title` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Content` text COLLATE utf8_general_ci NOT NULL,
  `Visibility` enum('Public','Private') COLLATE utf8_general_ci NOT NULL,
  `EndDate` date DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_ID` int DEFAULT NULL,
  `Option1` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Option2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Option3` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `Option4` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,NULL,'Trial','Trial content','Public',NULL,'2024-01-11 22:18:06','2024-01-24 12:18:36',5,'True','False',NULL,NULL),(10,'1706104199599-neom-igw-14UnNjg-unsplash.jpg','First Trial Survey','Let\'s see how this goes. The image should work now!','Public',NULL,'2024-01-24 13:49:59','2024-01-30 15:27:40',5,'Image is Working','Image isn\'t Working','I dont\' Care','Nobody cares'),(14,'1706803124245-neom-igw-14UnNjg-unsplash.jpg','Final Test of Survey','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','Public',NULL,'2024-02-01 15:58:44','2024-02-01 15:58:44',18,'1234','5678','9012','3456'),(15,'1707226786395-neom-igw-14UnNjg-unsplash.jpg','1234','1234','Public',NULL,'2024-02-06 13:39:46','2024-02-06 13:39:46',14,'1234','1234','1234','1234');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;

--
-- Table structure for table `survey_comment_likes`
--

DROP TABLE IF EXISTS `survey_comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_comment_likes`
--

/*!40000 ALTER TABLE `survey_comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_comment_likes` ENABLE KEYS */;

--
-- Table structure for table `survey_comments`
--

DROP TABLE IF EXISTS `survey_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `survey_comments` (
  `Comment_ID` int NOT NULL AUTO_INCREMENT,
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Comment` text COLLATE utf8_general_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_ID`),
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_comments_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_comments_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_comments`
--

/*!40000 ALTER TABLE `survey_comments` DISABLE KEYS */;
INSERT INTO `survey_comments` VALUES (5,1,1,'This is a trial comment 1 EDITED','2024-01-11 22:18:12'),(7,1,5,'I have edited this comment at 22:45','2024-01-15 14:23:52'),(10,10,18,'Hello World','2024-01-30 11:59:35'),(11,10,18,'Hello','2024-01-30 12:12:08'),(12,10,18,'Comment I Added at 12:16','2024-01-30 12:16:23'),(13,10,5,'Hello There','2024-01-30 15:32:30'),(14,10,18,'Trial comment at 11:43','2024-01-31 10:43:19'),(15,1,5,'Comment Added 15:09','2024-01-31 14:09:49'),(16,10,5,'Commented 13:55','2024-02-01 12:55:59'),(17,10,18,'Comment with Profile Image 16:20','2024-02-01 15:20:41'),(18,15,14,'This survey is stupid. All options are the same','2024-02-06 14:46:38');
/*!40000 ALTER TABLE `survey_comments` ENABLE KEYS */;

--
-- Table structure for table `survey_likes`
--

DROP TABLE IF EXISTS `survey_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `survey_likes` (
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Liked_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_likes_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_likes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_likes`
--

/*!40000 ALTER TABLE `survey_likes` DISABLE KEYS */;
INSERT INTO `survey_likes` VALUES (10,18,'2024-02-01 12:00:04'),(1,5,'2024-02-01 14:06:59'),(10,5,'2024-02-01 14:52:28');
/*!40000 ALTER TABLE `survey_likes` ENABLE KEYS */;

--
-- Table structure for table `survey_votes`
--

DROP TABLE IF EXISTS `survey_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `survey_votes` (
  `Survey_ID` int NOT NULL,
  `User_ID` int NOT NULL,
  `Voted_For` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Survey_ID` (`Survey_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `survey_votes_ibfk_1` FOREIGN KEY (`Survey_ID`) REFERENCES `survey` (`Survey_ID`),
  CONSTRAINT `survey_votes_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_votes`
--

/*!40000 ALTER TABLE `survey_votes` DISABLE KEYS */;
INSERT INTO `survey_votes` VALUES (10,5,'Option2','2024-02-01 15:03:04'),(10,5,'Option2','2024-02-01 15:03:05'),(10,5,'Option2','2024-02-01 15:03:06'),(10,5,'Option2','2024-02-01 15:03:06'),(10,5,'Option2','2024-02-01 15:03:06'),(10,5,'Option2','2024-02-01 15:03:06'),(10,18,'Option3','2024-02-01 16:19:35'),(1,18,'Option1','2024-02-01 16:19:52'),(14,18,'Option3','2024-02-07 16:43:29');
/*!40000 ALTER TABLE `survey_votes` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `LastName` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `FirstName` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Address` text COLLATE utf8_general_ci,
  `Email` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Phone` varchar(255) COLLATE utf8_general_ci DEFAULT NULL,
  `Biography` text COLLATE utf8_general_ci,
  `hashedPassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Role` enum('Admin','User') COLLATE utf8_general_ci NOT NULL,
  `Gender` enum('Male','Female','Other') COLLATE utf8_general_ci NOT NULL,
  `ProfileImage` text COLLATE utf8_general_ci,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Company_ID` int DEFAULT NULL,
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_user_company` (`Company_ID`),
  CONSTRAINT `fk_user_company` FOREIGN KEY (`Company_ID`) REFERENCES `company` (`Company_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nyukeit','Thakkar','Nyukeit',NULL,NULL,NULL,'hello@example.com',NULL,NULL,'asdlkjf20298034','Admin','Male',NULL,'2024-01-09 09:42:37','2024-02-13 14:37:39',NULL,1),(2,'dummyUser','Doe','John','1990-01-01',32,'123 Main St, City','john.doe@example.com','123-456-7890','A dummy user for testing purposes.','$2b$10$hMFD9VeSaUW5k4cwGHVUJOBj2ksnGGoHUa0EwbRoJc.NQaIf8BTLu','User','Male',NULL,'2024-01-12 18:05:34','2024-02-13 14:37:39',NULL,1),(5,'alice.smith','Smith','Alice','1990-12-15',33,'asdfkljlj','alice.smith@example.com','987-654-3210','asdfasdfasdf','$argon2id$v=19$m=65536,t=5,p=1$tMPWlzEQ8S5YO3Tl9UwDZw$/vnbubkrLpCE9KdBk/2i8WuWTM8hKksAygHVpqMG8vc','User','Female',NULL,'2024-01-14 15:15:42','2024-02-13 14:37:39',NULL,1),(6,'prndl','prndlast','prndlfirst','2001-01-12',NULL,NULL,'me@me.me','012398723789','Putain de merde','$argon2id$v=19$m=65536,t=5,p=1$h8PzSrSR6ReR4zYMxfIhyg$SzoJlRlwbe7khSB5mU4vfRhKMVCkvfOLghubLlW7WG8','User','Male',NULL,'2024-01-16 10:53:59','2024-02-13 14:37:39',NULL,1),(8,'testUser123','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','alice@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$nMdzjZWgwbAaUzBoW8cnLw$aSTVKLjZGrxi2Tnh2BiVMD4enUzKzVm+zzo813crFWc','User','Female',NULL,'2024-01-18 10:06:30','2024-02-13 14:37:39',NULL,1),(9,'testUser12343','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','smith@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$TOdhAT0QZj1QZ8CvvBZuCA$A9UAZvwTfVXDVwp7UJxmvww4WYTl08PV5/V31PDU6lw','User','Female',NULL,'2024-01-18 10:38:15','2024-02-13 14:37:39',NULL,1),(10,'testUser12','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','smithalice@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$GaO4ZwCoCp1JMcbv7HRTrg$2rtscQeWlQkd0wSrGSr4SI+1fuABPcy9C0wKYUhnNGg','User','Female',NULL,'2024-01-18 10:42:45','2024-02-13 14:37:39',NULL,1),(11,'testUser22','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','smithalice123@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$dmqGWnD3ABIPbttsNd3mZQ$pfmTX2obq0OaRQDxjmfr2oqO4wqA2j/TURg0GS+XML0','User','Female',NULL,'2024-01-18 10:51:11','2024-02-13 14:37:39',NULL,1),(12,'test22','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','smith123@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$57wp9NWqkUgZI+GBE4t/VQ$a7YRbg8MkCr/ePajcYuUSUqzQsx7lgrVwMVSb7cajtY','User','Female',NULL,'2024-01-18 10:55:40','2024-02-13 14:37:39',NULL,1),(13,'test222342','Smith','Alice','1985-03-15',NULL,'456 Oak St, Townville','smith123345@example.com','987-654-3210','An example user for testing purposes.','$argon2id$v=19$m=65536,t=5,p=1$fHzwB3vKW7LEg0Smi3okIw$WmQW7RlRBaCG62GwcnCT7Xd1c+0qawJblS7C2RnEeJY','User','Female',NULL,'2024-01-18 11:03:50','2024-02-13 14:37:39',NULL,1),(14,'venom','venom','venom','1994-12-06',29,'sdfasdfkjl','meme@me.me','098203948','asdfawsdf','$argon2id$v=19$m=65536,t=5,p=1$I8QgZbEXEJJ/Cj9cOEDmgQ$SWOyJkJXewc2i5y03H5YoAxn9PMSVoIBNQZVzjPhcNw','User','Male','1705582763808-Screenshot from 2024-01-18 11-11-54.png','2024-01-18 12:59:24','2024-02-13 14:37:39',NULL,1),(15,'rwer','werw','werwer','1990-12-05',33,'asdf','mememe@meme.me','123123123','asdfasdf','$argon2id$v=19$m=65536,t=5,p=1$163l/QURBD7cR7ggvIS9Nw$wkYVv2LDc5bEbLWAXVCUSJOWRXWDFUcUo4xuk1mIXgM','User','Male','1705791961355-123.png','2024-01-20 23:06:01','2024-02-13 14:37:39',NULL,1),(16,'1234','1234','1234','1990-12-09',33,'12345','meme@meme.meme','12341234134','1234','$argon2id$v=19$m=65536,t=5,p=1$BwCRPG9hT0ftxvt6xqMisA$XJ9Bp44yfr6vNFfhmDTIwu0OCUGpSHoWRAyeT/WvBwA','User','Male','1705918521947-123.png','2024-01-22 10:15:22','2024-02-13 14:37:39',NULL,1),(18,'pilgrim','Pilgrim','Pilgrim','1996-12-05',27,'hello','hell@me.me','2093847512','sdfgsdfg','$argon2id$v=19$m=65536,t=5,p=1$MEWI5eGyH1HzW1WMad7OzQ$3zT8hAk0etW0T+kgj/O2gMAHN8HNMWArGpVP7Mv0bJk','User','Male','1706557867591-IMG_2241.PNG','2024-01-29 19:51:07','2024-02-13 14:37:39',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Table structure for table `user_followers`
--

DROP TABLE IF EXISTS `user_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user_followers` (
  `Follower_ID` int NOT NULL,
  `Following_ID` int NOT NULL,
  `Followed_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Follower_ID`,`Following_ID`),
  KEY `Following_ID` (`Following_ID`),
  CONSTRAINT `user_followers_ibfk_1` FOREIGN KEY (`Follower_ID`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `user_followers_ibfk_2` FOREIGN KEY (`Following_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_followers`
--

/*!40000 ALTER TABLE `user_followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_followers` ENABLE KEYS */;

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

-- Dump completed on 2024-02-13 16:05:08
