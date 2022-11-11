import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "./RoutesComponent";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import Welcome from "./Welcome";

const Home = () => {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState('');
  
  
  useEffect(()=>{ 
    async function getUser() {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  
  useEffect(()=>{
    async function getContacts(){
    if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
  }
  getContacts()
}, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <><Container>
    <div className="container">
      <Contacts contacts={contacts} changeChat={handleChatChange} />
      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatBox currentChat={currentChat} socket={socket} />
      )}
    </div>
  </Container></>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 4rem;
  
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #eeeeee;
    display: flex;
    flex-direction: row;
    border-radius: 2rem;
  }
`

export default Home