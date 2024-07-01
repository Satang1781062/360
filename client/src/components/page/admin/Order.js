import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

//function
import { getOrdersAdmin, updateStatusOrder } from "../../function/admin";
import { toast } from "react-toastify";

import { Tabs, Table } from "antd";

import Invoice from "./Invoice";



import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import InvoiceBill from "./InvoiceBill";
const { TabPane } = Tabs;

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  console.log(orders);

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
      toast.info("Updated " + res.data.orderstatus + " Success");
      loadData();
    });
  };
  const orderCard = orders.map((item, index) => {
    return (
      <div key={index} className="card mb-3">
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
                <tr key={i}>
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
            <PDFDownloadLink
              document={<InvoiceBill order={item} />}
              fileName="invoice_with_image.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Invoice with Image"
              }
            </PDFDownloadLink>
          </div>
          <div className="mt-3">
            <PDFDownloadLink
              document={<Invoice order={item} />}
              fileName={`invoice_${item._id}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading PDF..." : "Download Invoice"
              }
            </PDFDownloadLink>
            {/* <FundViewOutlined /> */}
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
            <li key={i}>
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
        <PDFDownloadLink
          document={<InvoiceBill order={item} />}
          fileName="invoice_with_image.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Invoice"
          }
        </PDFDownloadLink>
      ),
    },
    {
      title: "ที่อยู่จัดส่ง",
      render: (item) => (
        <PDFDownloadLink
          document={<Invoice order={item} />}
          fileName={`invoice_${item._id}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading PDF..." : "Download Invoice"
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
          <tr key={i}>
            <th scope="row">{item.orderdBy?.username}</th>
            <td>
              <ol>
                {item.products?.map((p, j) => (
                  <li key={j}>
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
              <PDFDownloadLink
                document={<InvoiceBill order={item} />}
                fileName="invoice_with_image.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading
                    ? "Loading document..."
                    : "money transfer slip"
                }
              </PDFDownloadLink>
            </td>
            <td>
              <PDFDownloadLink
                document={<Invoice order={item} />}
                fileName={`invoice_${item._id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
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
              Table Atnd
              <Table dataSource={orders} columns={columns} />
            </TabPane>

            <TabPane tab="Tab 3" key="3">
              Table Boostrap
              {tableBoot}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Orders;
