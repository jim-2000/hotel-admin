import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SimpleLayout from './layouts/simple/SimpleLayout';
import Page404 from './pages/Page404';
export default function AuthRoute() {
  
  
    return (
        <Routes >      
            <Route  path='/' element={<LoginPage />} />,
            <Route  path='*' element={<Navigate to={'/'} replace />} />,
        </Routes>
    );
  }
  