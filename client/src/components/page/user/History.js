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
          <div className="row">
            <h4>History ประวัติการสั่งซื้อ</h4>
            {/* 1 Loop Order Card */}
            {orders.map((item, index) => {
              console.log("item", item);
              return (
                <div key={index} className="card m-3">
                  <p>Order {"" + item.orderstatus}</p>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                      </tr>
                    </thead>
                    {item.products.map((p, i) => (
                      <tr>
                        <td>{p.product.title}</td>
                        <td>{p.price}</td>
                        <td>{p.count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        ราคาสุทธิ : <b>{item.cartTotal}</b>
                      </td>
                    </tr>
                  </table>

                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={
                          <Invoice order={item}/>
                        }
                        fileName="invoice.pdf"
                        className="btn btn-primary m-1"
                      >
                        PDF Download
                      </PDFDownloadLink>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InvoiceJsPDF order={item}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
