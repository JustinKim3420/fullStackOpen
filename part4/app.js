const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./utils/errorHandler");
const getToken = require("./utils/getToken");
const getUser = require("./utils/getUser");
const { MongoMemoryServer } = require("mongodb-memory-server");
const morgan = require("morgan");

const mongod = new MongoMemoryServer();

const connect = async () => {
  let mongoUrl = "";

  // Depending on node_env we will use a in memory DB or actual DB
  if (process.env.NODE_ENV === "test") {
    mongoUrl = await mongod.getUri();
  } else {
    mongoUrl = config.MONGODB_URI;
  }

  // Connect to Mongo
  logger.info("Connecting to MongoDB...");
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logger.info("Successfully concted to MongoDB", mongoUrl);
  } catch (error) {
    logger.info("Error in connecting to MongoDB", error.message);
  }
};

const closeDatabase = async () => {
  // Close database after use
  logger.info("closeDatabase");
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Delete all collections and data inside them
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

app.use(cors());
app.use(express.json());
app.use(getToken);
app.use(
  morgan((tokens, req, res) => {
    morgan.token("body", (req) => {
      return JSON.stringify(req.body);
    });

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use("/api/blogs", require("./routes/blogRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/login", require("./routes/loginRouter"));

app.use(errorHandler.unknownEndpoint);
app.use(errorHandler.errorHandler);

module.exports = {
  app,
  connect,
  closeDatabase,
  clearDatabase,
};
