import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";


//Page
import Register from "./components/page/auth/Register";
import Login from "./components/page/auth/Login";
import Home from "./components/page/Home";
import Product from "./components/page/Product";
import Shop from "./components/page/Shop";
import Cart from "./components/page/Cart";

//Layout
import Navbar from "./components/layouts/Navbar";
import Header from "./components/layouts/็Header";

//page admin
import HomeAdmin from "./components/page/admin/Home";
import ManageAdmin from "./components/page/admin/ManageAdmin";
import CreateCaterogy from "./components/page/admin/category/CreateCaterogy";
import UpdateCategory from "./components/page/admin/category/UpdateCategory";
import CreateProduct from "./components/page/admin/product/CreateProduct";
import UpdateProduct from "./components/page/admin/product/UpdateProduct";

import Orders from "./components/page/admin/Order";

//page user
import HomeUser from "./components/page/user/Home";
import CheckOut from "./components/page/CheckOut";
import WishList from "./components/page/user/WishList";
import History from "./components/page/user/History";

//function
import { currentUser } from "./components/function/auth";
//redux
import { useDispatch } from "react-redux";
// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

//Drawer
import SideDrawer from "./components/drawer/SideDrawer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/layouts/Footer";

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err);
      });
  }

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <SideDrawer />
      {/* <h1>360HealthyShop || </h1> */}
      {/* <Register /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCaterogy />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product/"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          }
        />

        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;
