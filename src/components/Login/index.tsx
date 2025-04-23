// src/components/LoginForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import app from '../firebasesetup/app';

import './index.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSubmitError, setShowSubmitError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = getAuth(app);
  const navigate = useNavigate(); // react-router-dom v6

  const onSubmitSuccess = (jwtToken: string) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/', { replace: true });
  };

  const onSubmitFailure = (errorMsg: string) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const token: string = await userCredential.user.getIdToken();
      onSubmitSuccess(token);
    } catch (error: any) {
      onSubmitFailure(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      onSubmitSuccess(token);
    } catch (error: any) {
      setShowSubmitError(true);
      setErrorMsg('Google login failed.');
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className='Signup-header'> Welcome, back smart chef🍟</h1>
        <div className="input-container">
          <input
            type="email"
            className="email-input-field"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-container password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            className="password-input-field"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleSignup}
        >
          <img src={require('../../assets/google.jpeg')} alt="google" />
          Sign in with Google
        </button>

        <Link to="/signup" className="Login-link">
          Don't have an account?<span className="Login-text"> Signup</span>
        </Link>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
