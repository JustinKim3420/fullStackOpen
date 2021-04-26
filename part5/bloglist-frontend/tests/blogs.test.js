const { response } = require("express");
const supertest = require("supertest");
const { app, connect, clearDatabase, closeDatabase } = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const sampleBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const singleBlog = {
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K. Rowling",
  url:
    "https://www.goodreads.com/book/show/15881.Harry_Potter_and_the_Chamber_of_Secrets",
  likes: 145521,
};

const blogWithoutLikes = {
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K. Rowling",
  url:
    "https://www.goodreads.com/book/show/15881.Harry_Potter_and_the_Chamber_of_Secrets",
};

const blogWithoutTitleAndURL = {
  author: "J.K. Rowling",
  likes: 145521,
};

const user = {
  name: "testUser",
  username: "testUser",
  password: "testUser",
};

const createUser = async (user) => {
  await api.post("/api/users").send(user);
};

const loginUser = async (user) => {
  return await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
};

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
  for (let blog of sampleBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

afterAll(async () => {
  await closeDatabase();
});

describe("GET /api/blogs", () => {
  test("returns all blogs in JSON format", async () => {
    const data = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(data.body).toMatchObject(sampleBlogs);
  });

  test("returns objects with a unique identifier property", async () => {
    const data = await api.get("/api/blogs");
    for (let blog of data.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("POST to /api/blogs", () => {
  test("successfully saves info correctly", async () => {
    await createUser(user);
    const loggedUser = await loginUser(user);
    await api
      .post("/api/blogs")
      .send(singleBlog)
      .set({ Authorization: `bearer ${loggedUser.body.token}` });
    const data = await api.get("/api/blogs");
    const newBlogs = sampleBlogs.concat(singleBlog);
    expect(data.body).toMatchObject(newBlogs);
  });

  test("sends an error 401 when no token is given", async () => {
    await api.post("/api/blogs").send(singleBlog).expect(401);
  });

  test.only("sends a 400 error when URL and title are missing", async () => {
    await createUser(user);
    const loggedUser = await loginUser(user);
    await api
      .post("/api/blogs")
      .send(blogWithoutTitleAndURL)
      .set({ Authorization: `bearer ${loggedUser.body.token}` })
      .expect(400)
  });
});
