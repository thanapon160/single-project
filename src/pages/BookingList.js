import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import Header from '../components/layout/Header'
import '../css/table.css'
import moment from 'moment'
import { useHistory } from 'react-router'
import { AuthContext } from "../context/AuthContextProvider";
import doge from '../assets/images/doge.jpg'
import profile from '../assets/images/profile.png'
import { Link } from 'react-router-dom'
import { Checkbox, message } from 'antd';

function BookingList() {
  const [bookingLists, setBookingLists] = useState([])
  const [triggerDelete, setTriggerDelete] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [roomFilter, setRoomFilter] = useState({
    gameRoom: false,
    bankRoom: false,
    palmRoom: false,
    domRoom: false,
    glaoRoom: false
  })
  const history = useHistory();
  console.log(roomFilter)
  const tablestyle = {
    borderCollapse: 'collapse',
    border: 'solid 1px',
    background: 'white'
  }
  const checkboxContainer = {
    marginLeft: '5px',
    marginTop: '5px'
  }
  const checkboxStyle = {
    fontSize: '20px'
  }
  const getAllBookingList = async () => {
    const res = await axios.get('/booking-lists')
    setBookingLists(res.data.result)
  }

  const handleDelete = async (itemId) => {
    console.log('delete')
    try {
      await axios.put(`/booking-lists/${itemId}`);
      setTriggerDelete(prev => !prev)
      message.success("Delete booking success", 5)
    } catch (err) {
      console.dir(err)
    }
  };

  useEffect(() => {
    getAllBookingList();
  }, [triggerDelete]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get('/users/me')
        console.log(res)
        setUser(res.data.user)
      } catch (err) {
        console.dir(err)
      }
    }
    getMe();
    getAllBookingList();
  }, [])

  console.log(user)
  console.log(bookingLists)

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <div className="border m-3 d-flex-column " style={{ width: '300px', height: '250px', backgroundColor: 'white' }}>
          <img alt='profile-img' src={profile} style={{ margin: '2px 0px 10px 50px', width: '200px', height: '190px', borderRadius: '100%' }}></img>
          <div className="d-flex justify-content-center">
            <Link to="/add-booking"><button type="button" class="btn btn-outline-success">Add Booking</button></Link>
          </div>
          <div style={{ width: '250px', height: '200px', backgroundColor: 'white', margin: '50px auto 0 auto', border: 'solid 1px', borderRadius: '2px' }}>
            <div style={checkboxContainer}><Checkbox style={checkboxStyle} onChange={(e) => setRoomFilter({ ...roomFilter, gameRoom: e.target.checked })}>Game Room</Checkbox></div>
            <div style={checkboxContainer}><Checkbox style={checkboxStyle} onChange={(e) => setRoomFilter({ ...roomFilter, bankRoom: e.target.checked })}>Bank Room</Checkbox></div>
            <div style={checkboxContainer}><Checkbox style={checkboxStyle} onChange={(e) => setRoomFilter({ ...roomFilter, palmRoom: e.target.checked })}>Palm Room</Checkbox></div>
            <div style={checkboxContainer}><Checkbox style={checkboxStyle} onChange={(e) => setRoomFilter({ ...roomFilter, domRoom: e.target.checked })}>Dom Room</Checkbox></div>
            <div style={checkboxContainer}><Checkbox style={checkboxStyle} onChange={(e) => setRoomFilter({ ...roomFilter, glaoRoom: e.target.checked })}>Glao Room</Checkbox></div>
          </div>
        </div >
        <table style={tablestyle}>
          <tr >
            <th>Topic</th>
            <th>Room</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Booked By</th>
            <th>Action</th>
          </tr>
          {roomFilter.gameRoom === false && roomFilter.palmRoom === false && roomFilter.bankRoom === false && roomFilter.domRoom === false && roomFilter.glaoRoom === false &&
            bookingLists.map(item =>
              user.id === item.userId && item.status === "Ready" ?
                <tr key={item.id}>
                  <td style={{ textAlign: 'center' }}>{item.title}</td>
                  <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                  <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                  <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                  <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                  <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr> :
                <tr key={item.id}>
                  <td style={{ textAlign: 'center' }}>{item.title}</td>
                  <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                  <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                  <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                  <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                  <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                  <td style={{ textAlign: 'center' }}></td>
                </tr>
            )}
          {roomFilter.gameRoom === true && bookingLists.filter(item => item.Room.name === "Game Room").map(item =>
            user.id === item.userId && item.status === "Ready" ?
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
          )}
          {roomFilter.bankRoom === true && bookingLists.filter(item => item.Room.name === "Bank Room").map(item =>
            user.id === item.userId && item.status === "Ready" ?
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
          )}
          {roomFilter.palmRoom === true && bookingLists.filter(item => item.Room.name === "Palm Room").map(item =>
            user.id === item.userId && item.status === "Ready" ?
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
          )}
          {roomFilter.domRoom === true && bookingLists.filter(item => item.Room.name === "Dom Room").map(item =>
            user.id === item.userId && item.status === "Ready" ?
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
          )}
          {roomFilter.glaoRoom === true && bookingLists.filter(item => item.Room.name === "Glao Room").map(item =>
            user.id === item.userId && item.status === "Ready" ?
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td >{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              :
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.title}</td>
                <td style={{ textAlign: 'center' }}>{item.Room.name}</td>
                <td>{String(moment(item.startDateTime).format('dddd Do MMMM YYYY'))}</td>
                <td className="time" >{String(moment(item.startDateTime).format('HH:mm'))}</td>
                <td className="time">{String(moment(item.endDateTime).format('HH:mm'))}</td>
                <td style={{ textAlign: 'center' }}>{item.User.firstName}</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
          )}

        </table>
      </div>
    </>
  )
}

export default BookingList