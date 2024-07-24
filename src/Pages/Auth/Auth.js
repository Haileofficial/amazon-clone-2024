import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classes from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider"
import { ClipLoader } from "react-spinners"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext)
  const [loading, setLoading] = useState({
    SignIn: false,
    SignUp: false,
  })
  const navigate = useNavigate()
  const navStateData= useLocation()
  console.log(navStateData);
  const actionTypes = {
    SET_USER: 'SET_USER',
    // Add any other action types you need
  };

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    try {
      if (e.target.name === "SignIn") {
        // firebase auth
        setLoading({ ...loading, SignIn: true })
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: actionTypes.SET_USER,
          user: userCredential.user,
        });
        setLoading({ ...loading, SignIn: false })
        navigate(navStateData?.state?.redirect ||"/");
      } else {
        setLoading({ ...loading, SignUp: true })
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: actionTypes.SET_USER,
          user: userCredential.user,
        });
        setLoading({ ...loading, SignUp: false })
        navigate(navStateData?.state?.redirect ||"/");
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading({ ...loading, SignIn: false })
      setLoading({ ...loading, SignUp: false })
    }
  };

  return (
    <section className={classes.login}>
      <div className={classes.container}>
        {/* logo */}
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png" alt="Amazon logo" />
        </Link>
        {/* sign-in form */}
        <form className={classes.signInForm}>
          <h1>Sign-in</h1>
          {
            navStateData?.state?.msg &&(
              <small style={{
                padding:"5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}>
                {navStateData?.state?.msg}
              </small>
            )
          }
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Enter your email" />
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter your password" />
          <button type="submit" onClick={authHandler} name="SignIn">
            {loading.SignIn ? (
              <ClipLoader color="black" size={15} />
            ) : (
              'Sign in'
            )}
          </button>
          <p>Choose a shipping address to continue checking out. You'll still have a chance to review and edit your order before it's final.</p>
          <button type="submit" onClick={authHandler} name="SignUp">
          {loading.SignUp ? (
              <ClipLoader color="black" size={15} />
            ) : (
              ' Create account'
            )}
            </button>
          {
            error && (
              <small style={{ padding: '5px', color: 'red' }}>{error}</small>
            )
          }
        </form>
      </div>
    </section>
  );
};

export default Auth;