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
  ScheduleOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import Search from "../card/Search";
import "./Navbar.css";

import logo from "./img/logo1.png";

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
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "40px",
            }}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
    <span className="menu-text">MENU</span>
  </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto d-flex w-50">
          <Nav.Link as={Link} to="/" className="flex-fill text-center">
            <HomeOutlined /> หน้าแรก
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" className="flex-fill text-center">
            <HomeOutlined /> ร้านค้า
          </Nav.Link>
          {/* <NavDropdown
            title={
              <span>
                <ShoppingOutlined /> ร้านค้า
              </span>
            }
            id="shop-dropdown"
            className="flex-fill text-center"
          >
            <NavDropdown.Item as={Link} to="/shop">
              สินค้า360HealthyShop
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/shop-service">
              สินค้าบริการ
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/shop/3">
              ร้านค้าสวัสดิการ
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/shop">
              ไปที่หน้าร้านค้า
            </NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link
            as={Link}
            to="/promotion-user"
            className="flex-fill text-center"
          >
            <GiftOutlined /> โปรโมชั่น
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/user/order-tracking"
            className="flex-fill text-center"
          >
            <ScheduleOutlined /> ติดตามคำสั่งซื้อ
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="flex-fill text-center">
            <ShoppingCartOutlined />
            <Badge pill bg="secondary" className="ms-1">
              {cart.length}
            </Badge>
            ตะกร้าสินค้า
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <span className="p-1">
            <Search />
          </span>
          {user ? (
            <NavDropdown
              title={user.username}
              id="basic-nav-dropdown"
              className="user-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to={user.role === "admin" ? "/admin/index" : "/user/index"}
              >
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                <LogoutOutlined /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="flex-fill text-center">
                <LoginOutlined /> Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className="flex-fill text-center"
              >
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
