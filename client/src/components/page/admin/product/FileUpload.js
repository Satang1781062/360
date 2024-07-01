import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import { Avatar, Badge, Space } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = values.images; //[]
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
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allfileUpload.push(res.data);
                console.log("allfileUpload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });
                toast.success("Image uploaded successfully");
              })
              .catch((err) => {
                setLoading(false);
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
    setLoading(true)
    console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        let filterImages = images.filter(item=>{
          return item.public_id !== public_id
        })
        setValues({...values,images:filterImages })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <>
      <br />
      {values.images &&
        values.images.map((item) => (
          <span className="avatar-item">
            <Badge
              onClick={() => handleRemove(item.public_id)}
              style={{ cursor: "pointer" }}
              count="x"
            >
              <Avatar
                className="m-3"
                src={item.url}
                shape="square"
                size={120}
              />
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
