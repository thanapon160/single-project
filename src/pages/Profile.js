import Header from '../components/layout/Header'
import UserBar from '../components/user/UserBar'
import UserProfile from '../components/user/UserProfile'
import UserBookingInfo from '../components/user/UserBookingInfo'

function Profile() {
  console.log('Profile')

  return (
    <>
      <Header />
      <div className="d-flex">
        <UserBar />
        <UserProfile />
      </div>
      <UserBookingInfo />
      
    </>
  )
}

export default Profile