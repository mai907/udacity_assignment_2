# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : => get(http://localhost:3000/products)
- Show : =>  get(http://localhost:3000/products/:id)
- Create [token required]: => post(http://localhost:3000/products)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] : => get(http://localhost:3000/users)
- Show [token required] : => get(http://localhost:3000/users/:id)
- Create N[token required] : => post(http://localhost:3000/users)

#### Orders
- Current Order by user (args: user id)[token required]:=> post(http://localhost:3000/orders)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
```
                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default                
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(255) |           | not null | 
 price    | integer                |           |          | 
 category | character varying(255) |           |          | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

#### User
- id
- firstName
- lastName
- password
```
                                     Table "public.users"
  Column   |          Type          | Collation | Nullable |              Default              
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(255) |           | not null | 
 lastname  | character varying(255) |           | not null | 
 email     | character varying(255) |           | not null | 
 password  | text                   |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
                               Table "public.orders"
 Column  |     Type     | Collation | Nullable |              Default               
---------+--------------+-----------+----------+------------------------------------
 id      | integer      |           | not null | nextval('orders_id_seq'::regclass)
 user_id | bigint       |           | not null | 
 status  | order_status |           |          | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

```
                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default                   
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          | 
 order_id   | bigint  |           | not null | 
 product_id | bigint  |           | not null | 
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
