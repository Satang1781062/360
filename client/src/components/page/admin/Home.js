import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { listProduct, removeProduct } from "../../function/product";
import AdminProductCard from "../../card/AdminProductCard";
import { toast } from "react-toastify";
import ReactTypingEffect from 'react-typing-effect';
import "./Home.css"; // นำเข้าไฟล์ stylesheet

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct()
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Delete ?")) {
      removeProduct(user.token, id)
        .then((res) => {
          loadData();
          toast.success(`ลบรายการ ${res.data.title} สำเร็จ`);
        })
        .catch((err) => {
          toast.error("ลบรายการไม่สำเร็จ");
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-start align-items-center align-self-start mt-5">
          {loading ? (
            <h1>Loading....</h1>
          ) : (
            <>
              <ReactTypingEffect
                text={['ADMIN 360 HEALTHYSHOP']}
                speed={150}
                eraseDelay={100}
                typingDelay={500}
                className="typingeffect" // ใส่ className สำหรับ ReactTypingEffect
                style={{ color: "#FF1493" }}
              />
              <div className="row pb-5">
                {product.map((item) => (
                  <div key={item._id} className="col-6 col-md-3 mb-3">
                    <AdminProductCard handleRemove={handleRemove} product={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
