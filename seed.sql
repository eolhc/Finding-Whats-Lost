CREATE DATABASE asset_tracking;

CREATE TABLE locations (
  id SERIAL4 PRIMARY KEY,
  tag_location_id INTEGER,
  movement_id INTEGER,
  description TEXT,
  level INTEGER,
  grid_x INTEGER,
  grid_x1 INTEGER,
  grid_y INTEGER,
  grid_y1 INTEGER,
  area_id INTEGER,
  location_purpose_id INTEGER,
  node_id INTEGER
);

CREATE TABLE nodes (
  id SERIAL4 PRIMARY KEY,
  tag_location_id INTEGER,
  movement_id INTEGER,
  maintenance_id INTEGER,
  MAC_Address TEXT,
  manufacturer_id INTEGER,
  battery_change_date VARCHAR(100),
  type_id INTEGER,
  deployed BOOLEAN,
  retired BOOLEAN,
  retirement_date VARCHAR(100),
  out_of_service BOOLEAN,
  out_of_service_date VARCHAR(100)
);

INSERT INTO locations (description, grid_x, grid_y, level) values ('office_1',35,11,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('office_2',31,12,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('office-3',27,12,1);
INSERT INTO locations (description, grid_x, grid_y, level) values ('reception',35,7,1);

INSERT INTO nodes (tag_location_id) values (1);
INSERT INTO nodes (tag_location_id) values (2);
INSERT INTO nodes (tag_location_id) values (3);
INSERT INTO nodes (tag_location_id) values (4);
