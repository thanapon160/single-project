import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'

function BookingList() {
  const [bookingLists, setBookingLists] = useState([])

  useEffect(() => {
    const getAllBookingList = async () => {
      const res = await axios.get('/booking-lists')
      setBookingLists(res.data.result)
    }
    getAllBookingList();
  }, [])

  return (
    <Header/> 
  )
}

export default BookingList