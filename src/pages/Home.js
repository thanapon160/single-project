import Header from '../components/layout/Header'
import doge from '../assets/images/doge.jpg'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import axios from '../config/axios'
import '../css/menu.css'
import profile from '../assets/images/profile.png'
import addUser from '../assets/images/addUser.png'
import userList from '../assets/images/userList.png'
import addBooking from '../assets/images/addbooking.png'
import bookingList from '../assets/images/bookinglist.png'

function Home() {
  const menuStyle = {
    width: '300px',
    height: '270px',
    flex: '0 1 30%'
  }
  const title = {
    marginTop: '38%'
  }
  console.log('Home')
  const { user, setUser } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get('/users/me')
        setUser(res.data.user)
        history.push('/')
      } catch (err) {
        console.dir(err)
      }
    }
    getMe()
  }, [])

  return (
    <>
      <Header />
      <div className="d-flex">
        <div
          className="d-flex"
          style={{
            flexWrap: 'wrap',
            margin: '5rem auto',
            width: '1200px',
            justifyContent: 'space-evenly'
          }}
        >
          <div className="card-main">
            <div className="inner">
              <Link to="/profile">
                <div className="front">
                  <img
                    className=""
                    src={profile}
                    alt="profile"
                    style={menuStyle}
                  />
                </div>
                <div className="back">
                  <h1 style={title}>Profile</h1>
                </div></Link>
            </div>
          </div>
          <div className="card-main">
            <div className="inner">
              <Link to="/add-booking">
                <div className="front">
                  <img alt="add-booking" src={addBooking} style={menuStyle} />
                </div>
                <div className="back">
                  <h1 style={title}>Add Booking</h1>
                </div></Link>
            </div>
          </div>
          {/* <div className="card-main">
            <div className="inner"><Link to="/calendar">
              <div className="front">
                <img alt="calendar" src={doge} style={menuStyle} />
              </div>
              <div className="back">
                <h1 style={title}>Calendar</h1>
              </div></Link>
            </div>
          </div> */}
          <div className="card-main">
            <div className="inner">
              <Link to="/booking-list">
                <div className="front">
                  <img alt="booking-list" src={bookingList} style={menuStyle} />
                </div>
                <div className="back">
                  <h1 style={title}>Booking List</h1>
                </div></Link>
            </div>
          </div>
          {user.position === 'ADMIN' && (
            <div className="card-main">
              <div className="inner"><Link to="/add-user">
                <div className="front">
                  <img alt="add-user" src={addUser} style={menuStyle} />
                </div>
                <div className="back">
                  <h1 style={title}>Add User</h1>
                </div></Link>
              </div>
            </div>
          )}
          {user.position === 'ADMIN' && (
            <div className="card-main">
              <div className="inner"><Link to="/user-list">
                <div className="front">
                  <img alt="user-list" src={userList} style={menuStyle} />
                </div>
                <div className="back">
                  <h1 style={title}>User List</h1>
                </div></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
