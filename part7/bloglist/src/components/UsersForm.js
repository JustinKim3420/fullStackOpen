import React from "react";
import { useSelector } from "react-redux";
import User from "./User";

import {Table} from 'react-bootstrap'

const UsersForm = () => {
  const users = useSelector((state) => state.users);
  return (
    <div className='container'>
      <h1>Users</h1>
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>User</th>
                <th style={{ textAlign: "left" }}>Number of Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return <User key={user.id} user={user} />;
              })}
            </tbody>
          </Table>
    </div>
  );
};

export default UsersForm;
