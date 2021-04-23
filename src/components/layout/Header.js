import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContextProvider';
import Menu from './Menu';
import Logo from './Logo'

function Header() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <nav className="nav-main d-flex align-items-center justify-content-between" style={{ backgroundColor: "#21BC38" }}>
      <Logo/>
      {isAuthenticated && <Menu />}
    </nav>
  )
}

export default Header