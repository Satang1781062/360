import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

import fontDev from './THSarabun.ttf';
import moment from "moment/min/moment-with-locales";

// Register font
Font.register({ family: 'Healthy', src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: 'Healthy',
    textAlign: 'center'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  summary:{
    textAlign:'right'
  }
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>360 HealthyShope</Text>
          <Text>{moment(Date.now()).locale('th').format('LL')}</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>รายการสินค้า</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ราคาสินค้า</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>จำนวนสินค้า</Text>
              </View>
            </View>

            {order.products.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.product.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.count}</Text>
                </View>
              </View>
            ))}
            
          </View>
          <Text style={styles.summary}>ราตารวมสุทธิ: {order.cartTotal} บาท</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
