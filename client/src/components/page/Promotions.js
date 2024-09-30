import React, { useEffect, useState } from "react";
import { listPromotions } from "../function/promotion";
import ProductCard from "../card/ProductCard";
import { useDispatch } from "react-redux";
import "../card/Product.css"; // อย่าลืมที่จะ import ไฟล์ CSS
import promotionLogo from "../../components/page/img/iconpromotion.jpg"; // import รูปโลโก้
import "../page/Promotion.css";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = () => {
    listPromotions()
      .then((res) => {
        // กรองสินค้าที่มี discountedPrice
        const productsWithPromotions = res.data.flatMap((promotion) =>
          promotion.products.filter((product) => product.discountedPrice)
        );
        setPromotions(productsWithPromotions);
      })
      .catch((err) => {
        console.error("Error loading promotions:", err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="promotions-container mt-5">
          <div className="promotions-header">
            <img
              src={promotionLogo}
              alt="Promotion Logo"
              className="promotion-logo"
            />
            <h1>Promotions</h1>
          </div>
          <div className="row justify-content-center">
            {promotions.length > 0 ? (
              promotions.map((product, index) => (
                <div key={index} className="col-6 col-md-3 mb-3">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p>No promotions available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;

