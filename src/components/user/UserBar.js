import doge from '../../assets/images/doge.jpg'
import profile from '../../assets/images/profile.png'
import { Link } from 'react-router-dom'

function UserBar() {
  return (
    <div className="border m-3 d-flex-column justify-content-center" style={{ width: '300px', height: '250px', backgroundColor: 'white' }}>
      <img alt='profile-img' src={profile} style={{ margin: '2px 0px 10px 50px', width: '200px', height: '190px', borderRadius: '100%' }}></img>
      <div className="d-flex justify-content-center">
        <Link to="/add-booking"><button type="button" class="btn btn-outline-success">Add Booking</button></Link>
      </div>
    </div >
  )
}

export default UserBar