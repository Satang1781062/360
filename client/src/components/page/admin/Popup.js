import React, { useEffect, useState } from 'react';
import { Modal, Button, Image } from 'antd';

const styles = {
  image: {
    width: '30%',
    height: 'auto',
    maxWidth: 500,
    maxHeight: 500,
    marginBottom: 20,
    objectFit: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
};

const Popup = ({ visible, onClose, order }) => {
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  return (
    <Modal
      title="Invoice Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p style={styles.text}>หลักฐานการชำระเงิน</p>
      {currentOrder && currentOrder.images && currentOrder.images.length > 0 ? (
        currentOrder.images.map((image, index) => {
          const imageUrl = typeof image === 'string' ? image : image.url;
          return <Image key={index} style={styles.image} src={imageUrl} />;
        })
      ) : (
        <p style={styles.text}>ไม่มีหลักฐาน</p>
      )}
    </Modal>
  );
};

export default Popup;
