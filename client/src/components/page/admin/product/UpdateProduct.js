import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";

//function
import { readProduct, updateProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";

const UpdateProduct = () => {
  const initialstate = {
    title: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
  };

  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loadding, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("product", values);
  console.log("category", category);

  const handleChang = (e) => {
    // console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    updateProduct(user.token, values._id, values)
      .then((res) => {

        setLoading(false)
        toast.success('อัพเดตราการ'+res.data.title+'สำเร็จ')
        console.log(res);
        navigate('/admin/index')
      })
      .catch((err) => {
        setLoading(false)
        toast.error('อัพเดตราการไม่สำเร็จ')
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loadding
          ?<h2>Loading...</h2>
          :<h2>Product Update</h2>
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
                value={values.category._id}
                required
              >
                <option>Pless select</option>
                {category.length > 0 &&
                  category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <FileUpload
              loadding={loadding}
              setLoading={setLoading}
              values={values}
              setValues={setValues}
            />

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
