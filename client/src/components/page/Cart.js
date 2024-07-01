import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

//function
import { userCart } from "../function/users";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSaveOrder = () => {
    // ตรวจสอบจำนวนสินค้า
    for (let item of cart) {
      if (item.count <= 0 || item.count > item.quantity) {
        toast.error(`สินค้า ${item.title} หมดหรือเกินจำนวนที่มีอยู่`);
        return;
      }
    }
    
    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td>Image</td>
          <td>Title</td>
          <td>Price</td>
          <td>Count</td>
          <td>Remove</td>
        </tr>
      </thead>
      {cart.map((item) => (
        <ProductTableInCart key={item._id} item={item} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h5>Cart {cart.length} product</h5>
          {!cart.length ? <p>No Product in Cart</p> : showCartItem()}
        </div>
        <div className="col-md-4">
          <h5>Summary</h5>
          <hr />
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} x {item.count} = {item.price * item.count}
            </p>
          ))}
          <hr />
          Total:<b> {getTotal()} </b>
          <hr />
          {user ? (
            <button
              className="btn btn-success"
              onClick={handleSaveOrder}
              disabled={!cart.length}
            >
              Check Out
            </button>
          ) : (
            <button className="btn btn-danger">
              <Link to="/login" state="cart">
                Login To CheckOut
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
