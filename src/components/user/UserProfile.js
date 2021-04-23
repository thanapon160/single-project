import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from '../../config/axios';

function UserProfile() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get('/users/me');
        setUser(res.data.user);
      } catch (err) {
        console.dir(err)
      };
    }
    getMe();
  }, []);

  return (
    <div className="m-3 p-3" style={{ width: '72%', border: '3px solid', borderRadius: '10px', boxShadow:'8px 8px 6px grey', }}>
      Hello Mother Fucker
      <p><strong>Firstname:</strong> {user.firstName}</p>
      <p><strong>Lastname:</strong> {user.lastName}</p>
      <p><strong>Position:</strong> {user.position}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}

export default UserProfile