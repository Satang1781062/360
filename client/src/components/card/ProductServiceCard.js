import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { listPromotions } from "../function/promotion";
import './Product.css';

const ProductServiceCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [hasPromotion, setHasPromotion] = useState(false);

  const { _id, title, description, images } = product;

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
    <div className="product-card-container">
      {hasPromotion && (
        <div className="promotion-label">Promotion</div>
      )}
      <Card
        className={`product-card mx-auto ${isHovered ? 'shadow-lg' : ''}`}
        style={{ width: '18rem' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Img
          variant="top"
          src={images && images.length ? images[0].url : ''}
          className="p-1"
          style={{ height: '280px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{shortenedDescription}...</Card.Text>
          <div className="d-flex justify-content-between">
            <Link to={`/product/${_id}`}>
              <Button variant="warning">
                <EyeOutlined /> View
              </Button>
            </Link>
            <Button variant="danger" onClick={handleAddToCart}>
              <ShoppingCartOutlined /> Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductServiceCard;
