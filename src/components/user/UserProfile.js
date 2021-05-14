import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from '../../config/axios';
import { Modal, Button, Input, Space, message } from 'antd'

function UserProfile() {
  const { user, setUser } = useContext(AuthContext)
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [editInfo, setEditInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: ""
  })
  const [isModalVisibleChangePassword, setIsModalVisibleChangePassword] = useState(false);
  const [isModalVisibleEditInfo, setIsModalVisibleEditInfo] = useState(false);
  const showModalChangePassword = () => {
    setIsModalVisibleChangePassword(true);
  };
  const showModalEditInfo = () => {
    setIsModalVisibleEditInfo(true);
  };
  const getMe = async () => {
    try {
      const res = await axios.get('/users/me');
      setUser(res.data.user);
    } catch (err) {
      console.dir(err)
    };
  };
  const handleCancel = () => {
    setIsModalVisibleEditInfo(false);
    setIsModalVisibleChangePassword(false);
  };
  const handleEditInfo = async (e) => {
    try {
      e.preventDefault()
      await axios.put('/users', editInfo)
      getMe();
      setIsModalVisibleEditInfo(false);
      message.success("Profile change success", 5)
    } catch (err) {
      console.dir(err)
    }
  }
  const handleChangePassword = async (e) => {
    try {
      e.preventDefault()
      await axios.put('/users/change-password', password)
      setIsModalVisibleChangePassword(false);
      message.success("Password change success", 5)
    } catch (err) {
      console.dir(err)
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="m-3 p-3" style={{ width: '72%', border: '3px solid', borderRadius: '10px', boxShadow: '8px 8px 6px grey', position: 'relative' }}>
      Hello Mother Fucker
      <p><strong>Firstname:</strong> {user.firstName}</p>
      <p><strong>Lastname:</strong> {user.lastName}</p>
      <p><strong>Position:</strong> {user.position}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div style={{ position: 'absolute', right: 160, bottom: 10, borderRadius: '10px' }}>
        <Button type="primary" onClick={showModalEditInfo}>
          Edit Info
        </Button>
        <Modal title="Edit Info" visible={isModalVisibleEditInfo} onOk={handleEditInfo} onCancel={handleCancel}>
          <Space direction="vertical">
            <div>Firstname:</div><Input placeholder="Firstname" defaultValue={user.firstName} value={editInfo.firstName} onChange={(e) => setEditInfo({ ...editInfo, firstName: e.target.value })} />
            <div>Lastname:</div><Input placeholder="Lastname" defaultValue={user.lastName} value={editInfo.lastName} onChange={(e) => setEditInfo({ ...editInfo, lastName: e.target.value })} />
            <div>Mobile:</div><Input placeholder="Mobile" defaultValue={user.mobile} value={editInfo.mobile} onChange={(e) => setEditInfo({ ...editInfo, mobile: e.target.value })} />
          </Space>
        </Modal>
      </div>
      <div style={{ position: 'absolute', right: 10, bottom: 10, borderRadius: '10px' }}>
        <Button danger onClick={showModalChangePassword}>
          Change password
        </Button>
        <Modal title="Change password" visible={isModalVisibleChangePassword} onOk={handleChangePassword} onCancel={handleCancel}>
          <Space direction="vertical">
            <div>Old Password:</div><Input.Password placeholder="old password" value={password.oldPassword} onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} />
            <div>New Password:</div><Input.Password placeholder="new password" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
            <div>Confirm New Password:</div><Input.Password placeholder="confirm new password" value={password.confirmNewPassword} onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })} />
          </Space>
        </Modal>
      </div>
    </div>
  )
}

export default UserProfile