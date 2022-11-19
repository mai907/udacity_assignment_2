import app from '../../server'
import supertest from 'supertest';
import {User, UserStore} from "../../models/user"
import Client from '../../database';

const userStore = new UserStore();
describe("User Model", () => {

beforeEach(async () => {
  const conn = await Client.connect()
  const sql = 'TRUNCATE users CASCADE'
   await conn.query(sql)
  conn.release()

})

  it('returns 200 list all users', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).get('/users').set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 list one user given id', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).get(`/users/${user.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });

  it('returns 200 delete one user given id', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).delete(`/users/${user.id}`).set({ Authorization: `Bearer ${user?.token}` }).expect(200);
  });  

  it('returns 200 create user', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    await supertest(app).post(`/users`).send({firstname, lastname, email, password}).expect(200);
  });
// 
  it('returns 403 list all users (No Token)', async function () {
    await supertest(app).get('/users').expect(403);
  });

  it('returns 403 list one user given id (No Token)', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).get(`/users/${user.id}`).expect(403);
  });

  it('returns 403 delete one user given id (No Token)', async function () {
    const firstname = "test", lastname = "test", email = "test@test.com", password = "123456";
    const user = await userStore.create(firstname, lastname, email, password)
    await supertest(app).delete(`/users/${user.id}`).expect(403);
  }); 




});
