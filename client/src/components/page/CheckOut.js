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
import { Spin, Modal } from "antd";
import FileUpload from "./FileUpload";
import Footer from "../layouts/Footer";

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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  
  // เพิ่ม state เพื่อเก็บ name_th
  const [selected, setSelected] = useState({
    province: '',
    amphure: '',
    tambon: '',
    zip_code: ''
  });

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token)
        .then((res) => {
          setProducts(
            res.data.products.map((item) => {
              const productData = item.product || item.productservice;
              return {
                ...item,
                title: productData ? productData.title : 'Unknown',
                price: item.discountedPrice || (productData ? productData.price : 0),
              };
            })
          );
          setTotal(res.data.cartTotal);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setProvinces(result);
      });
  }, [user.token]);

  // ปรับ DropdownList เพื่อเก็บ name_th แทน id และเพิ่ม zip_code
  const DropdownList = ({
    label,
    id,
    list,
    child,
    childsId = [],
    setChilds = [],
  }) => {
    const onChangeHandle = (event) => {
      setChilds.forEach((setChild) => setChild([]));
      const entries = childsId.map((child) => [child, '']);
      const unSelectChilds = Object.fromEntries(entries);

      const input = event.target.value;
      const selectedItem = list.find((item) => item.name_th === input);
      setSelected((prev) => ({
        ...prev,
        ...unSelectChilds,
        [id]: selectedItem ? selectedItem.name_th : '',
        zip_code: selectedItem && selectedItem.zip_code ? selectedItem.zip_code : ''
      }));

      if (!selectedItem) return;

      if (child) {
        const { [child]: childs } = selectedItem;
        const [setChild] = setChilds;
        setChild(childs);
      }
    };

    return (
      <>
        <label htmlFor={label}>{label}</label>
        <select value={selected[id]} onChange={onChangeHandle} className="form-control">
          <option value="">Select ...</option>
          {list.map((item) => (
            <option key={item.id} value={item.name_th}>
              {item.name_th} - {item.name_en}
            </option>
          ))}
        </select>
      </>
    );
  };

  const handleSaveAddress = () => {
    const addressData = {
      name,
      phone,
      address: `${selected.province}, ${selected.amphure}, ${selected.tambon}, ${selected.zip_code}`,
      email,
    };
    console.log("Saving address:", addressData);
    saveAddress(user.token, addressData)
      .then((res) => {
        console.log("Address saved:", res.data);
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
    setLoading(true);

    saveOrder(user.token, images)
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
          emptyCart(user.token);
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          toast.success("Save Order Success");
          navigate("/user/history");
        } else {
          console.error("Response data is undefined");
          toast.error("Save Order Failed");
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast.error("Save Order Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div
          className="row mt-5 mb-5"
          style={{
            boxShadow: "0 3px 5px rgba(150, 27, 78, 0.7)",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
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

            <DropdownList label="Province: " id="province" list={provinces} child="amphure" childsId={["amphure", "tambon"]} setChilds={[setAmphures, setTambons]} />
            <DropdownList label="District: " id="amphure" list={amphures} child="tambon" childsId={["tambon"]} setChilds={[setTambons]} />
            <DropdownList label="Sub-district: " id="tambon" list={tambons} />
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                className="form-control"
                value={selected.zip_code}
                readOnly
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
            <button
              className="btn btn-primary m-2"
              onClick={handleSaveAddress}
              style={{
                backgroundColor: "rgb(233, 57, 139)",
                borderColor: "rgb(233, 57, 139)",
              }}
            >
              Save Address
            </button>
          </div>
          <div
            className="col-md-6 mb-5"
            style={{
              boxShadow: "0 3px 5px rgba(150, 27, 78, 0.7)",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h5>Order Summary</h5>
            <hr />
            <p>Product {products.length}</p>
            <hr />
            <ul>
              {products.map((item, i) => (
                <li key={i}>
                  {item.product.title} x {item.count} = $
                  {item.price * item.count}
                </li>
              ))}
            </ul>
            <hr />
            Total: <b>${total}</b>
            <hr />
            <p>ช่องทางการชำระเงิน: โอนผ่านบัญชีธนาคาร</p>
            <p>ธนาคารกสิกร :  400-122-200-xxx</p>
            <hr />
            <p>
              อัพโหลดสลีป | หลักฐานการชำระเงิน{" "}
              <FileUpload images={images} setImages={setImages} />
            </p>
            <div className="row">
              <button
                onClick={handleCreateOrder}
                disabled={!addressSaved || !products.length}
                className="btn btn-success"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <Modal visible={loading} footer={null} closable={false} centered>
        <div style={{ textAlign: "center" }}>
          <Spin />
          <div style={{ marginTop: 10 }}>Processing your order...</div>
        </div>
      </Modal>
    </>
  );
};

export default CheckOut;
