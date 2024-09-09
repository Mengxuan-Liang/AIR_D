import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch,useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import { Navigate } from 'react-router-dom';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    const errors = {};

    if (credential.length < 4) {
      errors.credential = "";
    }

    if (password.length < 6) {
      errors.password = "";
    }

    setErrors(errors);
  }, [credential, password]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const isButtonDisabled = credential.length < 4 || password.length < 6;

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className='log-sign-form-container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='log-sign-form'>
        <label>
          Username or Email{' '}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Password{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        {errors.password && <p>{errors.password}</p>}
        <br></br>
        <br></br>
        <button type="submit"
          disabled={isButtonDisabled}
        >Log In</button>
        <br></br>
        <br></br>
        <button type='submit'
          onClick={()=> {
            setCredential('demo@user.io');
            setPassword('password1')
          }}
        >Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
