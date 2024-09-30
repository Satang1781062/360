import React, { useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../function/users";
import { toast } from "react-toastify";
import _ from "lodash";
import Footer from "../layouts/Footer";
import { listPromotions } from "../function/promotion";
import "./SingleProductCard.css"; // นำเข้าไฟล์ CSS ของคุณ

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const { _id, title, description, images, price, sold, quantity, category } = product;
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [promotionDates, setPromotionDates] = useState({ startDate: null, endDate: null });
  const [promotionTitle, setPromotionTitle] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await listPromotions();
        const promotions = res.data;
        const productPromotion = promotions.find(promotion =>
          promotion.products.some(p => p._id === product._id)
        );

        if (productPromotion) {
          const discount = productPromotion.discount;
          const discounted = product.price - (product.price * discount / 100);
          setDiscountedPrice(discounted);
          setPromotionDates({
            startDate: new Date(productPromotion.startDate).toLocaleDateString(),
            endDate: new Date(productPromotion.endDate).toLocaleDateString(),
          });
          setPromotionTitle(productPromotion.title);
        } else {
          setPromotionTitle("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromotions();
  }, [product]);

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
      discountedPrice: discountedPrice !== null ? discountedPrice : product.price,
    });

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const handleAddToWishList = (e) => {
    if (user) {
      addToWishlist(user.token, _id)
        .then((res) => {
          toast.success(" เพิ่มลงในรายการที่ชื่นชอบ เรียบร้อย ");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("!! กรุณาลงชื่อเข้าใช้ !!");
    }
  };

  return (
    <>
      <div className="container single-product-container">
        <div className="row justify-content-center align-items-center mb-4">
          <div className="card-tap col-md-3">
            <Carousel autoPlay showArrows={true} infiniteLoop showThumbs={true}>
              {images &&
                images.map((item) => (
                  <div className="carousel-img-container" key={item.public_id}>
                    {console.log(item.url)} {/* ตรวจสอบ URL ของภาพ */}
                    <img src={item.url} className="carousel-img" />
                  </div>
                ))}
            </Carousel>
            <Tabs>
              <TabPane tab="Description" key="1">
                {description}
              </TabPane>
              <TabPane tab="More..." key="2">
                More...
              </TabPane>
            </Tabs>
          </div>
          {/* <div className="col-1"></div> */}
          <div className="card-tap col-md-3">
            <h2 className="p-2 mt-0" style={{ backgroundColor: "#eb6472", color: "#fff" }}>
              {discountedPrice !== null ? promotionTitle : title}
            </h2>
            <Card
              actions={[
                <a onClick={handleAddToWishList}>
                  <HeartOutlined className="text-info" />
                  <br />
                  Add to wishlist
                </a>,
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" />
                  <br />
                  Add to cart
                </a>,
              ]}
            >
              <ul className="list-group list-group-flush mt-1">
                <li className="list-group-item">
                  Price
                  <span className="float-end">
                    {discountedPrice !== null && discountedPrice !== undefined ? (
                      <>
                        <span className="original-price">{price.toFixed(2)}</span>{" "}
                        <span className="discounted-price">{discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      price !== null && price !== undefined ? 
                      price.toFixed(2) : "N/A"
                    )}
                  </span>
                </li>
                <li className="list-group-item">
                  Quantity
                  <span className="float-end">{quantity}</span>
                </li>
                <li className="list-group-item">
                  Sold
                  <span className="float-end">{sold}</span>
                </li>
                {product.category && (
                  <li className="list-group-item">
                    Category
                    <span className="float-end">{category.name}</span>
                  </li>
                )}
                {promotionDates.startDate && (
                  <li className="list-group-item">
                    Promotion Start Date
                    <span className="float-end">{promotionDates.startDate}</span>
                  </li>
                )}
                {promotionDates.endDate && (
                  <li className="list-group-item">
                    Promotion End Date
                    <span className="float-end">{promotionDates.endDate}</span>
                  </li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default SingleProductCard;
