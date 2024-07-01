import React from "react";
import lineImage from "./img/Line.png";
import facebookImage from "./img/Facebook.png";
import igImage from "./img/Ig.png";
import tiktokImage from "./img/Tiktok2.png";
import youtubeImage from "./img/Youtube.png";
// import { FaLine, FaShopee, FaLazada, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="py-4 bg-light text-center mt-5">
      <h5>ช่องทางติดต่อ</h5>
      <div className="d-flex justify-content-center align-items-center my-3">
        <a
          href="https://line.me/R/ti/p/@buo6340m"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={lineImage} alt="Line" className="mx-2" style={{ width: "40px", height: "40px" }} />
        </a>
        <a
          href="https://www.facebook.com/360healthy789shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebookImage} alt="Facebook" className="mx-2" style={{ width: "40px", height: "40px" }} />
        </a>
        <a
          href="https://www.instagram.com/360.healthyshop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={igImage} alt="Instagram" className="mx-2" style={{ width: "40px", height: "40px" }} />
        </a>
        <a
          href="https://www.youtube.com/@360healthyshop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeImage} alt="Youtube" className="mx-2" style={{ width: "40px", height: "40px" }} />
        </a>
        <a
          href="https://www.tiktok.com/@360healthyshop?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tiktokImage} alt="TikTok" className="mx-2" style={{ width: "40px", height: "40px" }} />
        </a>
      </div>
      <div>โทร: 0990439888 | 0989232424</div>
      <div>
        <a
          href="http://www.360healthyshop.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.360healthyshop.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
