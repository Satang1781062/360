import React from "react";
import NewProduct from "../home/NewProduct";
import BestSeller from "../home/BestSeller";
import { Carousel, Row, Col, Button } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/Home.css";

import MenubarUserHome from "../layouts/MenubarUserHome";

import firstSlideImage from "./images/1.png";
import secondSlideImage from "./images/2.png";
import thirdSlideImage from "./images/3.png";
import fourthSlideImage from "./images/4.png";
import fifthSlideImage from "./images/5.png";
import MUVITA1 from "./images/MUVITA1.png";
import MUVITA2 from "./images/MUVITA2.png";
import lineImage from "./image/line.png";
import logo from "./auth/logo/logo.png"; // ใส่ path ของโลโก้ที่นี่
import Footer from "../layouts/Footer";

import u1SlideImage from "./imageUnique/1.jpg";
import u2SlideImage from "./imageUnique/2.jpg";
import u3SlideImage from "./imageUnique/3.jpg";
import u4SlideImage from "./imageUnique/4.jpg";
import u5SlideImage from "./imageUnique/5.jpg";

import y1SlideImage from "./imageYooEnCare/1.jpg";
import y2SlideImage from "./imageYooEnCare/2.jpg";
import y3SlideImage from "./imageYooEnCare/3.jpg";
import y4SlideImage from "./imageYooEnCare/4.jpg";
import y5SlideImage from "./imageYooEnCare/5.jpg";

import "../page/Home.css";

const Home = () => {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อการนำทาง

  const handleButtonClick = () => {
    navigate("/contact-shop"); // นำทางไปยัง component1 เมื่อคลิกปุ่ม
  };

  return (
    <div className="home-container">
      {/* Carousel Container */}
      <div className=" carousel-container">
        <div className="row container mt-5 d-flex">
          <div className="menu col-md-3 mb-3">
            {" "}
            {/* เพิ่ม class me-3 เพื่อเพิ่ม margin ให้กับ sidebar */}
            <MenubarUserHome />
          </div>
          <div className="col flex-grow-1">
            {" "}
            {/* เพิ่ม flex-grow-1 เพื่อให้ Carousel ใช้พื้นที่ที่เหลือ */}
            <div className="row">
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img className="d-block w-100" src={MUVITA1} alt="Muvita 1" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={MUVITA2} alt="Muvita 2" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <Carousel interval={3000}>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={u1SlideImage}
                  alt="First slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={u2SlideImage}
                  alt="Second slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={u3SlideImage}
                  alt="Third slide"
                />
              </Col>
            </Row>
            <Carousel.Caption>
              {/* <h3>First group of slides</h3>
              <p>Some description for the first group.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={fourthSlideImage}
                  alt="Fourth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={u4SlideImage}
                  alt="Fifth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={u5SlideImage}
                  alt="Sixth slide"
                />
              </Col>
            </Row>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* <div className="container mt-5">
        <Carousel interval={3000}>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={y1SlideImage}
                  alt="First slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={y2SlideImage}
                  alt="Second slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={y3SlideImage}
                  alt="Third slide"
                />
              </Col>
            </Row>
            
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={y4SlideImage}
                  alt="Fourth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={y4SlideImage}
                  alt="Fifth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={y5SlideImage}
                  alt="Sixth slide"
                />
              </Col>
            </Row>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div> */}

      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-12 col-md-8 mt-5 d-flex flex-column flex-md-row align-items-center text-center text-md-left">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3 mb-md-0"
            style={{ maxWidth: "300px" }}
          />
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ width: "100%" }}
          >
            <ReactTypingEffect
              text={["360 healthyshop จำหน่ายผลิตภัณฑ์เพื่อสุขภาพ"]}
              speed={100}
              eraseSpeed={50}
              eraseDelay={1000}
              typingDelay={500}
              style={{ color: "#FF1493" }}
            />
            <br />
            <br />
            <p style={{ textAlign: "justify", padding: "0 20px" }}>
              360healthyshop จำหน่ายผลิตภัณฑ์เพื่อสุขภาพ
              ผลิตภัณฑ์ที่ช่วยปรับสมดุลร่างกายทางกายภาพ เคล็ดลับการมีสุขภาพที่ดี
              ความปลอดภัยต่อผู้บริโภคเป็นสิ่งสำคัญ
              เราเลือกผลิตภัณฑ์ทุกชิ้นมีการผ่านการรับรองจากองค์กรอาหารและยา
              (อย.) และได้รับรับรองมาตราฐาน GMP
              เพื่อตอบโจทย์ปัญหาได้ตรงจุดและเข้าถึงผู้บริโภคมากที่สุด
            </p>
          </div>
        </div>
      </div>

      <div className="box-shadow">
        <div className="center-container">
          <div className="text-center p-3 mt-1 mb-1 custom-heading blinking-box">
            สินค้ามาใหม่
          </div>
        </div>
        <NewProduct />
      </div>

      <div className="box-shadow">
        <div className="center-container">
          <div className="text-center p-3 mt-1 mb-1 custom-heading blinking-box">
            สินค้าขายดี
          </div>
        </div>
        <BestSeller />
      </div>

      {/* YouTube video */}
      <div className="row mt-5">
        <div className="col-6 d-flex justify-content-center align-items-center mx-auto mt-5">
          <div className="ratio ratio-16x9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/2F24ztMGPjE?si=jXAg5RehB5NXykEc"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="text-center mt-5">
          <Button variant="primary" onClick={handleButtonClick}>
            ช่องทางการสั่งซื้อ
          </Button>
        </div>
      </div>

      <div className="container mt-5">
        <div>
          <div className="text-center p-2 mt-5 mb-4 custom-heading">
            รีวิวจากผู้ใช้งาน
          </div>
        </div>

        <Carousel>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={firstSlideImage}
                  alt="First slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={secondSlideImage}
                  alt="Second slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={thirdSlideImage}
                  alt="Third slide"
                />
              </Col>
            </Row>
            <Carousel.Caption>
              {/* <h3>First group of slides</h3>
              <p>Some description for the first group.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100"
                  src={fourthSlideImage}
                  alt="Fourth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={fifthSlideImage}
                  alt="Fifth slide"
                />
              </Col>
              <Col>
                <img
                  className="d-block w-100"
                  src={firstSlideImage}
                  alt="Sixth slide"
                />
              </Col>
            </Row>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
