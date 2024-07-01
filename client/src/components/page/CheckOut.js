import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../function/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload"; // Import FileUpload

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [images, setImages] = useState([]); // Add state for images

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token)
        .then((res) => {
          console.log("Fetched cart data:", res.data); // Logging เพิ่มเติม
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
  }, [user.token]);

  const handleSaveAddress = () => {
    const addressData = { name, phone, address, email };
    console.log("Saving address:", addressData); // Logging เพิ่มเติม
    saveAddress(user.token, addressData)
      .then((res) => {
        console.log("Address saved:", res.data); // Logging เพิ่มเติม
        if (res.data.ok) {
          toast.success("Address Saved");
          setAddressSaved(true);
        }
      })
      .catch((err) => {
        console.error("Error saving address:", err);
      });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token, images).then((res) => { // Pass images to saveOrder
      console.log(res.data);
      // clear DB
      emptyCart(user.token);
      // clear store
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // localstorage
      if (typeof window !== "undefined") localStorage.removeItem("cart");
      toast.success("Save Order Success");
      navigate('/user/history')
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h5>Address</h5>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button className="btn btn-primary m-2" onClick={handleSaveAddress}>
            Save Address
          </button>
        </div>
        <div className="col-md-6">
          <h5>Order Summary</h5>
          <hr />
          <p>Product {products.length}</p>
          <hr />
          <ul>
            {products.map((item, i) => (
              <li key={i}>
                {item.product.title} x {item.count} = ${item.price * item.count}
              </li>
            ))}
          </ul>
          <hr />
          Total: <b>${total}</b>
          <br />
          <FileUpload values={{ images }} setValues={({ images }) => setImages(images)} /> {/* Add FileUpload */}
          <button
            onClick={handleCreateOrder}
            disabled={!addressSaved || !products.length}
            className="btn btn-primary"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
