import Header from '../components/layout/Header'
import doge from '../assets/images/doge.jpg'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import axios from '../config/axios'
import '../css/menu.css'

function Home() {
  const menuStyle = {
    width: '300px',
    height: '270px',
    margin: '1rem',
    flex: '0 1 30%'
  }

  console.log('Home')
  const { user, setUser } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get('/users/me')
        console.log(res)
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
            justifyContent: 'space-between'
          }}
        >
          <div className="card-main">
            <div className="inner">
              <div className="front">
                <Link to="/profile">
                  <img
                    className=""
                    src={doge}
                    alt="profile"
                    style={menuStyle}
                  />
                </Link>
              </div>
              <Link to="/profile">
                <div className="back">
                  <h1>Profile</h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="card-main">
            <div className="inner">
              <div className="front">
                <Link to="/add-booking">
                  <img alt="add-booking" src={doge} style={menuStyle} />
                </Link>
              </div>
              <div className="back">
                <h1>Add Booking</h1>
              </div>
            </div>
          </div>
          <div className="card-main">
            <div className="inner">
              <div className="front">
                <Link to="/calendar">
                  <img alt="calendar" src={doge} style={menuStyle} />
                </Link>
              </div>
              <div className="back">
                <h1>Calendar</h1>
              </div>
            </div>
          </div>
          <div className="card-main">
            <div className="inner">
              <div className="front">
                <Link to="/booking-list">
                  <img alt="booking-list" src={doge} style={menuStyle} />
                </Link>
              </div>
              <div className="back">
                <h1>Booking List</h1>
              </div>
            </div>
          </div>
          {user.position === 'ADMIN' && (
            <div className="card-main">
              <div className="inner">
                <div className="front">
                  <Link to="/add-user">
                    <img alt="add-user" src={doge} style={menuStyle} />
                  </Link>
                </div>
                <div className="back">
                  <h1>Add User</h1>
                </div>
              </div>
            </div>
          )}
          {user.position === 'ADMIN' && (
            <div className="card-main">
              <div className="inner">
                <div className="front">
                  <Link to="/user-list">
                    <img alt="user-list" src={doge} style={menuStyle} />
                  </Link>
                </div>
                <div className="back">
                  <h1>User List</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
