const { ApolloServer, gql, UserInputError , PubSub } = require("apollo-server");
const pubsub = new PubSub()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      name: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Subscription{
    bookAdded:Book!
    authorAdded:Author!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    author: root._id,
  });
  return authorBookCount;
};

const allBooks = async (args) => {
  if (args.author) {
    const author = await Author.findOne({ name: args.author });
    if (!author) {
      return [];
    }
    const booksByAuthor = await Book.find({ author: author._id });
    if (args.genre) {
      const booksByBoth = booksByAuthor.filter((book) => {
        return book.genres.includes(args.genre);
      });
      return booksByBoth ? booksByBoth : [];
    }
    return booksByAuthor;
  }

  if (args.genre) {
    const booksByGenre = await Book.find({ genres: { $in: args.genre } }).populate('author');
    console.log(booksByGenre)
    return booksByGenre;
  }

  return Book.find({}).populate("author");
};

const addBook = async (args, context) => {
  if (!context.currentUser) {
    throw new UserInputError("Invalid token");
  }
  if (args.title.length < 2) {
    throw new UserInputError("The title should be at least two characters", {
      invalidArgs: args.title,
    });
  } else {
    const existingBook = await Book.findOne({ title: args.title });
    if (existingBook) {
      throw new UserInputError("The title of the book should be unique", {
        invalidArgs: args.title,
      });
    }
  }
  let author = await Author.findOne({ name: args.author });

  if (!author) {
    const newAuthor = new Author({
      name: args.author,
    });
    if (args.author.length < 4) {
      throw new UserInputError(
        "The author's name should be longer than 4 characters",
        {
          invalidArgs: args.author,
        }
      );
    }
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
    await Book.populate(addedBook, "author");
    return addedBook;
  } catch (error) {
    console.log(error);
  }
};

const editAuthor = async (args, context) => {
  if (!context.currentUser) {
    throw new UserInputError("Invalid token");
  }
  const author = await Author.findOne({
    name: args.name,
  });
  author.born = args.setBornTo;
  return author.save();
};

const authenticateUser = async (request) => {
  const auth = request ? request.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
};

const login = async (args) => {
  const user = await User.findOne({ username: args.username });
  if (user) {
    const passwordMatches = await bcrypt.compare(
      args.password,
      user.passwordHash
    );
    if (passwordMatches) {
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      return {
        value: token,
      };
    }
  }
};

const createUser = async (args) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(args.password, saltRounds);
  const newUser = new User({
    username: args.username,
    name: args.name,
    passwordHash,
    favoriteGenre: args.favoriteGenre,
  });
  return newUser.save();
};

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => allBooks(args),
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) => bookCount(root),
  },
  Mutation: {
    addBook: (root, args, context) => addBook(args, context),
    editAuthor: (root, args, context) => editAuthor(args, context),
    login: (root, args) => login(args),
    createUser: (root, args) => createUser(args),
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return (await authenticateUser(req))
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
