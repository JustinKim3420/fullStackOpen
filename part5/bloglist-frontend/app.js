const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

const connect = async () => {
  let mongoUrl = "";

  if (process.env.NODE_ENV === "test") {
    mongoUrl = await mongod.getUri();
  } else {
    mongoUrl = process.env.MONGODB_URI;
  }
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Successfully concted to MongoDB", mongoUrl)
  } catch (error) {
      console.log("Error in connecting to MongoDB", error.message)
  }
};

const closeDatabase = async ()=>{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close();
    await mongod.stop()
}

const clearDatabase = async ()=>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany({})
    }
}

app.use(cors());
app.use(express.json())

module.exports({
    app,
    connect,
    clearDatabase,
    closeDatabase
})