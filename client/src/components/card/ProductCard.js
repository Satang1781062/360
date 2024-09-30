import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { listPromotions } from "../function/promotion";
import './Product.css';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [hasPromotion, setHasPromotion] = useState(false);

  const { _id, title, description, images, price } = product; // ดึง price จาก product

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await listPromotions();
        const promotions = res.data;
        const productPromotion = promotions.find(promotion =>
          promotion.products.some(p => p._id === product._id)
        );

        if (productPromotion) {
          setHasPromotion(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromotions();
  }, [product]);

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...product,
      count: 1
    });

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem('cart', JSON.stringify(unique));
    dispatch({
      type: 'ADD_TO_CART',
      payload: unique
    });
    dispatch({
      type: 'SET_VISIBLE',
      payload: true
    });
  };

  const shortenedDescription = description.slice(0, 15);

  return (
    <div className='product-card-container'> {/* เพิ่ม div ครอบ Card */}
      {hasPromotion && (
        <div className='promotion-label'>Promotion</div>
      )}
      <Card
        hoverable
        className='product-card mx-auto'
        cover={
          <img
            className='p-1'
            style={{ height: '240px', width: '100%' }}
            alt='example'
            src={images && images.length ? images[0].url : ''}
          />
        }
        actions={[
          <Link to={'/product/' + _id}>
            <EyeOutlined className='text-warning' />
          </Link>,
          <ShoppingCartOutlined onClick={handleAddToCart} className='text-danger' />
        ]}
        style={{
          boxShadow: isHovered ? '0 4px 8px rgba(150, 27, 78, 0.7)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Meta title={title} description={shortenedDescription} />
        <div className="product-price">
          {/* แสดงราคา */}
          <h4>${price.toFixed(2)}</h4> {/* ปรับรูปแบบราคา */}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
