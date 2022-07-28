DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id SERIAL,
    name VARCHAR(15),
    kind TEXT,
    age INTEGER
);

-- seed

INSERT INTO pets (name, kind, age) VALUES ('Chris', 'Walnut', 25);
INSERT INTO pets (name, kind, age) VALUES ('Bethany', 'penguin', 11);
INSERT INTO pets (name, kind, age) VALUES ('Cornflake', 'parakeet', 3);
INSERT INTO pets (name, kind, age) VALUES ('Zamir', 'otter', 14);
INSERT INTO pets (name, kind, age) VALUES ('Fido', 'rainbow', 7);
INSERT INTO pets (name, kind, age) VALUES ('Buttons', 'snake', 5);