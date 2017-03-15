CREATE TABLE IF NOT EXISTS _70_80_90 (
	id int unsigned NOT NULL auto_increment,
	artist varchar(50) NOT NULL,
	title varchar(50) NOT NULL,
	genre varchar(20) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO _70_80_90(artist, title, genre) VALUES
('ABBA', 'Dancing Queen', '_70_80_90'),
('Queen', 'Dont stop me now', '_70_80_90'),
('All Star', 'Smash Mouth', '_70_80_90'),
('Backstreet Boys', 'Everybody', '_70_80_90'),
('Dire Straits', 'Walk of Life', '_70_80_90'),
('Eagle Eye Cherry', 'Save Tonight', '_70_80_90'),
('Toto', 'Africa', '_70_80_90'),
('Europe', 'The Final Countdown', '_70_80_90'),
('Lipps Inc', 'Funckytown', '_70_80_90'),
('Jackson 5', 'I want you Back', '_70_80_90'),
('KC & The Sunshine Band', 'Give Up', '_70_80_90'),
('Lou Bega', 'Mambo No.5', '_70_80_90'),
('Madonna', 'Like a Virgin', '_70_80_90');
