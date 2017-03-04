CREATE TABLE IF NOT EXISTS `shout_outs` (
  `id` int unsigned NOT NULL auto_increment,
  `name` varchar(30) NOT NULL,
  `message` varchar(200) NOT NULL,
  `inserted` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;