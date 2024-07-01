import React from 'react'
import jsPDF from 'jspdf'
import {font} from './THSarabun-normal'
import 'jspdf-autotable';

const InvoiceJsPDF = ({order}) => {

  const handlePDF = ()=>{
    const doc = new jsPDF()
    // add the font to jsPDF
doc.addFileToVFS("MyFont.ttf", font);
doc.addFont("MyFont.ttf", "MyFont", "normal");
doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();
    doc.text("360 HealthyShope",width/2, 10,{align:'center'});
    doc.text("วันที่ : ",width/2, 15,{align:'center'});

    let data = order.products.map((p,i)=>[p.product.title,p.price,p.count]);

    let content = {
      startY: 20,
      head: [['รายการสินค้า', 'ราคา', 'จำนวณ',]],
      body:data,
      styles:{font:'MyFont'}
    }
    // doc.autoTable({ html: '.table' })
    doc.autoTable(content)
    doc.text("ยอดรวมสุทธิ : "+order.cartTotal+"บาท",190, 70,{align:'right'});

    doc.save("a4.pdf");
  }

  return (
    <div>
      <button 
      onClick={handlePDF}
      className='btn btn-info'>jsPDF</button>
    </div>
  )
}

export default InvoiceJsPDF
