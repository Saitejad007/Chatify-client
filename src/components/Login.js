import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from './RoutesComponent';

const Login = () => {
    const [userdata, setUserdata] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    useEffect(() => {
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const handleValidation = () => {
        const { password, username } = userdata;
        if (username === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        } else if (password === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        }
        return true;
      };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (handleValidation()) {
            const { username, password } = userdata;
            const { data } = await axios.post(loginRoute, {
              username,
              password,
            });
      
            if (data.status === false) {
              toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
              localStorage.setItem(
                process.env.REACT_APP_LOCALHOST_KEY,
                JSON.stringify(data.user)
              );
              navigate("/");
            }
        }
    }

    const handleChange =(e)=>{
        setUserdata({ ...userdata, [e.target.name]: e.target.value });    
    }

    return (
    <>
      <FormContainer>
        <form action="" onSubmit={handleSubmit}>
          <div className="title-container">
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #393E46;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 0.1rem solid #393E46;
    border-radius: 0.4rem;
    color: #393E46;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #019267;
    margin-top: 0.5rem;
    color: white;
    padding: 1rem 2rem;
    width: 100%;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #929AAB;
    }
  }
  span {
    color: #393E46;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      &:hover{
        text-decoration: underline;
      }
    }
  }
`

export default Login