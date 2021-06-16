const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();

const MONGODB_URI = process.env.DB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB", error.message);
  });

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    _id: ID!
  }

  type Author {
    name: String!
    _id: ID!
    born: Int
    bookCount: Int!
  }
`;

const bookCount = async (root) => {
  let authorBookCount = await Book.countDocuments({
    "author.name": root.name,
  });
  return authorBookCount;
};

const allBooks = (args) => {};

const addBook = async (args, context) => {
  let author = await Author.findOne({ name: args.author });

  if (!author) {
    const newAuthor = new Author({
      name: args.author,
    });
    author = await newAuthor.save();
  }


  const newBook = new Book({
    title: args.title,
    published: args.published,
    author: {
      name: author.name,
      _id: author._id,
    },
    genres: args.genres,
  });

  try {
    const addedBook = await newBook.save();
    return addedBook.populate('author');
  } catch (error){
      console.log(error)
  }
};

const editAuthor = async (args) => {
  const author = await Author.findOne({
    name: args.name,
  });
  author.published = args.published;
  return author.save();
};

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => allBooks(args),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (root) => bookCount(root),
  },
  Mutation: {
    addBook: (root, args, context) => addBook(args),
    editAuthor: (root, args) => editAuthor(args),
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
