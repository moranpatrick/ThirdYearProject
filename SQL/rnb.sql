CREATE TABLE IF NOT EXISTS RnB (
	id int unsigned NOT NULL auto_increment,
	artist varchar(50) NOT NULL,
	title varchar(50) NOT NULL,
	genre varchar(20) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO RnB(artist, title, genre) VALUES
('50 Cent', 'In Da Club', 'RnB'),
('Beyonce', 'Crazy In Love', 'RnB'),
('Sia', 'Cheap Thrills', 'RnB'),
('Christina Aguilera ', 'Dirty', 'RnB'),
('Drake', 'One Dance', 'RnB'),
('Flo Rida', 'Low', 'RnB'),
('Kanye West', 'Golddigger', 'RnB'),
('Nelly', 'Ride with Me', 'RnB'),
('R Kelly', 'Ignition', 'RnB'),
('Macklemore', 'Downtown', 'RnB'),
('Macklemore', 'Trift Shop', 'RnB'),
('Blackstreet', 'No Diggity', 'RnB'),
('Usher', 'Yeah!', 'RnB');