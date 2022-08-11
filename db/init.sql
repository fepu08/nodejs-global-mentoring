CREATE TABLE Users (
	id SERIAL PRIMARY KEY,
	login VARCHAR(30) UNIQUE,
	password VARCHAR(30),
	age INTEGER
);

INSERT INTO Users (login, password, age) VALUES 
('JohnDoe12', 'pasw123', 20), 
('JaneDoe', 'pasw321', 19), 
('JohnSmith112', '123pasw', 63), 
('JaneSmith221', '321pasw', 25);