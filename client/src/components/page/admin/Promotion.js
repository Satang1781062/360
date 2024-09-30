import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createPromotion,
  listPromotions,
  updatePromotion,
  deletePromotion,
} from "../../function/promotion";
import { listProduct, readProduct } from "../../function/product";
import MenubarAdmin from "../../layouts/MenubarAdmin";

const Promotion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadPromotions();
    loadProducts();
  }, []);

  const loadPromotions = () => {
    listPromotions().then((res) => {
      setPromotions(res.data);
    });
  };

  const loadProducts = () => {
    listProduct()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load products");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promotionData = {
      title,
      description,
      discount,
      startDate,
      endDate,
      products: selectedProducts,
    };

    if (editingPromotion) {
      updatePromotion(user.token, editingPromotion._id, promotionData)
        .then((res) => {
          toast.success("Promotion updated");
          loadPromotions();
          resetForm();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      createPromotion(user.token, promotionData)
        .then((res) => {
          toast.success("Promotion created");
          loadPromotions();
          resetForm();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      deletePromotion(user.token, id)
        .then((res) => {
          toast.success("Promotion deleted");
          loadPromotions();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  };

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setTitle(promotion.title);
    setDescription(promotion.description);
    setDiscount(promotion.discount);
    setStartDate(promotion.startDate);
    setEndDate(promotion.endDate);
    setSelectedProducts(promotion.products.map(p => p._id));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDiscount("");
    setStartDate("");
    setEndDate("");
    setSelectedProducts([]);
    setEditingPromotion(null);
  };

  const handleProductSelect = async (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedProducts(selected);
    if (selected.length > 0) {
      try {
        const productId = selected[selected.length - 1]; // เอา id ของ product ที่เลือกตัวล่าสุด
        const res = await readProduct(productId);
        const product = res.data;
        setTitle(product.title);
        setDescription(product.description);
      } catch (err) {
        toast.error("Failed to load product details");
      }
    } else {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-8 ">
          <h4>Promotions</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Products</label>
              <select
                multiple
                className="form-control"
                value={selectedProducts}
                onChange={handleProductSelect}
              >
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
          <hr />
          <div>
            {promotions.map((promotion) => (
              <div key={promotion._id} className="alert alert-secondary">
                <span>{promotion.title}</span>
                <button
                  onClick={() => handleRemove(promotion._id)}
                  className="btn btn-sm float-right"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(promotion)}
                  className="btn btn-sm float-right"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
