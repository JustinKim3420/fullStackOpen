
import blogsService from "../services/blogsService";
import usersService from "../services/usersService";
import { updateUsers } from "./usersReducer";

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS": {
      const sortedBlogs = action.data.sort((a, b) => {
        return b.likes - a.likes;
      });
      return sortedBlogs;
    }
    case "CREATE_BLOG": {
      return [...state, action.data];
    }
    case "CREATE_COMMENT": {
      const updatedBlogs = state.map(blog=>{
        return blog.id === action.data.id
        ? {...blog, comments:action.data.comments}
        :blog
      })
      console.log(updatedBlogs)
      return updatedBlogs;
    }
    case "UPDATE_BLOGS": {
      return [...action.data];
    }
    case "INCREASE_LIKES": {
      const updatedLikes = state.map((blog) => {
        return blog.id === action.data.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog;
      });
      const sortedBlogs = updatedLikes.sort((a, b) => {
        return b.likes - a.likes;
      });
      return sortedBlogs;
    }
    case "DELETE_BLOG": {
      const updatedBlogs = state.filter((x) => {
        return x.id !== action.data;
      });
      return updatedBlogs;
    }
    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => {
  return {
    type: "INITIALIZE_BLOGS",
    data: blogs,
  };
};
export const createBlog = (newBlog) => {
  return (dispatch) => {
    blogsService
      .createBlog(newBlog)
      .then(() =>
        //Need to get all since we need to populate the user data
        blogsService.getAll().then((data) => {
          dispatch({
            type: "UPDATE_BLOGS",
            data: data,
          });
        })
      )
      .then(() =>
        usersService.getUsers().then((data) => {
          dispatch(updateUsers(data));
        })
      );
  };
};

export const addComment = (blog, comment) => {
  const updatedComments = [
    ...blog.comments,
    {
      key: Math.floor(Math.random() * 100000) + 1,
      comment: comment,
    },
  ];
  const updatedBlog = { ...blog, comments: updatedComments, user:blog.user.id };
  console.log(updatedBlog)
  return (dispatch) => {
    blogsService.updateBlog(updatedBlog, blog.id).then((data) => {
      console.log(data)
      dispatch({
        type: "CREATE_COMMENT",
        data: {...data},
      });
    });
  };
};

export const increaseLikes = (likedBlog, id) => {
  return (dispatch) => {
    blogsService.updateBlog(likedBlog, id).then((data) => {
      dispatch({
        type: "INCREASE_LIKES",
        data: { ...data },
      });
    });
  };
};

export const deleteBlog = (id) => {
  return (dispatch) => {
    blogsService
      .deleteBlog(id)
      .then(() => {
        dispatch({
          type: "DELETE_BLOG",
          data: id,
        });
      })
      .then(() => {
        usersService.getUsers().then((data) => {
          dispatch(updateUsers(data));
        });
      });
  };
};

export default blogReducer;
