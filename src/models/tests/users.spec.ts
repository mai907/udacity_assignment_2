import { User, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
  it("should have n index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toBeDefined();
  });

  it("Create user", async () => {
    const firstname = "test", lastname = "test", email = "test@t.com", password = "123456";

    const result = await store.create(firstname, lastname, email, password);
    expect(result?.firstname).toEqual(firstname);
  });

});
