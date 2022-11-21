import app from '../../server'
import supertest from 'supertest';
import { UserStore} from "../../models/user"
import { ProductStore} from "../../models/product"
import Client from '../../database';

const userStore = new UserStore();
const productStore = new ProductStore();
describe("Product Model", () => {

beforeEach(async () => {
  const conn = await Client.connect()
  const sql = 'TRUNCATE users CASCADE'
   await conn.query(sql)
  conn.release()

})

  it('returns 200 list all products', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).get('/products').set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 list one product given id', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const name = "test", price = 50, category = "clothes";

    const user = await userStore.create(firstname, lastname, email, password)
    const product = await productStore.create(name, price, category)

    await supertest(app).get(`/products/${product.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 delete one product given id', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const name = "test", price = 50, category = "clothes";

    const user = await userStore.create(firstname, lastname, email, password)
    const product = await productStore.create(name, price, category)

    await supertest(app).delete(`/products/${product.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });  

  it('returns 200 create product', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const name = "test", price = 50, category = "clothes";

    const user = await userStore.create(firstname, lastname, email, password)
    
    await supertest(app).post(`/products`).set({ Authorization: `Bearer ${user?.token}` }).send({name, price, category}).expect(200);
  });

  it('returns 200 list all products (No Token)', async function () {
    await supertest(app).get('/products').expect(403);
  });

  it('returns 403 list one product given id (No Token)', async function () {
    const name = "test", price = 50, category = "clothes";

    const product = await productStore.create(name, price, category)

    await supertest(app).get(`/products/${product.id}`).expect(403);
  });

  it('returns 403 delete one product given id (No Token)', async function () {
    const name = "test", price = 50, category = "clothes";

    const product = await productStore.create(name, price, category)
    await supertest(app).delete(`/products/${product.id}`).expect(403);
  }); 

  it('returns 403 create product (No Token)', async function () {
    const name = "test", price = 50, category = "clothes";

    await supertest(app).post(`/products`).send({name, price, category}).expect(403);
  });


});
