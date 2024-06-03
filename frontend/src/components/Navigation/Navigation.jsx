import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import Spots from '../Spots';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
        {/* <li> */}
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          {/* <NavLink to="/login">Log In</NavLink> */}
        {/* </li> */}
        {/* <li> */}
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
        {/* </li> */}
      </>
    );
  const navigate = useNavigate();
  return (
    // <ul>
    //   <li>
    //     <NavLink to="/">AirDnD</NavLink>
    //   </li>
    //   {isLoaded && sessionLinks}
    // </ul>
    <>
      <div>
        <nav className='navbar-links-container'>
          <div className='navbar-subcontainer'>
            <img 
            style={{
              height:'80px'
            }}
              className='navbar-logo'
              src='../dist/assets/IMG_0228.JPG'
              alt='dog-logo-image'
            />
            <h2 className='navbar-title'>BarkBnB</h2>
          </div>
          {/* <NavLink to='login'>Log in</NavLink>
          <NavLink to='signup'>Sign up</NavLink> */}
        {isLoaded && sessionLinks}
        </nav>
      </div>
      <div className='landing-container'>
        <h1 className='landing-title'>BarkBnB</h1>
        <img
          style={{
            height:'500px'
          }}
          src='../dist/assets/IMG_0228.JPG'
          alt='mydog-image'
        />
       <button onClick={()=>  navigate('/spots')}>View All Spots</button>
        {/* <div className='all-spot-landing'>
          <NavLink to="spots">View All Spots</NavLink>
        </div> */}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
