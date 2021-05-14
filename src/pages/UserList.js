import Header from '../components/layout/Header'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../context/AuthContextProvider";
import '../css/table.css'
import axios from 'axios'
import { Modal, Button, Input, Space, Form } from 'antd'
import { Select } from 'antd';

function UserList() {
  console.log('UserList')
  const [userLists, setUserLists] = useState([]);
  const [position, setPosition] = useState([])
  const { user, setUser } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    position: "",
    isActive: ""
  });
  const [isModalVisibleEditUserInfo, setIsModalVisibleEditUserInfo] = useState(false);

  const { Option } = Select;
  const tdStyle = {
    textAlign: 'center', wordBreak:'break-all', height: '80px'
  }
  const showModalEditUserInfo = async (userId) => {
    try {
      const res = await axios.get(`/admin/user-lists/${userId}`);
      await setUserInfo(res.data.result)
      setIsModalVisibleEditUserInfo(true);
    } catch (err) {
      console.dir(err)
    }
  };

  const getAllUserList = async () => {
    try {
      const users = await axios.get('/admin/user-lists')
      setUserLists(users.data.result)
    } catch (err) {
      console.dir(err)
    }
  }

  const handleCancel = () => {
    setIsModalVisibleEditUserInfo(false);
  };
  const handleDelete = async (userId) => {
    console.log('delete')
    try {
      await axios.put(`/admin/user-lists/${userId}`);
      getAllUserList();
    } catch (err) {
      console.dir(err)
    }
  };
  const handleSubmit = async (userId) => {
    try {
      await axios.put(`/admin/${userId}`)
      getAllUserList();
      setIsModalVisibleEditUserInfo(false);
    } catch (err) {
      console.dir(err)
    }
  }

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get('/users/me')
        setUser(res.data.user)
      } catch (err) {
        console.dir(err)
      }
    }
    const getPosition = async () => {
      try {
        const res = await axios.get('/positions')
        setPosition(res.data.position)
      } catch (err) {
        console.dir(err)
      }
    }
    getMe();
    getPosition();
    getAllUserList();
  }, [])
  return (
    <>
      <Header />
      <Modal type="primary" title="Edit User Info" visible={isModalVisibleEditUserInfo} onOk={() => handleSubmit(userInfo.id)} onCancel={handleCancel}>
        <Space direction="vertical">
          <div>Firstname:</div><Input placeholder="Firstname" value={userInfo.firstName} onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} />
          <div>Lastname:</div><Input placeholder="Lastname" value={userInfo.lastName} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} />
          <div>Mobile:</div><Input placeholder="Mobile" value={userInfo.mobile} onChange={(e) => setUserInfo({ ...userInfo, mobile: e.target.value })} />
          <div>Position:</div>
          <Select style={{ width: 100 }} defaultValue={userInfo?.Position?.name} onChange={(value) => setUserInfo({ ...userInfo, position: value })}>
            {position.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
          </Select>
          <div>Status:</div>
          <Select style={{ width: 100 }} value={userInfo.isActive} onChange={(value) => setUserInfo({ ...userInfo, isActive: value })}>
            <Option key="active" value="ACTIVATE">Active</Option>
            <Option key="deactive" value="DEACTIVATE">Deactive</Option>
          </Select>
        </Space>
      </Modal>
      <table stlye={{ borderCollapse: 'collapse', border: 'solid 1px' }}>
        <tr >
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Position</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {userLists.map(item =>
          item.isActive === "Ready" ?
            <tr key={item.id}>
              <td style={tdStyle}>{item.firstName}</td>
              <td style={tdStyle}>{item.lastName}</td>
              <td style={tdStyle}>{item.email}</td>
              <td style={tdStyle}>{item.mobile}</td>
              <td style={tdStyle}>{item.Position.name}</td>
              <td style={tdStyle}>{item.isActive}</td>
              <td style={tdStyle}>
                <Button onClick={() => showModalEditUserInfo(item.id)}>Edit</Button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
            :
            <tr key={item.id}>
              <td style={tdStyle}>{item.firstName}</td>
              <td style={tdStyle}>{item.lastName}</td>
              <td style={tdStyle}>{item.email}</td>
              <td style={tdStyle}>{item.mobile}</td>
              <td style={tdStyle}>{item.Position.name}</td>
              <td style={tdStyle}>{item.isActive}</td>
              <td style={tdStyle}>
                <Button onClick={() => showModalEditUserInfo(item.id)}>Edit</Button>
              </td>
            </tr>
        )}
      </table>
    </>
  )
}

export default UserList