import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { GiDogHouse } from "react-icons/gi";
// import from '../../images.';

// import Spots from '../Spots';
// import CreateSpotForm from '../CreateSpotForm';

function Navigation({ isLoaded }) {
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
      <>
      <div>
        {/* <NavLink to='/spots/new'> Create A New Spot</NavLink> */}
        <GiDogHouse
            style={{fontSize:'40px', color:'pink'}}
            onClick={()=>navigate('/spots/new')}
            />
        {/* <button
          className='create-spot-button'
          onClick={()=> navigate('/spots/new')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}

        >
           <GiDogHouse style={{ fontSize: '40px', marginBottom: '5px' }} />
          Create A New Spot</button> */}
      </div>
      <div>
        <ProfileButton user={sessionUser} />
      </div>
      </>
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
          {/* <GiDogHouse
            style={{fontSize:'40px', color:'pink'}}
            onClick={()=>navigate('/')}
            /> */}
            <img
            style={{
              height:'80px'
            }}
              className='navbar-logo'
              src='../../public/images/IMG_0229.png'
              alt='dog-logo-image'
              onClick={()=> {
                navigate('/')
            }}
            />
            <h2 className='navbar-title'>BarkBnB</h2>
          </div>
          {/* <NavLink to='login'>Log in</NavLink>
          <NavLink to='signup'>Sign up</NavLink> */}
        {isLoaded && sessionLinks}
        </nav>
      </div>
      {/* <div className='landing-container'>
        <h1 className='landing-title'>BarkBnB</h1>
        <img
          style={{
            height:'500px'
          }}
          src='../dist/assets/IMG_0228.JPG'
          alt='mydog-image'
        />
       <button onClick={()=>  navigate('/spots')}>View All Spots</button> */}
        {/* <div className='all-spot-landing'>
          <NavLink to="spots">View All Spots</NavLink>
        </div> */}
      {/* </div> */}
      {/* <Outlet /> */}
    </>
  );
}

export default Navigation;
