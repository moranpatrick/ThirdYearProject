CREATE TABLE IF NOT EXISTS charts (
	id int unsigned NOT NULL auto_increment,
	artist varchar(50) NOT NULL,
	title varchar(50) NOT NULL,
	genre varchar(20) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO charts(artist, title, genre) VALUES
('Ariana Grande', 'Side To Side', 'charts'),
('Clean Bandit', 'Rockabye', 'charts'),
('Ed Sheeran', 'Castle on the Hill', 'charts'),
('Ed Sheeran', 'Galway Girl', 'charts'),
('Fifth Harmony', 'Worth It', 'charts'),
('Fluer East', 'Sax', 'charts'),
('Jason Derulo', 'Want to Move', 'charts'),
('Justin Timberlake', 'Cant stop the feeling', 'charts'),
('Kungs', 'Cooking on 3 Burners', 'charts'),
('Maroon 5', 'Dont wanna Know', 'charts'),
('Neiked', 'Sexual', 'charts'),
('Rag n Bone Man', 'Human', 'charts'),
('Zara Larsson', 'Lush Life', 'charts');