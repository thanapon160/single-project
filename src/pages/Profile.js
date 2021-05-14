import Header from '../components/layout/Header'
import UserBar from '../components/user/UserBar'
import UserProfile from '../components/user/UserProfile'
import UserBookingInfo from '../components/user/UserBookingInfo'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

function Profile() {
  console.log('Profile')
  const { user } = useContext(AuthContext)
  console.log(user)
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