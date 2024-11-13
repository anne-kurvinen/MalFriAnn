CREATE TABLE memberShipCategories (
  id SERIAL PRIMARY KEY,
  price INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  personalId INTEGER UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  memberShip INTEGER REFERENCES memberShipCategories(id),
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  postcode BIGINT NOT NULL,
  city VARCHAR(100) NOT NULL,
  phoneNumber BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* SKAPAR ETT MEDLEMSSKAPSNUMMER */
CREATE TABLE memberShips (
  id serial PRIMARY KEY,
  memberShipCategories_id INTEGER,
  member_id INTEGER,
  FOREIGN KEY(memberShipCategories_id) FOREIGN KEY(member_id) REFERENCES memberShips(id) 
);

/* NOTES IN PÅ MEDMEMMENS SIDA */
CREATE TABLE notes (
  id serial PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  member_id INTEGER,
  FOREIGN KEY(member_id) REFERENCES members(id)
);


INSERT INTO memberShipCategories (price, title, description)
    VALUES (199, 'Basic', 'Basic membership with limited access');

INSERT INTO memberShipCategories (price, title, description) 
    VALUES (399, 'Premium', 'Premium membership with full access');   

INSERT INTO memberShipCategories (price, title, description)
    VALUES (699, 'VIP', 'VIP membership with full access and extra features');

SELECT * FROM memberShipCategories;



INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber)
    VALUES ('Anna', 'Andersson', 660606-4343, 'a.andersson@hotmail.com', 1234, 'Göteborgsgatan 1', 411 01, 'Göteborg', 070-1234567);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber)
    VALUES ('Bengt', 'Bengtsson', 550505-2525, 'bengts@hotmail.com', 4545, 'Malmögatan 2', 491 02, 'Malmö', 070-7654321);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber)
    VALUES ('Cecilia', 'Carlsson', 840404-1212, 'cillan@iths.se', 8907, 'Stockholmsgatan 3', 111 03, 'Stockholm', 070-9876543);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber)
    VALUES ('David', 'Dahl', 920303-3434, 'd.dahl@iths.se', 5678, 'Uppsalagatan 4', 211 04, 'Uppsala', 070-2345678);

INSERT INTO members (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber)
    VALUES ('Eva', 'Eriksson', 800202-5656, 'eriksson.eva@firma.com', 4321, 'Lundagatan 5', 311 05, 'Lund', 070-8765432);

SELECT * FROM members;


INSERT INTO notes (member_id, title, description)
    VALUES (1, 'Note 1', 'This is a note for member 1');

INSERT INTO notes (member_id, title, description)
    VALUES (2, 'Note 2', 'This is a note for member 2');

INSERT INTO notes (member_id, title, description)
    VALUES (3, 'Note 3', 'This is a note for member 3');

SELECT * FROM notes;

