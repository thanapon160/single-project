import axios from "axios";
import moment from "moment";
import { useEffect, useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContextProvider";
import doge3 from '../../assets/images/doge3.png';
import { message } from "antd";

function UserBookingInfo() {
  let history = useHistory()
  const [bookingListById, setBookingListById] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const { user } = useContext(AuthContext);
  const getBooking = async () => {
    try {
      const bookingList = await axios.get(`/booking-lists/${user.id}`);
      setBookingListById(bookingList.data.result);
    } catch (err) {
      console.dir(err)
    }
  };

  useEffect(() => {
    getBooking();
  }, [user]);

  useEffect(() => {
    getBooking();
  }, [triggerDelete]);

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

  return (
    <>
      <div style={{ marginLeft: '22%', display: 'flex', gap: '5%', width: '72%', flexWrap: 'wrap' }}>
        {bookingListById.map(item =>         
         item.status !== 'Deactivate' && 
         <div key={item.id} style={{ padding: '8px', position: 'relative', border: 'solid', flex: '0 1 30%', borderRadius: '10px', boxShadow: '8px 8px 6px grey', marginBottom: '5%' }}>
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Room:</strong> {item.Room.name}</p>
          <p><strong>Participnat:</strong> {item.participantNumber}</p>
          <p><strong>Date:</strong> {String(moment(item.startDateTime).format('dddd YYYY-MM-DD'))}</p>
          <p><strong>Start Time:</strong> {String(moment(item.startDateTime).format('HH:mm'))}</p>
          <p><strong>End Time:</strong> {String(moment(item.endDateTime).format('HH:mm'))}</p>
          <img src={doge3} alt="doge3" style={{position: 'absolute', width: '200px', height: '200px', top: '-20px', right: '-20px'}}></img>
          <button style={{ borderRadius: '20px' }} onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
          <button onClick={() => {handleDelete(item.id)}} style={{ borderRadius: '20px' }}>Delete</button>
        </div>)}
      </div>
    </>
  )
}

export default UserBookingInfo