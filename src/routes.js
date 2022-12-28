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

// ----------------------------------------------------------------------

export default function Router() {
  const {user} = useSelector((state)=>state.auth);   

  const routes = useRoutes(
    [
      {
        path: '/dashboard',
        element: user ? <DashboardLayout /> : <SimpleLayout />,    
        children: [
          { element: <Navigate to="/dashboard/app" />, index: true },
          { path: 'app', element: <PrivatePage><DashboardAppPage /></PrivatePage> },
          { path: 'user', element: <PrivatePage><UserPage /></PrivatePage>  },
          { path: 'employe', element: <PrivatePage><EmployePage /></PrivatePage>  },
          { path: 'hotel', element: <PrivatePage> <Hotelpage /> </PrivatePage> },
          { path: 'updatehotel', element: <PrivatePage> <UpdateHotel /> </PrivatePage> },
          { path: 'createhotel', element: <PrivatePage> <CreateHotel /> </PrivatePage> },
          { path: 'create-room', element:<PrivatePage> <CreateRoom /> </PrivatePage> },
          { path: 'room', element:<PrivatePage><RoomPage /></PrivatePage>   },
          { path: 'roomdetails', element:<PrivatePage> <RoomdetailsPage /> </PrivatePage> },
        ],
      },
      // {
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
