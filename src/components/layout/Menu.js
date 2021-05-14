import { Link, useHistory } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { useContext } from 'react'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import localStorageService from '../../services/localStorageService'
import { AuthContext } from '../../context/AuthContextProvider'

function MyMenu() {
  const { user, setIsAuthenticated } = useContext(AuthContext)
  const histoty = useHistory()
  
  const handleLogout = async (e) => {
    try {
      e.preventDefault()
      localStorageService.clearToken() // service.clearToken();
      setIsAuthenticated(false)
      histoty.push('/')
    } catch (err) {
      console.dir(err)
    }
  }

  const menudropdown = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      {/* <Menu.Item key="1">
        <Link to="/calendar">Calendar</Link>
      </Menu.Item> */}
      <Menu.Item key="2">
        <Link to="/add-booking">Add Booking</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/booking-list">Booking List</Link>
      </Menu.Item>
      {user.position === 'ADMIN' && (
        <Menu.Item key="4">
          <Link to="/add-user">Add User</Link>
        </Menu.Item>
      )}
      {/* {user.position === 'ADMIN' && (
        <Menu.Item key="5">
          <Link to="/user-list">User List</Link>
        </Menu.Item>
      )} */}
      <hr style={{margin: '0'}}></hr>
      <Menu.Item key="6">
        <a href="/" onClick={handleLogout}>
          Sign Out
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="d-flex">
      <Link
        to="/profile"
        style={{
          marginBottom: '0',
          paddingRight: '0.3em',
          alignSelf: 'center',
          color: 'black'
        }}
      >
        {user.firstName}
      </Link>
      <Dropdown overlay={menudropdown} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <MenuUnfoldOutlined style={{ color: 'white', fontSize: '50px' }} />
        </a>
      </Dropdown>
    </div>
  )
}
export default MyMenu
