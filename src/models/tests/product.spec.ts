import { Product ,ProductStore} from "../product";
import Client from '../../database';
const store = new ProductStore();

describe("Product Model", ()=>{
  beforeAll(async () => {
    const conn = await Client.connect()
    const sql = 'TRUNCATE users CASCADE'
     await conn.query(sql)
    conn.release()
  
  }) 
    it("should have n index method", ()=>{
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index(); 
        expect(result).toBeDefined();
    });

    it("Create Product", async () => {
        const name = "test", price = 50, category = "clothes";

        const result = await store.create(name, price, category);
        expect(result?.name).toEqual(name);
      });

      it("Delete Product", async () => {
        const name = "deleteProduct", price = 50, category = "clothes";

        const product = await store.create(name, price, category);
        const result = await store.delete(product?.id as unknown as string);
        expect(result?.id).toEqual(product.id);
      });

})