import React, { useState, useEffect } from "react";

import { listProductBy } from "../function/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";
import "./NewProduct.css";
const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 8)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    
      <div className="container best-seller-container">
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="horizontal-scroll-container">
          <div className="horizontal-scroll">
            {products.map((item, index) => (
              <div key={index} className="col-2 col-md-2 mb-3 horizontal-scroll-item">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
  );
};

export default NewProduct;
