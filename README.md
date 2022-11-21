# Storefront Backend Project

## Setup Steps
To get started, clone this repo and open your terminal at the project root.

and then in your terminal run:
1. `npm install`
2. `cp .env.example .env`
3. `db-migrate up`
4. `npm run watch`

and then head to your browser at `localhost:3000` and it should be working.


## API Reference

#### create user

```http
  POST http://localhost:3000/users/
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname` | `string` | **Required**.
| `lastname`  | `string` | **Required**.
| `email`     | `string` | **Required**.
| `password`  | `string` | **Required**.

#### login user to gain token 

```http
  POST http://localhost:3000/users/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. |
| `password`| `string` | **Required**. |

#### Get User

```http
  GET http://localhost:3000/users/
```

| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 


#### Get One user

```http
  GET http://localhost:3000/users/:id
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | **Required**. |

#### Delete One user

```http
  DELETE http://localhost:3000/users/:id
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | **Required**. |

#### Get all products

```http
  GET http://localhost:3000/products
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

#### Get One product

```http
  GET http://localhost:3000/products/:id
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | **Required**. |

#### Create One product

```http
  POST http://localhost:3000/products
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Body     | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`      | `string` | **Required**. |
| `price`     | `number` | **Required**. |
| `category`  | `string` | **Required**. |

#### Delete One product

```http
  DELETE http://localhost:3000/products/:id
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | **Required**. |

#### Get all orders

```http
  GET http://localhost:3000/orders
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

#### create One order

```http
  POST http://localhost:3000/orders
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id`     | `number` | **Required**. |
| `status`      | `string` | **Required**. |

#### Add one product to an order

```http
  POST http://localhost:3000/orders/:id/products
```
| headers         | Type           | Description                       |
| :-------------- | :------------- | :-------------------------- |
| `Authorization` | `Bearer token` | 

| Params      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | **Required**. |


| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`  | `number` | **Required**. |
| `quantity`    | `number` | **Required**. |
