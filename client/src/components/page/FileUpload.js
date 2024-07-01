import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangFile = (e) => {
    const files = e.target.files;
    if (files) {
      let allfileUpload = values.images;
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
                setValues({ images: allfileUpload });
                toast.success("Image uploaded successfully");
              })
              .catch((err) => {
                console.log(err);
                toast.error("Image upload failed");
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
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removebill",
        { public_id },
        { headers: { authtoken: user.token } }
      )
      .then((res) => {
        let filterImages = images.filter((item) => item.public_id !== public_id);
        setValues({ images: filterImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <br />
      {values.images &&
        values.images.map((item) => (
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
      <div className="form-group">
        <label className="btn btn-primary">
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
      <br />
    </>
  );
};

export default FileUpload;
