import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import Error from '../pages/Errors';
import ThemeLayout from '../ThemeLayout';
import BlankLayout from '../blankLayout';
import About from '../pages/About';
import useAuth from '../hooks/useAuth';
import { authApi } from './../api';
import { PrivateRoute } from './PrivateRoute';

const init = async () => {
  const { dispatch } = useAuth();
  try {
    const res = await authApi.checkToken();
    if (res.status === 200) {
      const { user: id, email, username, role } = res.data;
      dispatch({
        type: 'INITIALISE',
        payload: { user: { id, email, username, role } }
      });
    }
  } catch (err) {}
};

const Wrapper = () => {
  init();
  return (
    <>
      <Outlet />
    </>
  );
};

const themeRoutes = [
  {
    element: <Wrapper />,
    children: [
      {
        path: '/',

        element: (
          <PrivateRoute>
            <ThemeLayout />
          </PrivateRoute>
        ),
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/users', element: <Users /> },
          { path: '/user/:username/profile', element: <Profile /> },
          { path: '/products', element: <Products /> },
          { path: '/categories', element: <Categories /> },
          { path: '/transactions', element: <Transactions /> }
        ]
      },
      {
        element: <BlankLayout />,
        children: [
          { path: '/about', element: <About /> },
          {
            path: '/login',
            element: <Login />
          }
        ]
      }
    ]
  }
];

export default { themeRoutes };
