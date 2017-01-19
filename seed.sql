CREATE DATABASE lost_things;

CREATE TABLE locations (
  id SERIAL4 PRIMARY KEY,
  tag_location_id INTEGER,
  description TEXT,
  level INTEGER,
  grid_x INTEGER,
  grid_y INTEGER,
  item_id INTEGER
);

CREATE TABLE items (
  id SERIAL4 PRIMARY KEY,
  tag_location_id INTEGER,
  name VARCHAR(50)
);

INSERT INTO locations (description, grid_x, grid_y, level) values ('office_1',35,11,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('office_2',31,12,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('office-3',27,12,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('reception',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('toilet',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('kitchen',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('warehouse-kitchen',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('warehouse-office-3',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('warehouse-office-1',35,7,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('lab-1',35,7,2);
INSERT INTO locations (description, grid_x, grid_y, level) values ('lab-2',35,7,2);
INSERT INTO locations (description, grid_x, grid_y, level) values ('storeroom-1',35,7,2);
INSERT INTO locations (description, grid_x, grid_y, level) values ('storeroom-2',35,7,2);

INSERT INTO items (name, tag_location_id) values ('dog',1);
INSERT INTO items (name, tag_location_id) values ('umbrella',2);
INSERT INTO items (name, tag_location_id) values ('hat',3);
INSERT INTO items (name, tag_location_id) values ('happiness',4);
INSERT INTO items (name, tag_location_id) values ('dog',5);
INSERT INTO items (name, tag_location_id) values ('child',6);
INSERT INTO items (name, tag_location_id) values ('chicken',7);
INSERT INTO items (name, tag_location_id) values ('cupcake',8);
INSERT INTO items (name, tag_location_id) values ('treasure',9);
INSERT INTO items (name, tag_location_id) values ('wedding ring',10);
INSERT INTO items (name, tag_location_id) values ('fish soup',11);
INSERT INTO items (name, tag_location_id) values ('morals',12);
INSERT INTO items (name, tag_location_id) values ('love life',13);
