CREATE TABLE IF NOT EXISTS rock (
	id int unsigned NOT NULL auto_increment,
	artist varchar(50) NOT NULL,
	title varchar(50) NOT NULL,
	genre varchar(20) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO rock(artist, title, genre) VALUES
('ACDC', 'Thunderstruck', 'Rock'),
('Jet', 'Are you Gonna be my Girl', 'Rock'),
('Blur', 'Country House', 'Rock'),
('Thin Lizzy', 'Dancing in the Moonlight', 'Rock'),
('Franz Ferdinand', 'Take Me Out', 'Rock'),
('George Ezra', 'Blame it on Me', 'Rock'),
('Train', 'Hey Soul Sister', 'Rock'),
('Mumford & Sons', 'I will Wait', 'Rock'),
('The Killers', 'Mr Brightside', 'Rock'),
('Vance Joy', 'Riptide', 'Rock'),
('Two Door Cinema Club', 'Something Good', 'Rock'),
('The Cure', 'The Lovecats', 'Rock');



