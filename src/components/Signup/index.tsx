// src/components/Signup/Signup.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import app from '../firebasesetup/app';

import './index.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [reenterPassword, setReenterPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showReenterPassword, setShowReenterPassword] = useState<boolean>(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const auth = getAuth(app);

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    if (password === reenterPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User created:', user);
          setSuccess('User successfully created!');
          setError('');
          window.location.href = '/'; // Redirect to home
        })
        .catch((error) => {
          setError(error.message);
          setSuccess('');
        });
    } else {
      setError('Passwords do not match');
    }
  };

  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Google sign-up successful:', user);
        setSuccess('Google sign-up successful!');
        setError('');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Google sign-up error:', error);
        setError(error.message);
        setSuccess('');
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-customer-container">
        <form onSubmit={handleSignup} className="signup-customer-form">
          <div className="signup-customer-group">
            <h1 className="Signup-header">Welcome to Ai Smart Chef</h1>
            <p className="Signup-Par">Give Ingredients,get Recipes 🥞🍱</p>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="signup-customer-input"
              placeholder="Email"
            />
          </div>
          <div className="signup-customer-group">
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setIsPasswordEntered(e.target.value.length > 0);
                }}
                required
                className="signup-customer-input"
                placeholder="Password"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {isPasswordEntered && (
            <div className="signup-customer-group">
              <div className="password-container">
                <input
                  type={showReenterPassword ? 'text' : 'password'}
                  value={reenterPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setReenterPassword(e.target.value)}
                  required
                  className="signup-customer-input"
                  placeholder="Re-Password"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowReenterPassword(!showReenterPassword)}
                >
                  {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}
          <button type="submit" className="signup-customer-button">
            Sign Up
          </button>
          {error && <p className="signup-error">{error}</p>}
          {success && <p className="signup-success">{success}</p>}

          <button type="button" className="google-signup-button" onClick={handleGoogleSignup}>
            <img src={require('../../assets/google.jpeg')} alt="google" />
            Continue with Google
          </button>

          <Link to="/login" className="Login-link">
            Already a Member? <span className="Login-text">Login Here</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
