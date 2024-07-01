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
        <div className="col">
          {loading ? (
            <h1>Loading....</h1>
          ) : (
            <>
              <ReactTypingEffect
                text={['ADMIN 360healthyshop']}
                speed={100}
                eraseDelay={100}
                className="typingeffect" // ใส่ className สำหรับ ReactTypingEffect
              />
              <div className="row">
                {product.map((item) => (
                  <div key={item._id} className="col-md-2 pb-4 mt-100px">
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
