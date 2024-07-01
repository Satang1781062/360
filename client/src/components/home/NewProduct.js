import React, { useState, useEffect } from "react";

import { listProductBy } from "../function/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 4)
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
    <>
      <div className="container">
        {loading ? (
          <LoadingCard  count={3}/>
        ) : (
          <div className="row justify-content-center">
            {products.map((item, index) => (
              <div key={index} className="col-md-3 mx-auto">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewProduct;
