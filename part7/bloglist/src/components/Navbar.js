import React from "react";
import { Link } from "react-router-dom";

import { Navbar as NavbarStyle, Button, Nav } from "react-bootstrap";

const Navbar = ({ handleLogout, user }) => {
  return (
    <NavbarStyle bg="primary" variant="light">
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to="/" className="nav-link">
            Anecdotes
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </Nav.Item>
      </Nav>
      <NavbarStyle.Collapse className="justify-content-end">
        <NavbarStyle.Text>
          <span className="userStatement">
            {user.name} is currently logged in
          </span>
          <Button onClick={handleLogout}>Logout</Button>
        </NavbarStyle.Text>
      </NavbarStyle.Collapse>
    </NavbarStyle>
  );
};

export default Navbar;
