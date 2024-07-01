import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";

import fontDev from './THSarabun.ttf';

// Register font
Font.register({ family: 'Healthy', src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: 'Healthy',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: '30%',
    height: 'auto',
    maxWidth: 500, // Adjust this value as needed
    maxHeight: 500, // Adjust this value as needed
    marginBottom: 20,
    objectFit: 'contain',
    alignSelf: 'center',
    marginTop: 50, // Adjust this value to set distance from the top
  },
  text: {
    fontSize: 14,
  }
});

const InvoiceBill = ({ order }) => {
    return (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.text}>หลักฐานการชำระเงิน</Text>
              {order.images && order.images.length > 0 ? (
                order.images.map((image, index) => {
                  const imageUrl = typeof image === 'string' ? image : image.url; // ปรับการดึง URL ตามโครงสร้างของ object
                  console.log(`Image URL ${index}: ${imageUrl}`);
                  return <Image key={index} style={styles.image} src={imageUrl} />;
                })
              ) : (
                <Text style={styles.text}>ไม่มีหลักฐาน</Text>
              )}
            </View>
          </Page>
        </Document>
      );
};

export default InvoiceBill;
