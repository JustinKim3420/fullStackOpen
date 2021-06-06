import React from "react";

const SingleUser = ({ user }) => {
  if (!user) {
    return null;
  } else {
    return (
      <div>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </div>
    );
  }
};

export default SingleUser;
