import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Search from "../card/Search";
import "./Navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <HomeOutlined /> Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/shop">
            <ShoppingOutlined /> Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <ShoppingCartOutlined /> 
            <Badge pill bg="secondary" className="ms-1">
              {cart.length}
            </Badge> 
            Cart
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <span className="p-1">
            <Search />
          </span>
          {user ? (
            <NavDropdown title={user.username} id="basic-nav-dropdown" className="user-dropdown">
              <NavDropdown.Item as={Link} to={user.role === "admin" ? "/admin/index" : "/user/index"}>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                <LogoutOutlined /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                <LoginOutlined /> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                <UserAddOutlined /> Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
