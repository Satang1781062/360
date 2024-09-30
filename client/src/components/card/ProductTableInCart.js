import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import "./ProductTableInCart.css"; // เพิ่มไฟล์ CSS สำหรับการจัดวาง

const ProductTableInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      toast.error('Max available Quantity: ' + item.quantity);
      return;
    }

    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    });
  };

  return (
    <tbody>
      <tr>
        <td>
          <img src={item.images[0].url} width="100" alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>
          <div className="count-container">
            {/* ปุ่มลดจำนวน */}
            <button
              className="btn btn-outline-secondary count-button"
              onClick={() =>
                handleChangeCount({ target: { value: item.count - 1 } })
              }
              disabled={item.count <= 1}
            >
              -
            </button>
            {/* อินพุตสำหรับจำนวนสินค้า */}
            <input
              onChange={handleChangeCount}
              className="form-control count-input"
              value={item.count}
              type="number"
              min="1"
              max={item.quantity}
            />
            {/* ปุ่มเพิ่มจำนวน */}
            <button
              className="btn btn-outline-secondary count-button"
              onClick={() =>
                handleChangeCount({ target: { value: item.count + 1 } })
              }
              disabled={item.count >= item.quantity}
            >
              +
            </button>
          </div>
        </td>
        <td>
          <DeleteOutlined onClick={handleRemove} className="text-danger" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableInCart;
