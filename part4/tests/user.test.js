const supertest = require("supertest");
const { app, connect, closeDatabase, clearDatabase } = require("../app");
const User = require("../models/user");

const api = supertest(app);

const multipleUsers = [
  {
    name: "Arto Hellas",
    username: "hellas",
    passwordHash: "hellas123",
    blogs:[]
  },
  {
    name: "Justin Kim",
    username: "justinkim420",
    passwordHash: "justinkim123",
    blogs:[]
  },
  {
    name: "Arto Hellas",
    username: "hasdf",
    passwordHash: "hasdf123",
    blogs:[]
  }
];

const singleUser = {
  name: "Justin Kim",
  password: "justinkim123",
  username: "justinkim",
  blogs:[]
};

const invalidUser = {
  name: "tesla",
  password: "te",
  username: "tes",
  blogs:[]
};

beforeAll(async () => {
  await connect();
});

// Before each etst clear the database and add the test data
beforeEach(async () => {
  await clearDatabase();
  for (let user of multipleUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

afterAll(async () => {
  await closeDatabase();
});

describe("POST request to /api/users", () => {
  test("does not add invalid users and returns an error", async () => {

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

      const currentUsers = await api.get('/api/users')
      
    expect(currentUsers.body).toHaveLength(multipleUsers.length);
  });
});
