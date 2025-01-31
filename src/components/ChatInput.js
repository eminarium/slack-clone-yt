import { Button } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {

  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)
  const sendMessage = async (e) => {
    e.preventDefault()

    if (!channelId) {
      return false;
    }

    try {
      const docRef = await addDoc(collection(db, "rooms", channelId, "messages"), {
        message: input,
        timestamp: serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL
      })
    } catch (e) {
      console.log("Error adding message: ", e)
    }

    chatRef.current.scrollIntoView({
      behavior: "smooth"
    })

    setInput("");
  }

  return (
    <ChatInputContainer>
      <form action="">
        <input  
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={`Message #${channelName}`} 
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;