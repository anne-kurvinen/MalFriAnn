CREATE TABLE memberShipCategories (
  id SERIAL PRIMARY KEY,
  price INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO memberShipCategories (price, title, description)
    VALUES (199, 'Basic', 'Basic membership with limited access');

INSERT INTO memberShipCategories (price, title, description) 
    VALUES (399, 'Premium', 'Premium membership with full access');   

INSERT INTO memberShipCategories (price, title, description)
    VALUES (699, 'VIP', 'VIP membership with full access and extra features');

SELECT * FROM memberShipCategories;


/* MEDLEMSREGISTRET MED MEDLEMSSKAPS-KATEGORIN */
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  personalId VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  postcode VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(50) NOT NULL,
  memberShipCategories_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES ('Anna', 'Andersson', '660606-4343', 'a.andersson@hotmail.com', 1234, 'Göteborgsgatan 1', 41101, 'Göteborg', '0701234567', 1);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES ('Bengt', 'Bengtsson', '550505-2525', 'bengts@hotmail.com', 4545, 'Malmögatan 2', 49102, 'Malmö', '0707654321', 2);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES ('Cecilia', 'Carlsson', '840404-1212', 'cillan@iths.se', 8907, 'Stockholmsgatan 3', 11103, 'Stockholm', '0709876543', 3);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES ('David', 'Dahl', '920303-3434', 'd.dahl@iths.se', 5678, 'Uppsalagatan 4', 21104, 'Uppsala', '0702345678', 3);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES ('Eva', 'Eriksson', '800202-5656', 'eriksson.eva@firma.com', 4321, 'Lundagatan 5', 31105, 'Lund', '0708765432', 2);

SELECT * FROM members;

DROP TABLE members;


/* NOTES IN PÅ MEDLEMMENS SIDA */
CREATE TABLE notes (
  id serial PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  member_id INTEGER,
  FOREIGN KEY(member_id) REFERENCES members(id)
);

INSERT INTO notes (member_id, title, description)
    VALUES (1, 'Note 1', 'This is a note for member 1');

INSERT INTO notes (member_id, title, description)
    VALUES (2, 'Note 2', 'This is a note for member 2');

INSERT INTO notes (member_id, title, description)
    VALUES (3, 'Note 3', 'This is a note for member 3');

SELECT * FROM notes;



INSERT INTO memberShipCategories (price, title, description) VALUES
  (199, 'Basic', 'Basic membership with limited access'),
  (399, 'Premium', 'Premium membership with full access'),
  (699, 'VIP', 'VIP membership with full access and extra features');
  
SELECT * FROM memberShipCategories;


/* SKAPAR ETT MEDLEMSSKAPSNUMMER */
CREATE TABLE memberShips (
  id serial PRIMARY KEY,
  memberShipCategories_id INTEGER,
  title VARCHAR(100) NOT NULL,
  member_id INTEGER
);

INSERT INTO memberShips (memberShipCategories_id, title, member_id) VALUES 
  ('1', 'Basic', '1'),
  ('2', 'Premium', '2'),
  ('3', 'VIP', '3'),
  ('3', 'VIP', '4'),
  ('2', 'Premium', '5');
  

SELECT * FROM memberShips;



/* SKAPAR TOKENS */
CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);