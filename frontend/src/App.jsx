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
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';
import CurrentSpots from './components/CurrentSpots';
import EditSpotForm from './components/EditSpotForm';
import CurrentReviews from './components/Review/CurrentReviews';
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
        // path: '/',
        // element: <Landing />
      },
      {
        path:'/',
        element:<Spots />
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: 'spots/new',
        element: < CreateSpotForm />
      },
      {
        path:'spots/current',
        element: <CurrentSpots />
      },
      {
        path: 'spots/:spotId/edit',
        // element: < CreateSpotForm /> 
        element: < EditSpotForm /> 
      },
      {
        path:'reviews/current',
        element: <CurrentReviews />
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // },
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
