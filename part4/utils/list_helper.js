// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalLikes = blogs.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  // Create an array of the likes of each blog object
  const blogLikes = blogs.map((blog) => blog.likes);
  // Finds the index of the most likes
  let indexOfMax = blogLikes.indexOf(Math.max(...blogLikes));

  return blogs[indexOfMax];
};

const mostBlogs = (blogs) => {
  let authorWithMostBlogs;
  let mostBlogs = 0;

  const authors = blogs.reduce((acc, current) => {
    if (acc.hasOwnProperty(current.author)) {
      console.log(acc);
      acc[current.author].blogs += 1;
    } else {
      acc[current.author] = {
        author: current.author,
        blogs: 1,
      };
    }
    return acc;
  }, {});

  for (author in authors) {
    if (authors[author]["blogs"] > mostBlogs) {
      mostBlogs = authors[author]["blogs"];
      authorWithMostBlogs = authors[author];
    }
  }
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  let authorWithMostLikes;
  let mostLikes = 0;

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
  mostLikes,
};
