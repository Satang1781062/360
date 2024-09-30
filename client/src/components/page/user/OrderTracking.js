import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenubarUser from "../../layouts/MenubarUser";
import { getOrders } from "../../function/users";
import InvoiceJsPDF from "../../order/invoiceJsPDF";
import { updateStatusOrder } from "../../function/admin";
import DownloadPopup from "./DownloadPopup";
import { Tabs, Table, Button, Input, Pagination } from "antd";

const OrderTracking = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [downloadPopupVisible, setDownloadPopupVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // สำหรับบันทึกหน้าปัจจุบัน
  const ordersPerPage = 10; // จำนวนคำสั่งซื้อที่จะแสดงต่อหน้า

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      const sortedOrders = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOrders(sortedOrders);
    });
  };

  const handleCancelOrder = (order) => {
    if (order.orderstatus === "Completed") {
      toast.warning("คำสั่งซื้อที่เสร็จสมบูรณ์ไม่สามารถยกเลิกได้");
      return;
    }

    updateStatusOrder(user.token, order._id, "Cancelled")
      .then((res) => {
        toast.success("ยกเลิกคำสั่งซื้อสำเร็จ");
        loadData(); 
      })
      .catch((err) => {
        console.error("ล้มเหลวในการยกเลิกคำสั่งซื้อ", err);
        toast.error("เกิดข้อผิดพลาดในการยกเลิกคำสั่งซื้อ");
      });
  };

  const handleOpenDownloadPopup = (order) => {
    setSelectedOrder(order);
    setDownloadPopupVisible(true);
  };

  const handleCloseDownloadPopup = () => {
    setDownloadPopupVisible(false);
  };

  const getStatusClass = (status) => {
    return status === "Processing"
      ? "bg-warning"
      : status === "Cancelled"
      ? "bg-danger text-light"
      : status === "Completed"
      ? " text-success"
      : "";
  };

  // คำนวณรายการคำสั่งซื้อสำหรับหน้าปัจจุบัน
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // ฟังก์ชันการเปลี่ยนหน้า
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row justify-content-center mt-5">
            <h4>ติดตามคำสั่งซื้อ</h4>

            {currentOrders.map((item, index) => (
              <div
                key={index}
                className="col-12 mb-4 d-flex justify-content-center mt-5"
              >
                <div
                  className="card w-100"
                  style={{
                    maxWidth: "1000px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="d-flex justify-content-end p-3">
                    <button
                      className="btn bg-danger text-light "
                     
                      onClick={() => handleCancelOrder(item)}
                    >
                      ยกเลิกคำสั่งซื้อ
                    </button>
                  </div>
                  <div className="text-center p-3">
                    <p className={getStatusClass(item.orderstatus)}>
                      สถานะคำสั่งซื้อ {item.orderstatus}
                    </p>
                    <p>
                      หมายเลขคำสั่งซื้อ:{" "}
                      {item.orderNumber ? item.orderNumber : "ไม่มีหมายเลข"}
                    </p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ชื่อสินค้า</th>
                          <th>ราคา</th>
                          <th>จำนวน</th>
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
                            ราคาสุทธิ: <b>{item.cartTotal}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mt-3 mb-4">
                        <button className="btn me-3"
    style={{ backgroundColor: "#5a735e", color: "#fff" }}
                          onClick={() => {
                            if (item.orderstatus === "Completed") {
                              handleOpenDownloadPopup(item);
                            } else {
                              toast.warning(
                                "กรุณารอสินค้ายืนยัน Completed ก่อนดาวน์โหลดใบกำกับสินค้า"
                              );
                            }
                          }}
                        >
                          ดาวน์โหลดใบกำกับสินค้า
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="mt-4">
              <Pagination
                current={currentPage}
                total={orders.length}
                pageSize={ordersPerPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

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

export default OrderTracking;
