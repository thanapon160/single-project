import doge from '../../assets/images/doge.jpg'
import { Link } from 'react-router-dom'

function UserBar() {
  const handleAddBooking = async (e) => {
    try {
      console.log('Add')
    } catch (err) {
      console.dir(err)
    }
  }
  return (
    <div className="border m-3 d-flex-column " style={{ width: '300px', height: 'auto', backgroundColor: 'white' }}>
      <img alt='profile-img' src={doge} style={{ marginBottom: '20px', width: '300px', height: 'auto' }}></img>
      <div className="d-flex justify-content-center">
        <Link to="/add-booking"><button type="button" class="btn btn-outline-success" onClick={handleAddBooking}>Add Booking</button></Link>
      </div>
    </div >
  )
}

export default UserBar