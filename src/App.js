import './App.css';
import { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import BookingList from './pages/BookingList';
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';
import { AuthContext } from './context/AuthContextProvider';

const privateRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/booking-list',
    component: BookingList
  },
  {
    path: '/add-user',
    component: AddUser
  },
  {
    path: '/add-booking',
    component: AddBooking
  },
  {
    path: '/edit-booking/:bookingId',
    component: EditBooking
  },
  {
    path: '/calendar',
    component: Calendar
  },
  {
    path: '/user-list',
    component: UserList
  },
]
const publicRoutes = [
  {
    path: '/',
    component: Auth
  }
]

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Switch>
      {isAuthenticated && privateRoutes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
      {!isAuthenticated && publicRoutes.map((route, index) => <Route key={index} exact path={route.path} component={route.component} />)}
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
