import Header from '../components/layout/Header';
import Login from '../components/auth/Login';

function Auth() {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '10%' }}>
        <h1 className="text-center m-4" style={{ color: '#2C4F71' }}>
          Welcome to Booking Web <br />
        </h1>
        <div className=" d-flex justify-content-center">
          <Login />
        </div>
      </main>
    </>
  );
}

export default Auth;
