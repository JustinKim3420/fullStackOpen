const supertest = require("supertest");
const { app, connect, closeDatabase, clearDatabase } = require("../app");
const Blog = require("../models/blog");

// Allow us to make HTTP requests
const api = supertest(app);

// Test data
const blogs = [
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
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
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

beforeAll(async () => {
  await connect();
});

// Before each etst clear the database and add the test data
beforeEach(async () => {
  await clearDatabase();
  for (let blog of blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

afterAll(async () => {
  await closeDatabase();
});

describe("GET /api/blogs", () => {
  test("returns a JSON object", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  test("returns objects with a unique indentifier property", async () => {
    const blogs = await api.get("/api/blogs");
    for (const blog of blogs.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("POST to /api/blogs", () => {
  test("sends an object and increases the number of blogs by 1", async () => {
    await api.post("/api/users").send(user);
    const userInfo = await api
      .post("/api/login")
      .send({ username: user.name, password: user.password });
    const token = userInfo.body.token;

    await api
      .post("/api/blogs")
      .send(singleBlog)
      .set({ Authorization: `bearer ${token}` });
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toHaveLength(blogs.length + 1);
  });

  test("saves content correctly", async () => {
    await api.post("/api/users").send(user);
    const userInfo = await api
      .post("/api/login")
      .send({ username: user.name, password: user.password });
    const token = userInfo.body.token;

    const savedBlog = await api
      .post("/api/blogs")
      .send(singleBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    delete savedBlog.body.user;
    delete savedBlog.body.id;
    expect(savedBlog.body).toEqual(singleBlog);
  });

  test("sends an error when no token is given", async () => {
    const savedBlog = await api.post("/api/blogs").send(singleBlog).expect(401);
  });
});

describe("Missing info on blog post requests", () => {
  test("set likes to 0 by default", async () => {
    await api.post("/api/users").send(user);
    const userInfo = await api
      .post("/api/login")
      .send({ username: user.name, password: user.password });
    const token = userInfo.body.token;

    await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
    const blogs = await api.get("/api/blogs");
    expect(blogs.body[blogs.body.length - 1].likes).toBe(0);
  });

  test("sends 400 error when URL and title are missing", async () => {
    await api.post("/api/users").send(user);
    const userInfo = await api
      .post("/api/login")
      .send({ username: user.name, password: user.password });
    const token = userInfo.body.token;

    await api
      .post("/api/blogs")
      .send(blogWithoutTitleAndURL)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });
});
