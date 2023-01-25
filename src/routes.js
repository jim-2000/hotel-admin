import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import EmployePage from './pages/EmployePage';
import RoomPage from './pages/RoomPage';
import RoomdetailsPage from './pages/RoomdetailsPage';
import CreateRoom from './pages/CreateRoom';
import PrivatePage from './pages/PrivatePage';
import { useSelector } from 'react-redux';
import UpdateHotel from './pages/UpdatehotelPage';
import CreateHotel from './pages/createHotel';
import Hotelpage from './pages/hotelpage';
import UpdateRoom from './components/form/CURoom';
import BookingPage from './pages/BookingPage';
import CreateBooking from './pages/CreateBooking';
import CheckCalender from './pages/CheckCalender';
import SignUpPage from './pages/SignupPage';

// ----------------------------------------------------------------------

export default function Router() {
  const {user} = useSelector((state)=>state.auth);   

  const routes = useRoutes(
    [
      {
        path: '/dashboard',
        element: user ? <DashboardLayout /> : <SimpleLayout />,    
        children: [
          { element: <Navigate to={user ?"/dashboard/app" : "login"} />, index: true },
          { path: 'app', element: <PrivatePage><DashboardAppPage /></PrivatePage> },
          { path: 'user', element: <PrivatePage><UserPage /></PrivatePage>  },
          { path: 'employe', element: <PrivatePage><EmployePage /></PrivatePage>  },
          { path: 'hotel', element: <PrivatePage> <Hotelpage /> </PrivatePage> },
          { path: 'updatehotel', element: <PrivatePage> <UpdateHotel /> </PrivatePage> },
          { path: 'createhotel', element: <PrivatePage> <CreateHotel /> </PrivatePage> },
          { path: 'room', element:<PrivatePage><RoomPage /></PrivatePage>   },
          { path: 'createroom', element:<PrivatePage> <CreateRoom /> </PrivatePage> },
          { path: 'updateroom', element:<PrivatePage> <UpdateRoom /> </PrivatePage> },
          { path: 'roomdetails', element:<PrivatePage> <RoomdetailsPage /> </PrivatePage> },          
          { path: 'booking', element:<PrivatePage> <BookingPage /> </PrivatePage> },
          { path: 'createbooking', element:<PrivatePage> <CreateBooking /> </PrivatePage> },
          { path: 'check-calender', element:<PrivatePage> <CheckCalender /> </PrivatePage> },
        ],
      },
      // {createbooking
      //   path: '/hotel',
      //   element: user ? <DashboardLayout /> : <SimpleLayout />,  
      //   children: [
      //     {path:'/',element:<PrivatePage><Hotelpage /></PrivatePage> },
      //     { path: 'create', element: <PrivatePage><CreateHotel /></PrivatePage> },
      //     { path: 'update', element: <PrivatePage><UpdateHotel /></PrivatePage> },          
      //   ]
      // },
     
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
