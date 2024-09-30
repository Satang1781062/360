import React from "react";
import logo from "./auth/logo/logo.png";
import Footer from "../layouts/Footer";

const ContactShop = () => {
  const buttons = [
    { text: "360 healthyshop", url: "https://360-healthyshop.netlify.app" },
    { text: "LINE SHOP", url: "https://shop.line.me/@360healthyshop" },
    {
      text: "SHOPEE",
      url: "https://shopee.co.th/buyer/login?next=https%3A%2F%2Fshopee.co.th%2F360healthy_shop",
    },
    {
      text: "LAZADA",
      url: "https://www.lazada.co.th/shop/360healthyshop?path=index.htm&inWeexShop=true&lang=th&channelSource=defaultChannel&dsource=share&laz_share_info=447690450_103_8000_100034712766_447690450_null&laz_token=5c30736db9038520284bcfda8b95c73d&exlaz=e_hT6TUe7%2BGafGip8qo24MCSTeQCjDld4siVQ4kY1ODqrZwT6Rq4aTKOVfjasntcyMjhLIxv5u5drjp47Lo8T92c%2B%2FoPL8rYT7D3WnASIas1Y%3D&sub_aff_id=social_share&sub_id2=447690450&sub_id3=100034712766&sub_id6=CPI_EXLAZ",
    },
    { text: "TIKTOK", url: "https://www.tiktok.com/@360healthyshop" },
    {
      text: "Line @360healthy",
      url: "https://line.me/R/ti/p/@buo6340m?oat_content=url",
    },
  ];

  const handleButtonClick = (url) => {
    window.open(url, "_blank"); // เปิด URL ในแท็บหรือหน้าต่างใหม่
  };

  return (
    <>
    <div className="container">
      <div className="row justify-content-center mt-5">
      <div className="col-md-6 text-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3 mb-md-0"
            style={{ maxWidth: "200px" }}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6"></div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {buttons.map((button, index) => (
            <div key={index} className="mb-2">
              <button
                style={{
                  backgroundColor: "#4CAF50", // สีเขียว
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  width: "100%", // ปรับให้ปุ่มเต็มความกว้างของ col-md-6
                }}
                onClick={() => handleButtonClick(button.url)}
              >
                {button.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default ContactShop;
