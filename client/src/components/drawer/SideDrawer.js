import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './SideDrawer.css'; // อย่าลืม import ไฟล์ CSS ที่สร้างขึ้น

//antd
import { Button, Drawer } from "antd";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };
  return (
    <Drawer 
      className="bg-custom"
      onClose={onCloseDrawer}
      title={"Cart " + cart.length + "product "}
      placement="right"
      visible={drawer}
    >
      
      {cart.map((item) => (
        <div className="row">
          <div className="col">
            <img
              src={item.images[0].url}
              style={{ width: "100%", hright: "50px", objectFit: "cover" }}
            />
            <p className="text-center bg-secondary text-light">
              {item.title} x {item.count}
            </p>
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button onClick={onCloseDrawer} className="text-center btn btn-primary">
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
