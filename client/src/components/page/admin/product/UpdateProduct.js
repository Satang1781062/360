import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";

//function
import { readProduct, updateProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import { listCategoryService } from "../../../function/categoryservice";

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
  const [categoriesService, setCategoriesService] = useState([]);
  const [selectedSource, setSelectedSource] = useState("category"); // Default selection for source
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
        setSelectedSource(res.data.category ? "category" : "categoryService");
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
    listCategoryService(user.token)
      .then((res) => {
        setCategoriesService(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateProduct(user.token, values._id, values)
      .then((res) => {
        setLoading(false);
        toast.success("อัพเดตสินค้าสำเร็จ");
        navigate("/admin/index");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("อัพเดตสินค้าไม่สำเร็จ");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loading ? <h2>Loading...</h2> : <h2>Product Update</h2>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category Source</label>
              <select
                className="form-control"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="category">Category</option>
                <option value="categoryService">Category Service</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                value={values.category ? values.category._id : ""}
                onChange={handleChange}
                required
              >
                <option>Pless select</option>
                {selectedSource === "category" &&
                  category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                {selectedSource === "categoryService" &&
                  categoriesService.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <FileUpload
              loading={loading}
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
