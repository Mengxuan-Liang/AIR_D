import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import { NavLink } from 'react-router-dom';
import { useNavigate} from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
      <i style={{color:'palevioletred'}}className="fa-solid fa-dog" />{' '}<span style={{textAlign:'center'}}>Hello, {user.firstName}</span>

      </button>
      <div className={ulClassName} ref={ulRef}>
        {/* <div style={{textAlign:'center'}}>Hello, {user.firstName}</div> */}
        {/* <li>{user.firstName} {user.lastName}</li> */}
        <div style={{textAlign:'center'}}>{user.email}</div>
        {/* <NavLink to='/spots/current'>Manage Spots</NavLink> */}
        <button
          onClick={()=> navigate('/spots/current')}
        >Manage Spots</button>
        <br></br>
        {/* <NavLink to='/reviews/current'>Manage Reviews</NavLink> */}
        <button
          onClick={()=> navigate('/reviews/current')}
        >Manage Reviews</button>
        <div>
          <button
          onClick={logout}>Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
