import axios from "axios";
import moment from "moment";
import { useEffect, useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContextProvider";


function UserBookingInfo() {
  let history = useHistory()
  const [bookingListById, setBookingListById] = useState([]);
  const { user } = useContext(AuthContext);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const getBooking = async () => {
    try {
      const bookingList = await axios.get(`/booking-lists/${user.id}`);
      console.log(bookingList)
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
    console.log(itemId)
    try {
      await axios.put(`/booking-lists/${itemId}`);
      setTriggerDelete(prev => !prev)
    } catch (err) {
      console.dir(err)
    }
  };

  console.log(bookingListById)

  return (
    <>
      <div style={{ marginLeft: '22%', display: 'flex', gap: '5%', width: '72%', flexWrap: 'wrap' }}>
        {bookingListById.map(item =>         
         item.status !== 'Deactivate' && <div key={item.id} style={{ padding: '8px', border: 'solid', flex: '0 1 30%', borderRadius: '10px', boxShadow: '8px 8px 6px grey', marginBottom: '5%' }}>
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Room:</strong> {item.Room.name}</p>
          <p><strong>Participnat:</strong> {item.participantNumber}</p>
          <p><strong>Date:</strong> {String(moment(item.startDateTime).format('dddd YYYY-MM-DD'))}</p>
          <p><strong>Start Time:</strong> {String(moment(item.startDateTime).format('HH:mm'))}</p>
          <p><strong>End Time:</strong> {String(moment(item.endDateTime).format('HH:mm'))}</p>
          <img src="" alt=""></img>
          <button style={{ borderRadius: '20px' }} onClick={function () { history.push("/edit-booking/" + item.id) }}>Edit</button>
          <button onClick={() => handleDelete(item.id)} style={{ borderRadius: '20px' }}>Delete</button>
        </div>)}
      </div>
    </>
  )
}

export default UserBookingInfo