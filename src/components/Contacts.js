import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Contacts = (props) => {
  const {contacts, changeChat} = props

  const [currentUserName, setCurrentUserName] = useState('');
  const [currentSelected, setCurrentSelected] = useState('');
  useEffect(()=>{
    async function getUser(){
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
  }
  getUser()
}, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
        <Container>
          <div className="brand">
            <h2>Chatify</h2>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    {contact.username!==undefined?contact.username[0]:''}
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
            {currentUserName!==undefined?currentUserName[0]:""}
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  overflow: hidden;
  background-color: #eeeeee;
  border-radius: 2rem;
  .brand {
    display: flex;
    align-items: center;
    height: 15%;
    justify-content: center;
    h2 {
      color: #205375;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 70%;
    margin: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #205375;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #f7f7f7;
      min-height: 4.5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      margin: 0.2rem;
      .avatar {
      background-color: #205375;
      color: #eeeeee;
      border-radius: 2rem;
      height: 2.5rem;
      width: 2.5rem;
      border: 0;
      outline: none;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 1rem;
    }
      .username {
        h3 {
          color: #393E46;
          margin-bottom: 1rem;
        }
      }
    }
    .selected {
      background-color: #4FD3C4;
    }
  }
  .current-user {
    background-color: #eeeeee;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    .avatar {
      background-color: #205375;
      color: #eeeeee;
      border-radius: 4rem;
      height: 3.5rem;
      width: 3.5rem;
      border: 0;
      outline: none;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 1rem;
    }
    .username {
      h2 {
        color: #393E46;
      }
    }
  }
`;

export default Contacts