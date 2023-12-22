-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2023-12-22 19:08:25
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
-- テーブルの構造 `fonts`
--

CREATE TABLE `fonts` (
  `id` int(11) NOT NULL,
  `FontName` text NOT NULL,
  `Cool or Cute` tinyint(4) NOT NULL,
  `Digtal or HandsOn` tinyint(4) NOT NULL,
  `Thick or Thin` tinyint(4) NOT NULL,
  `UniqueValue` tinyint(4) NOT NULL,
  `TFArray` varchar(4) NOT NULL,
  `font_family` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `fonts`
--

INSERT INTO `fonts` (`id`, `FontName`, `Cool or Cute`, `Digtal or HandsOn`, `Thick or Thin`, `UniqueValue`, `TFArray`, `font_family`) VALUES
(1, 'あずきフォント', 0, 0, 0, 0, '0000', 'Azuki'),
(2, 'からかぜ', 0, 0, 0, 1, '0001', 'Karakaze'),
(3, 'たぬき油性マジック', 0, 0, 1, 0, '0010', 'Tanuki'),
(4, 'めもわーる', 0, 0, 1, 1, '0011', 'Memo'),
(5, 'JKゴシックL', 0, 1, 0, 0, '0100', 'jk_L'),
(6, 'PixelMPlus', 0, 1, 0, 1, '0101', 'PixelMPlus'),
(7, 'ラノベPOP', 0, 1, 1, 0, '0110', 'LightNovel'),
(8, 'うたミンフォント', 0, 1, 1, 1, '0111', 'Utamin'),
(9, 'マキナス', 1, 0, 0, 0, '1000', 'Makinus'),
(10, 'コウザン行書体', 1, 0, 0, 1, '1001', 'Kouzan'),
(11, 'しょかきうたげ', 1, 0, 1, 1, '1011', 'Shokaki'),
(12, '游明朝Light', 1, 1, 0, 0, '1100', 'YuMincho'),
(13, '刻明朝', 1, 1, 0, 1, '1101', 'Kokumin'),
(14, '装甲明朝', 1, 1, 1, 0, '1110', 'Soukou'),
(15, '源界明朝', 1, 1, 1, 1, '1111', 'Genkai');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `fonts`
--
ALTER TABLE `fonts`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `fonts`
--
ALTER TABLE `fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
