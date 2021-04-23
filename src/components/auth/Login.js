import { useContext, useState } from "react";
import axios from '../../config/axios';
import { useHistory, Link } from "react-router-dom";
import localStorageService from "../../services/localStorageService";
import { AuthContext } from '../../context/AuthContextProvider'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);

  const validateInput = () => {
    const newError = {};
    if (!email) newError.email = "email is required";
    if (!password) newError.password = "password is required";
    setError(newError);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validateInput();
      const res = await axios.post("/login", {
        email,
        password,
      });
      console.log(res)
      localStorageService.setToken(res.data.token);
      setIsAuthenticated(true)
      history.push("/");
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <>
      <div className="col-md-4 d-flex flex-column justify-content-center ">
        <h4 style={{ color: '#27D6C9' }}>ลงชื่อเข้าสู่ระบบ</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            {error.email && (
              <span className="help-block" style={{ color: "red" }}>
                {error.email}
              </span>
            )}
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {error.password && (
              <span className="help-block" style={{ color: "red" }}>
                {error.password}
              </span>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn" style={{ backgroundColor: '#9FB3D3' }}>Submit</button>
          </div>
        </form>
              
        <div className="d-flex justify-content-center">
          <Link to="/home">
          <img src="https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg" alt="doge" style={{ marginTop: "40px" }} ></img>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
