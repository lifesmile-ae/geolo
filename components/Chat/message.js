import React from 'react';
import styles from './Chat.module.css';
import { format } from 'timeago.js';

const Message = ({ message }) => {
  return (
    <>
      <span
        className={`${styles.chat_msg_item} ${
          message.sender === 'Server'
            ? styles.chat_msg_item_admin
            : styles.chat_msg_item_user
        }`}
      >
        {message.text}
        {message.sender === 'Server' && (
          <div className={styles.chat_avatar}>
            <img src="assets/image/avatar.jpg" />
          </div>
        )}
      </span>
      {message.sender !== 'Server' && (
        <div className={styles.status}>{format(message.createdAt)}</div>
      )}
    </>
  );
};

export default Message;
