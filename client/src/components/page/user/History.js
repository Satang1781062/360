import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layouts/MenubarUser";

//function
import { getOrders } from "../../function/users";
import Invoice from "../../order/invoice";
import InvoiceJsPDF from "../../order/invoiceJsPDF";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";



const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
  };
  console.log('OOOO',orders);
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row justify-content-center">
            <h4>History ประวัติการสั่งซื้อ</h4>
            {orders.map((item, index) => (
              <div key={index} className="col-12 mb-4 d-flex justify-content-center">
                <div className="card w-100" style={{ maxWidth: "1000px" }}>
                  <p>Order {item.orderstatus}</p>
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
                  <div className="row">
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

export default History;
