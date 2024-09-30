import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import { getOrdersAdmin, updateStatusOrder } from "../../function/admin";
import { toast } from "react-toastify";
import { Tabs, Table, Button, Input } from "antd";
import PaymentProofPopup from "./PaymentProofPopup";
import DownloadPopup from "./DownloadPopup";
import { FolderViewOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;
const { Search } = Input;

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [downloadPopupVisible, setDownloadPopupVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  // const loadData = () => {
  //   getOrdersAdmin(user.token).then((res) => {
  //     setOrders(res.data);
  //   });
  // };

  const loadData = () => {
    getOrdersAdmin(user.token).then((res) => {
      const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    });
  };  //แสดงรายการล่าสุด

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      toast.info("Updated " + res.data.orderstatus + " Success");
      loadData();
    });
  };

  const handleOpenPopup = (order) => {
    setSelectedOrder(order);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleOpenDownloadPopup = (order) => {
    setSelectedOrder(order);
    setDownloadPopupVisible(true);
  };

  const handleCloseDownloadPopup = () => {
    setDownloadPopupVisible(false);
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber && order.orderNumber.includes(searchTerm)
  );

  const columns = [
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "orderdBy", // ตรวจสอบให้แน่ใจว่าตรงกับฟิลด์ในข้อมูลของคุณ
      render: (item) => <>{item?.username || "No user"}</>,
    },
    {
      title: "รายการสินค้า",
      dataIndex: "products", // ใช้ dataIndex สำหรับคอลัมน์นี้
      render: (products) => (
        <ol>
          {products.map((p) => (
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
      render: (record) => (
        <Button onClick={() => handleOpenPopup(record)}>View</Button>
      ),
    },
    {
      title: "ที่อยู่จัดส่ง",
      render: (record) => (
        <Button onClick={() => handleOpenDownloadPopup(record)}>Download Invoice22222</Button>
      ),
    },
    {
      title: "อัพเดทสถานะ",
      render: (record) => (
        <select
          value={record.orderstatus}
          onChange={(e) => handleChangeStatus(record._id, e.target.value)}
          style={{ width: "200px", alignSelf: "center" }}
          className={`form form-control ${
            record.orderstatus === "Processing"
              ? "bg-warning"
              : record.orderstatus === "Cancelled"
              ? "bg-danger text-light"
              : record.orderstatus === "Completed"
              ? "bg-success text-light"
              : ""
          }`}
        >
          <option value="Not Process">Not Process</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      ),
    },
  ];
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h4 className="text-center mt-3">คำสั่งซื้อ</h4>
          <div className="mb-3">
            <Search
              placeholder="ค้นหา Order Number..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(value) => setSearchTerm(value)}
            />
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <FolderViewOutlined /> 1
                </span>
              }
              key="1"
            >
              {filteredOrders.map((item) => (
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
                        {item.products.map((p) => (
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
                      <Button onClick={() => handleOpenPopup(item)}>View Payment Proof</Button>
                    </div>
                    <div className="mt-3">
                      <Button onClick={() => handleOpenDownloadPopup(item)}>Download Invoice222</Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FolderViewOutlined /> 2
                </span>
              }
              key="2"
            >
              <Table dataSource={filteredOrders} columns={columns} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FolderViewOutlined /> 3
                </span>
              }
              key="3"
            >
              {/* Alternate view of the table if needed */}
            </TabPane>
          </Tabs>
        </div>
      </div>
      {popupVisible && selectedOrder && (
        <PaymentProofPopup
          visible={popupVisible}
          onClose={handleClosePopup}
          order={selectedOrder}
        />
      )}
      {downloadPopupVisible && selectedOrder && (
        <DownloadPopup
          visible={downloadPopupVisible}
          onClose={handleCloseDownloadPopup}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default Orders;
