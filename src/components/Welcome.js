import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logout from './Logout'

const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(()=>{
    async function getUser(){
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }
  getUser()
}, []);
  return (
    <Container>
      <div className='logout'>
        <Logout/>
      </div>
      <div className='greeting-container'>
        <h1 className='welcome-title'>Welcome <span>{userName}</span></h1>
        <p>Send and recieve messages effortlessly using Chatify.<br/>
        Select a contact and start conversations.</p>
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
width: 65%;
flex-direction: column;
/* align-items: center;
justify-content: center; */
height: 100%;
.logout{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  padding: 2rem;
}
.greeting-container{
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .welcome-title{
    transform: translateY(4rem);
    span{
      color: #00C897;
    }
  }
  p{
    transform: translateY(2.5rem);
    text-align: center;
  }
  }
`

export default Welcome