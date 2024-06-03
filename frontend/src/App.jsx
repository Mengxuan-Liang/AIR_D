import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import Spots from './components/Spots';
import Landing from './components/Landing';
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      {/* {isLoaded} */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path:'spots',
        element:<Spots />
      },
      {
        path: 'login',
        element: <LoginFormPage />
      },
      {
        path: 'signup',
        element: <SignupFormPage />
      },
      {
        path: '*',
        element: <h2>Page Not Found</h2>
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
