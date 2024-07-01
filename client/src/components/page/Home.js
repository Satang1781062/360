import React from "react";
import NewProduct from "../home/NewProduct";
import BestSeller from "../home/BestSeller";
import { Carousel, Row, Col } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';
import './css/Home.css';

import firstSlideImage from './images/1.png';
import secondSlideImage from './images/2.png';
import thirdSlideImage from './images/3.png';
import fourthSlideImage from './images/4.png';
import fifthSlideImage from './images/5.png';
import lineImage from './image/line.png';
import logo from './auth/logo/logo.png'; // ใส่ path ของโลโก้ที่นี่
import Footer from "../layouts/Footer";

const Home = () => {
  return (
    <div>
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-5 mt-5 d-flex flex-column flex-md-row align-items-center text-center text-md-left">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3 mb-md-0"
            style={{ maxWidth: "300px" }}
          />
          <div className="ml-md-4 "  style={{ maxWidth: "500px" }}>
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
            <p style={{ textAlign: "justify" }}>
              360healthyshop จำหน่ายผลิตภัณฑ์เพื่อสุขภาพผลิตภัณฑ์ที่ช่วยปรับสมดุลร่างกายทางกายภาพ เคล็ดลับการมีสุขภาพที่ดี ความปลอดภัยต่อผู้บริโภคเป็นสิ่งสำคัญ เราเลือกผลิตภัณฑ์ทุกชิ้นมีการผ่านการรับรองจากองค์กรอาหารและยา (อย.) และได้รับรับรองมาตราฐาน GMP เพื่อตอบโจทย์ปัญหาได้ตรงจุดและเข้าถึงผู้บริโภคมากที่สุด
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center p-3 mt-5 mb-4 custom-heading">
          สินค้ามาใหม่
        </div>
        <NewProduct />
      </div>
      <div>
        <div className="text-center p-3 mt-5 mb-4 custom-heading">
          สินค้าขายดี
        </div>
        <BestSeller />
      </div>

      {/* YouTube video */}
      <div className="row">
        <div className="text-center p-3 mt-5 mb-4 custom-heading">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2F24ztMGPjE?si=jXAg5RehB5NXykEc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="container mt-5">
        <div>
          <div className="text-center p-2 mt-5 mb-4 custom-heading">
            รีวิวจากผู้ใช้
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
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <footer className="py-4 bg-light text-center mt-5">
        <p>ช่องทางติดต่อ</p>
        <div className="d-flex justify-content-center align-items-center">
          <a
            href="https://line.me/R/ti/p/@buo6340m"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={lineImage} alt="Line" className="mx-2" />
          </a>
          
        </div>
        <div>โทร: 0990439888 l 0989232424</div>
        <div>
          <a
            href="http://www.360healthyshop.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.360healthyshop.com
          </a>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
};

export default Home;