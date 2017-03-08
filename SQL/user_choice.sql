CREATE TABLE IF NOT EXISTS `user_choice` (
  `id` int unsigned NOT NULL auto_increment,
  `artist` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `inserted` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;