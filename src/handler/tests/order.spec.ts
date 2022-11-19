import app from '../../server'
import supertest from 'supertest';
import { UserStore} from "../../models/user"
import { ProductStore} from "../../models/product"
import { OrderStore} from "../../models/order"
import Client from '../../database';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
describe("User Model", () => {

beforeEach(async () => {
  const conn = await Client.connect()
  const sql = 'TRUNCATE users CASCADE'
   await conn.query(sql)
  conn.release()

})

  it('returns 200 list all orders', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).get('/orders').set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 list one order given id', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    const order = await orderStore.create(product?.id, user?.id, quantity, status);

    await supertest(app).get(`/orders/${order.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 delete one order given id', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    const order = await orderStore.create(product?.id, user?.id, quantity, status);

    await supertest(app).delete(`/orders/${order.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });  

  it('returns 200 create order', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    
    await supertest(app).post(`/orders`).set({ Authorization: `Bearer ${user?.token}` }).send({product_id:product.id, user_id:user.id, quantity, status}).expect(200);
  });

  it('returns 403 list all orders (No Token)', async function () {
    await supertest(app).get('/orders').expect(403);
  });

  it('returns 403 list one order given id (No Token)', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    const order = await orderStore.create(product?.id, user?.id, quantity, status);

    await supertest(app).get(`/orders/${order.id}`).expect(403);
  });

  it('returns 403 delete one order given id (No Token)', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    const order = await orderStore.create(product?.id, user?.id, quantity, status);

    await supertest(app).delete(`/orders/${order.id}`).expect(403);
  }); 

  it('returns 403 create order (No Token)', async function () {
    const name = "product_1", price = 50, category = "clothes";
    const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
    const quantity=10, status="active"

    const product = await productStore.create(name, price, category);
    const user = await userStore.create(firstname, lastname, email, password);
    
    await supertest(app).post(`/orders`).send({product_id:product.id, user_id:user.id, quantity, status}).expect(403);
  });
});
