-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2023-12-22 19:08:37
-- サーバのバージョン： 10.4.27-MariaDB
-- PHP のバージョン: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `image_upload_data`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `imagedata`
--

CREATE TABLE `imagedata` (
  `id` int(11) NOT NULL,
  `imageName` text NOT NULL,
  `MainColor` varchar(7) NOT NULL DEFAULT '未定',
  `AccentColor` varchar(7) NOT NULL DEFAULT '未定',
  `Font` text NOT NULL DEFAULT '未定'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `imagedata`
--

INSERT INTO `imagedata` (`id`, `imageName`, `MainColor`, `AccentColor`, `Font`) VALUES
(27, 'youngLeaf.png', '#23ab38', '#7fffd4', 'あずきフォント');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `imagedata`
--
ALTER TABLE `imagedata`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `imagedata`
--
ALTER TABLE `imagedata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
