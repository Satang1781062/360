import React from 'react'

import { Card } from 'antd';
import { EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Product.css'
const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    console.log(product)
    const{ _id,title,description,images } = product
    const shortenedDescription = description.slice(0, 20);
  return (
    <Card
    hoverable
    className='product-card' // ใช้คลาสที่ประกาศไว้ใน styles.css
    cover={<img 
        className='p-1'
        style={{ height: '250px', width: '100%', objectFit: 'cover' }}
        alt="example" 
        src={images && images.length
            ? images[0].url
            :""
        } 
        />}
        actions={[
            <Link to={"/admin/update-product/"+_id}>
            <EditOutlined className='text-warning' />
            </Link>,
            <DeleteOutlined 
            onClick={()=> handleRemove(_id)}
            className='text-danger'/>
          ]}
  >
    <Meta title={title} description={shortenedDescription} /> {/* ใช้คำอธิบายที่ถูกตัดแล้ว */}
  </Card>
  )
}

export default AdminProductCard
