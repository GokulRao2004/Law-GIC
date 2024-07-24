import React, { useEffect, useRef, useState } from 'react';
import styles from './Chats.module.css';


import { getImageUrl } from '../../utils';

import text from '../../chats.json';

export const Chats = ({ name }) => {

  const messages = text;
  const [message, setMessage] = useState('');
  
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      messages.push(newMessage);
      setMessage('');
    }
  };




  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };





  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        
        <div className={styles.profilePic}>
        </div>
        LAW-GIC
      </div>
      <div ref={messageContainerRef} className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles[message.type]}`}>
            <div className={styles['message-content']} dangerouslySetInnerHTML={{ __html: message.content }}></div>
            <div className={styles['message-time']}>{message.time}</div>
          </div>
        ))}
      </div>
      <div className={styles.chatBarClose}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.sendBtn} onClick={handleSendMessage}>
          
        </button>
      </div>


    </div>



  );
};