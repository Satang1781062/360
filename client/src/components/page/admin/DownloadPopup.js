import React from 'react';
import { Modal, Button, Spin } from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice';

const DownloadPopup = ({ visible, onClose, order }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      title="Downloading PDF"
      width={400}
    >
      <div style={{ textAlign: 'center' }}>
        <PDFDownloadLink
          document={<Invoice order={order} />}
          fileName={`invoice_${order._id}.pdf`}
        >
          {({ loading }) =>
            loading ? <Spin tip="Generating PDF..." /> : <Button type="primary">Download Invoice</Button>
          }
        </PDFDownloadLink>
      </div>
    </Modal>
  );
};

export default DownloadPopup;
