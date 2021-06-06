import React from "react";
import {Link} from 'react-router-dom'


const User = ({ user }) => {
  return (
  <tr>
      <td style={{ textAlign: 'left' }}><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td style={{ textAlign: 'left' }}>{user.blogs.length}</td>
  </tr>
)}

export default User