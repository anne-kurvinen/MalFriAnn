CREATE TABLE members (
  id serial PRIMARY KEY,
  firstName text UNIQUE NOT NULL,
  lastName text UNIQUE NOT NULL,
  personalId INTEGER UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  memberShip INTEGER NOT NULL,
  password text UNIQUE NOT NULL,
  address text NOT NULL,
  postcode INTEGER NOT NULL,
  city text NOT NULL,
  phoneNumber INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE memberShipCategories (
  id serial PRIMARY KEY,
  price INTEGER NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  FOREIGN KEY(memberShipCategoryId) REFERENCES members(id) 
);


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

