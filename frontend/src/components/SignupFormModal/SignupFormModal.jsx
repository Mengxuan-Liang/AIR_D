import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import '../LoginFormModal/LoginForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  let isButtonDisabled = password.length < 6 || username.length < 4 || !email.length || !username.length || !firstName.length || !lastName ||!password;
  return (
    <div className='log-sign-form-container'>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className='log-sign-form'>
        <label>
          Email{' '}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <br></br>
      <br></br>
        <label>
          Username{' '}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <br></br>
      <br></br>
        <label>
          First Name{' '}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <br></br>
      <br></br>
        <label>
          Last Name{' '}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <br></br>
      <br></br>
        <label>
          Password{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <br></br>
      <br></br>
        <label>
          Confirm Password{' '}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <br></br>
        <br></br>
        <button disabled={isButtonDisabled}
        type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
