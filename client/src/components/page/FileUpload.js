import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Avatar, Badge, Spin } from "antd";

const FileUpload = ({ images, setImages }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false); // เพิ่ม state สำหรับการโหลดภาพ

  const handleChangFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true); // ตั้งค่าโหลดเป็น true
      let allfileUpload = [...images];
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/bill",
                { image: uri },
                { headers: { authtoken: user.token } }
              )
              .then((res) => {
                allfileUpload.push(res.data);
                setImages(allfileUpload);
                toast.success("Image uploaded successfully");
              })
              .catch((err) => {
                console.log(err);
                toast.error("Image upload failed");
              })
              .finally(() => {
                setLoading(false); // ตั้งค่าโหลดเป็น false เมื่อเสร็จสิ้นการอัพโหลด
              });
          },
          "base64"
        );
      }
    } else {
      toast.error("No files selected");
    }
  };

  const handleRemove = (public_id) => {
    axios
      .post(
        process.env.REACT_APP_API + "/removebill",
        { public_id },
        { headers: { authtoken: user.token } }
      )
      .then((res) => {
        const filteredImages = images.filter((item) => item.public_id !== public_id);
        setImages(filteredImages);
        toast.success("Image removed successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove image");
      });
  };

  return (
    <>
      <br />
      {images.map((item) => (
        <span className="avatar-item" key={item.public_id}>
          <Badge
            onClick={() => handleRemove(item.public_id)}
            style={{ cursor: "pointer" }}
            count="x"
          >
            <Avatar className="m-3" src={item.url} shape="square" size={120} />
          </Badge>
        </span>
      ))}
      <hr />
      {loading ? ( // แสดง Spin ขณะกำลังโหลด
        <div className="text-center">
          <Spin tip="Uploading..." />
        </div>
      ) : (
        <div className="form-group">
          <label
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(233, 57, 139)",
              borderColor: "rgb(233, 57, 139)",
            }}
          >
            Choose File
            <input
              onChange={handleChangFile}
              className="form-control"
              type="file"
              hidden
              multiple
              accept="image/*"
              name="file"
            ></input>
          </label>
        </div>
      )}
      <br />
    </>
  );
};

export default FileUpload;
