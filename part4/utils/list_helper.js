// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

// Returns the total likes from all the blogs
const totalLikes = (blogs) => {
  let totalLikes = blogs.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);
  return totalLikes;
};

// Returns the blog with the most likes
const favoriteBlog = (blogs) => {
  // Create an array of the likes of each blog object
  const blogLikes = blogs.map((blog) => blog.likes);
  // Finds the index of the most likes
  let indexOfMax = blogLikes.indexOf(Math.max(...blogLikes));

  return blogs[indexOfMax];
};

// Returns author with most blogs in format {author, blog}
const mostBlogs = (blogs) => {
  let authorWithMostBlogs;
  let mostBlogs = 0;
  // Creates an object with the authors as keys
  // The values is in format {author, blog}
  const authors = blogs.reduce((acc, current) => {
    if (acc.hasOwnProperty(current.author)) {
      acc[current.author].blogs += 1;
    } else {
      acc[current.author] = {
        author: current.author,
        blogs: 1,
      };
    }
    return acc;
  }, {});

  // Looks through the authors and finds the author with most blogs
  for (author in authors) {
    if (authors[author]["blogs"] > mostBlogs) {
      mostBlogs = authors[author]["blogs"];
      authorWithMostBlogs = authors[author];
    }
  }
  return authorWithMostBlogs;
};

// Returns author with most likes in format {author, likes}
const mostLikes = (blogs) => {
  let authorWithMostLikes;
  let mostLikes = 0;

  // Creates an object with the authors as keys
  // The values is in format {author, blog}
  const authors = blogs.reduce((acc, current) => {
    if (acc.hasOwnProperty(current.author)) {
      if (acc[current.author]["likes"] < current.likes) {
        acc[current.author]["likes"] = current.likes;
      }
    } else {
      acc[current.author] = {
        author: current.author,
        likes: current.likes,
      };
    }
    return acc;
  }, {});

  // Looks through the authors and finds the author with most likes
  for (author in authors) {
    if (authors[author]["likes"] > mostLikes) {
      mostLikes = authors[author]["likes"];
      authorWithMostLikes = authors[author];
    }
  }
  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
