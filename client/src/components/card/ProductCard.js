import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import './Product.css'

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { _id, title, description, images } = product;

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

  const shortenedDescription = description.slice(0, 20);


  return (
    <Card
      hoverable
      className='product-card mx-auto' // ใช้คลาสที่ประกาศไว้ใน styles.css
      cover={
        <img
          className='p-1'
          style={{ height: '250px', width: '100%', objectFit: 'cover' }}
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
    >
       <Meta title={title} description={shortenedDescription} /> {/* ใช้คำอธิบายที่ถูกตัดแล้ว */}
    </Card>
  );
};

export default ProductCard;