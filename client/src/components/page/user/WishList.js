import React, {useState, useEffect} from 'react'
import MenubarUser from '../../layouts/MenubarUser'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'

import { Link } from 'react-router-dom'

//function
import  { getWishlist, removeWishlist } from '../../function/users'

const WishList = () => {
    const [wishlist, setWishList] = useState([])
    const {user} = useSelector((state)=>({...state}))
    
    useEffect(()=>{
        loadData()
    },[])

    const loadData = () =>{
        getWishlist(user.token)
        .then(res=>{
            setWishList(res.data.wishlist)
        })
    }
    console.log(wishlist)

    const handleRemove =(productId)=>{
        removeWishlist(user.token,productId)
        .then(res=>{
            console.log(res.data)
            loadData()
        })
    }
    return (
        <div>
        <div className="row">
          <div className="col-md-2">
            <MenubarUser />
          </div>
          <div className="col">
            
            <div className="row">
              <h1>WishList Page</h1>
              {wishlist.map((item,index)=>
                <div key={index}className='alert alert-secondary'>
                    <Link to={"/product/"+item._id}
                    >{item.title}</Link>
                    <span
                    onClick={()=> handleRemove(item._id)}
                    style={{float:'right'}}>ลบ</span>
                </div>
            )}
            </div>
          </div>
        </div>
      </div>
      )
}

export default WishList
