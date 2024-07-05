import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { getOrdersAdmin, updateStatusOrder } from "../../function/admin";
import { toast } from "react-toastify";
import { Tabs, Table, Modal, Button, Image, StyleSheet } from "antd";
import Invoice from "./Invoice";
import InvoiceBill from "./InvoiceBill";
import Popup from "./Popup";
import { Document, Page, View, StyleSheet as PDFStyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const { TabPane } = Tabs;

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenPopup = (order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const handleClosePopup = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      toast.info("Updated " + res.data.orderstatus + " Success");
      loadData();
    });
  };

  const orderCard = orders.map((item, index) => {
    return (
      <div key={item._id} className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            Order by <b>{item.orderdBy?.username}</b>
          </h5>
          <p className="card-text">Status: {item.orderstatus}</p>
          <select
            value={item.orderstatus}
            onChange={(e) => handleChangeStatus(item._id, e.target.value)}
            style={{ width: "200px", alignSelf: "center" }}
            className={`form form-control ${
              item.orderstatus === "Processing"
                ? "bg-warning"
                : item.orderstatus === "Cancelled"
                ? "bg-danger text-light"
                : item.orderstatus === "Completed"
                ? "bg-success text-light"
                : ""
            }`}
          >
            <option value="Not Process">Not Process</option>
            <option value="Processing" className="bg-warning text-dark">
              Processing
            </option>
            <option value="Cancelled" className="bg-danger text-light">
              Cancelled
            </option>
            <option value="Completed" className="bg-success text-light">
              Completed
            </option>
          </select>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {item.products.map((p, i) => (
                <tr key={p.product._id}>
                  <td>{p.product.title}</td>
                  <td>{p.price}</td>
                  <td>{p.count}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  Total Price: <b>{item.cartTotal}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3">
            <Button onClick={() => handleOpenPopup(item)}>View Invoice with Image</Button>
          </div>
          <div className="mt-3">
            <PDFDownloadLink
              document={<Invoice order={item} />}
              fileName={`invoice_${item._id}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading PDF..." : "Download Invoice"
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    );
  });

  const columns = [
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "orderdBy",
      render: (item, i) => <>{item?.username || "No user"}</>,
    },
    {
      title: "รายการสินค้า",
      render: (item, i) => (
        <ol>
          {item.products.map((p, i) => (
            <li key={p.product._id}>
              {p.product.title}{" "}
              <b>
                {p.price}x{p.count}
              </b>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "ราคารวมสุทธิ",
      dataIndex: "cartTotal",
      key: "cartTotal",
    },
    {
      title: "สถานะ",
      dataIndex: "orderstatus",
      key: "orderstatus",
    },
    {
      title: "หลักฐานการชำระเงิน",
      render: (item) => (
        <Button onClick={() => handleOpenPopup(item)}>View</Button>
      ),
    },
    {
      title: "ที่อยู่จัดส่ง",
      render: (item) => (
        <PDFDownloadLink
          document={<Invoice order={item} />}
          fileName={`invoice_${item._id}.pdf`}
        >
          {({ loading }) =>
            loading ? "Loading PDF..." : "Download Address"
          }
        </PDFDownloadLink>
      ),
    },
    {
      title: "อัพเดทสถานะ",
      render: (item) => (
        <select
          value={item.orderstatus}
          onChange={(e) => handleChangeStatus(item._id, e.target.value)}
          style={{ width: "200px", alignSelf: "center" }}
          className={`form form-control ${
            item.orderstatus === "Processing"
              ? "bg-warning"
              : item.orderstatus === "Cancelled"
              ? "bg-danger text-light"
              : item.orderstatus === "Completed"
              ? "bg-success text-light"
              : ""
          }`}
        >
          <option value="Not Process">Not Process</option>
          <option value="Processing" className="bg-warning text-dark">
            Processing
          </option>
          <option value="Cancelled" className="bg-danger text-light">
            Cancelled
          </option>
          <option value="Completed" className="bg-success text-light">
            Completed
          </option>
        </select>
      ),
    },
  ];

  const tableBoot = (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ชื่อผู้ใช้</th>
          <th scope="col">รายการสินค้า</th>
          <th scope="col">ราคารวมสุทธิ</th>
          <th scope="col">สถานะ</th>
          <th scope="col">หลักฐานการชำระเงิน</th>
          <th scope="col">ที่อยู่จัดส่ง</th>
          <th scope="col">อัพเดทสถานะ</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, i) => (
          <tr key={item._id}>
            <th scope="row">{item.orderdBy?.username}</th>
            <td>
              <ol>
                {item.products.map((p, i) => (
                  <li key={p.product._id}>
                    {p.product.title}{" "}
                    <b>
                      {p.price}x{p.count}
                    </b>
                  </li>
                ))}
              </ol>
            </td>
            <td>{item.cartTotal}</td>
            <td>{item.orderstatus}</td>
            <td>
              <Button onClick={() => handleOpenPopup(item)}>View</Button>
            </td>
            <td>
              <PDFDownloadLink
                document={<Invoice order={item} />}
                fileName={`invoice_${item._id}.pdf`}
              >
                {({ loading }) =>
                  loading ? "Loading PDF..." : "Download Address"
                }
              </PDFDownloadLink>
            </td>
            <td>
              <select
                value={item.orderstatus}
                onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                style={{ width: "200px", alignSelf: "center" }}
                className={`form form-control ${
                  item.orderstatus === "Processing"
                    ? "bg-warning"
                    : item.orderstatus === "Cancelled"
                    ? "bg-danger text-light"
                    : item.orderstatus === "Completed"
                    ? "bg-success text-light"
                    : ""
                }`}
              >
                <option value="Not Process">Not Process</option>
                <option value="Processing" className="bg-warning text-dark">
                  Processing
                </option>
                <option value="Cancelled" className="bg-danger text-light">
                  Cancelled
                </option>
                <option value="Completed" className="bg-success text-light">
                  Completed
                </option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col text-center">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              Order Card
              {orderCard}
            </TabPane>

            <TabPane tab="Tab 2" key="2">
              Table Ant Design
              <Table dataSource={orders} columns={columns} />
            </TabPane>

            <TabPane tab="Tab 3" key="3">
              Table Bootstrap
              {tableBoot}
            </TabPane>
          </Tabs>
        </div>
      </div>

      <Popup
        visible={visible}
        onClose={handleClosePopup}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
