import React, { useState, useEffect } from "react";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../function/users";

import "./ManageAdmin.css"; // นำเข้าไฟล์ CSS ที่สร้างขึ้น

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  // ข้อมูลในตาราง ต้นฉบับ
  const [data, setData] = useState([]);
  console.log("data", data);
  // ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([]);
  //ข้อมูลที่ใช้ loop ใน dropdown
  const [drop, setDrop] = useState([])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
        setSelectData(res.data);
        // [...new Set(array)]
        const dataDrop =  [...new Set(res.data.map(item=> item.role))] 
        setDrop(dataDrop)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handlechangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };

    changeRole(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const roleData = ["admin", "user"];
  const handleSelectRole = (e) => {
    const value = e.target.value;
    if (value == "all") {
      setSelectData(data);
    } else {
      const filterData = data.filter((item,index) => {
        return item.role == value
      });
      setSelectData(filterData);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-10">
          <div className="Manage">
            <h3>ManageAdmin </h3>
            <select onChange={(e) => handleSelectRole(e)}>
              <option value="all">all</option>
              {drop.map((item,index)=>
                <option key={index} value={item}>{item}</option>
              )}
            </select>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">username</th>
                  <th scope="col">role</th>
                  <th scope="col">status</th>
                  <th scope="col">created</th>
                  <th scope="col">updated</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {selectData.map((item, index) => (
                  <tr>
                    <th scope="row">{item.username}</th>
                    <td>
                      <Select
                        style={{ width: "100%" }}
                        value={item.role}
                        onChange={(e) => handlechangeRole(e, item._id)}
                      >
                        {roleData.map((item, index) => (
                          <Select.Option value={item} key={index}>
                            {item == "admin" ? (
                              <Tag color="pink">{item}</Tag>
                            ) : (
                              <Tag color="green">{item}</Tag>
                            )}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Switch
                        checked={item.enabled}
                        onChange={(e) => handleOnchange(e, item._id)}
                      />
                    </td>
                    <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                    <td>
                      {moment(item.updatedAt)
                        .locale("th")
                        .startOf(item.updatedAt)
                        .fromNow()}
                    </td>

                    <td>
                      <DeleteOutlined onClick={() => handleRemove(item._id)} />
                      <EditOutlined onClick={() => showModal(item._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password :</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
