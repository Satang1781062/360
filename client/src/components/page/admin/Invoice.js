import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import fontDev from './THSarabun.ttf';
import moment from "moment/min/moment-with-locales";
import base64Logo from '../admin/logoBase64';

// Register font
Font.register({ family: 'Healthy', src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: 'Healthy',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 20, // Adjust this margin to control the space between image and text
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  addressSubTitle: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.2,
  },
  section: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center', // Center align the text in the section
  },
  text: {
    marginBottom: 5,
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10, // Adjust this margin to control the space above the table
  },
  tableRow: {
    flexDirection: "row"
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  summary: {
    textAlign: 'right',
    marginTop: 10,
  },
  addressContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  address: {
    flex: 1,
  },
  addressText: {
    marginBottom: 5,
  },
  dateText: {
    textAlign: 'right',
    marginLeft: 20, // Adjust this margin to control the space between address and date
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  signatureContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '30%',
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 12,
    marginBottom: 20,
  },
  signatureLine: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#000",
    width: '60%',
    alignSelf: 'center',
  },
  receiverText: {
    fontSize: 12,
    marginTop: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  invoiceTitleContainer: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 15,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%', // Adjust this value to make the border narrower
  }
});

const sanitizedText = (text) => {
  return typeof text === 'string' ? text.replace(/<[^>]+>/g, '') : '';
};

const Invoice = ({ order, borderColor = 'green' }) => {
  const { name, phone, email, address } = order.orderdBy.address;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            src={base64Logo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>360° HEALTHY SHOP{"\n"}
            ภายใต้บริษัท PD MARKETING INNOVATE CO.,LTD
            </Text>
            {/* <Text style={styles.title}>ภายใต้บริษัท PD MARKETING INNOVATE CO.,LTD</Text> */}
            <Text style={styles.addressSubTitle}>
              50/228 หมู่บ้านมัณฑนา พระรามเก้าศรีนครินทร์{"\n"}
              ซอยหรุงเทพกรีฑา7 แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240{"\n"}
              เลขที่ 0105563047244 Tel:020964499{"\n"}
              Email: pd.marketinginnovate@gmail.com
            </Text>
          </View>
        </View>

        <View style={[styles.invoiceTitleContainer, { borderColor }]}>
          <Text style={styles.title}>ใบกำกับภาษี / ใบเสร็จรับเงิน</Text>
          <Text style={styles.title}>TAX INVOICE / RECEIPT</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.address}>
            <Text>ที่อยู่จัดส่ง:</Text>
            <Text style={styles.addressText}>ชื่อผู้รับ: {sanitizedText(name)}</Text>
            <Text style={styles.addressText}>โทรศัพท์: {sanitizedText(phone)}</Text>
            <Text style={styles.addressText}>อีเมล: {sanitizedText(email)}</Text>
            <Text style={styles.addressText}>ที่อยู่จัดส่ง: {sanitizedText(address)}</Text>
          </View>
          <Text style={styles.dateText}>{moment(Date.now()).locale('th').format('LL')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>หมายเลขคำสั่งซื้อ: {order.orderNumber}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>รายการสินค้า</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>จำนวนสินค้า</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ราคาสินค้า</Text>
              </View>
            </View>

            {order.products.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{sanitizedText(item.product.title)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.count}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.summary}>ราคาสุทธิ: {order.cartTotal} บาท</Text>
        </View>

        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>
              ได้รับสินค้าตามรายการข้างบนไว้เรียบร้อยแล้ว
            </Text>
            <Text style={styles.receiverText}>ผู้รับสินค้า ......................................................</Text>
            <Text style={styles.receiverText}>วันที่...............................................................</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>
              ช่องเพิ่มเติมสำหรับข้อมูลอื่นๆ
            </Text>
            <Text style={styles.receiverText}>ผู้ส่งสินค้า ......................................................</Text>
            <Text style={styles.receiverText}>วันที่...............................................................</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>
              ในนาม บริษัท พีดีมาร์เก็ตติง อินโนเวท จํากัด
            </Text>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>ผู้มีอํานาจลงนาม</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
