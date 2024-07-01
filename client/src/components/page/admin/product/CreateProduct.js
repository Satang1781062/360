import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// function
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";

import FileUpload from "../product/FileUpload";
import { Spin } from 'antd';

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};
const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loadding,setLoading] = useState(false)

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("values", values);

  const handleChang = (e) => {
    // console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, price, quantity } = values;

    if (!title || !description || !price || !quantity) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("เพิ่มสินค้า" + res.data.title + "สำเร็จ");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response);
        // setValues({ ...values, initialstate: "" }); // Reset input field
        toast.error("เพิ่มสินค้า" + err.data.title + "ไม่สำเร็จ");
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loadding
          ?<h1>Loading...<Spin /></h1>
          :<h1>Create Product</h1>
          }
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChang}
              ></input>
            </div>

            <div className="form-group">
              <label>description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChang}
              ></input>
            </div>

            <div className="form-group">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChang}
              ></input>
            </div>

            <div className="form-group">
              <label>quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChang}
              ></input>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChang}
                required
              >
                <option>Pless select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                  <option 
                  key={item._id}
                  value={item._id}>
                    {item.name}
                    </option>))}
              </select>
            </div>
            <FileUpload 
            loadding={loadding} 
            setLoading={setLoading}
            values={values} 
            setValues={setValues}/>

            
            <button className="btn btn-primary">Submit</button>

            {/* <div className="form-group">
              <label>images</label>
              <input  className="form-control"
              type="text"
              name="images"
              value={values.images}
              onChange={handleChang}
              ></input>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
