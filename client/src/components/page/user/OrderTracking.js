import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenubarUser from "../../layouts/MenubarUser";
import { getOrders } from "../../function/users";
import Invoice from "../../order/invoice";
import InvoiceJsPDF from "../../order/invoiceJsPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { updateStatusOrder } from "../../function/admin";

const OrderTracking = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      // เรียงลำดับ order ตามเวลาสร้างใหม่ที่สุดขึ้นก่อน
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
        loadData(); // Reload orders after status update
      })
      .catch((err) => {
        console.error("Failed to cancel order", err);
        toast.error("เกิดข้อผิดพลาดในการยกเลิกคำสั่งซื้อ");
      });
  };

  const getStatusClass = (status) => {
    return status === "Processing"
      ? "bg-warning"
      : status === "Cancelled"
      ? "bg-danger text-light"
      : status === "Completed"
      ? "bg-success text-light"
      : "";
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
            {orders.map((item, index) => (
              <div key={index} className="col-12 mb-4 d-flex justify-content-center mt-5">
                <div className="card w-100" style={{ maxWidth: "1000px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                  <div className="d-flex justify-content-end p-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(item)}
                    >
                      ยกเลิกคำสั่งซื้อ
                    </button>
                  </div>
                  <div className="text-center p-3">
                    <p className={getStatusClass(item.orderstatus)}>Order {item.orderstatus}</p>
                  </div>
                  <div className="table-responsive">
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
                            ราคาสุทธิ: <b>{item.cartTotal}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={<Invoice order={item} />}
                        fileName="invoice.pdf"
                        className="btn btn-primary m-1"
                      >
                        PDF Download
                      </PDFDownloadLink>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <InvoiceJsPDF order={item} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
