CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price integer,
  category VARCHAR(255) 
);

