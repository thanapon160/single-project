import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className="navbar-header">
      <Link to="/" className="fs-3 navbar-brand" style={{ color: "white" }}>Booking Room</Link>
    </div>
  );
}

export default Logo;
