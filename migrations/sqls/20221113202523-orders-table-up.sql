CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  product_id bigint NOT NULL,
  quantity integer NOT NULL,
  user_id bigint NOT NULL,
  status order_status,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (product_id) REFERENCES products (id)

  
);