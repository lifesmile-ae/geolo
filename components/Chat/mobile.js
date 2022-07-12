import React, { useState, useRef, useEffect } from 'react';
import styles from './Mobile.module.css';
import { BiSend } from 'react-icons/bi';
import { storeUserId, removeUserId } from '../../redux/actions/userActions';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useWindowSize from '../../hooks/useWindowSize';
import axios from 'axios';
import Message from './mobileMessage';

const Mobile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.customer.userId);
  const router = useRouter();
  const size = useWindowSize();
  const { locale } = router;
  const [chatopen, setChatOpen] = useState(false);
  const [chattype, setChatType] = useState('');
  const [country, setCountry] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const [conversationId, setConversationId] = useState('');
  const [onlineagent, SetOnlineagent] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.CHAT_SERVER);
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: 'Server',
        text: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.on('getUsers', (users) => {
      let agentOnline = users.filter(
        (user) => user.userId === '62187ad03837da30d88dee7e'
      );
      agentOnline.length > 0 ? SetOnlineagent(true) : SetOnlineagent(false);
    });
  }, []);

  useEffect(() => {
    const getlocation = async () => {
      try {
        const location = await fetch('https://geolocation-db.com/json/').then(
          (res) => res.json()
        );
        setCountry(location.country_name);
      } catch (err) {
        setCountry('Unknown');
      }
    };
    getlocation();
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const chathandler = (type) => {
    console.log(type);
    setChatType(type);
    if (userId === null) {
      let userData = {
        locale,
        country: country,
        device: size.width > 768 ? 'desktop' : 'mobile',
      };
      try {
        axios.post('api/user/customer', userData).then(({ data }) => {
          dispatch(storeUserId(data.user._id)),
            socket.current.emit('addUser', data.user._id);
          socket.current.emit('chatType', {
            chattype: type,
            userId: data.user._id,
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      socket.current.emit('addUser', userId);
      socket.current.emit('chatType', { chattype: type, userId });
    }
  };

  useEffect(() => {
    const createConversation = async () => {
      try {
        const { data } = await axios.get(
          `/api/chat/conversation?userId=${userId}`
        );
        if (data.length === 0) {
          if (userId) {
            const { data } = await axios.post('api/chat/conversation', {
              senderId: userId,
              receiverId: '62187ad03837da30d88dee7e',
            });
            setConversationId(data._id);
          }
        } else {
          setConversationId(data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    createConversation();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (chattype === 'trackorder') {
      socket.current.emit('orderNumber', { orderNumber: newMessage, userId });
      const message = {
        sender: 'user',
        text: newMessage,
        createdAt: Date.now(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
    if (chattype === 'shipping') {
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: conversationId,
      };
      const convtype = await axios.put('/api/chat/conversation', {
        type: 'Shipping',
        id: conversationId,
      });
      if (onlineagent) {
        socket.current.emit('sendMessage', {
          senderId: userId,
          receiverId: '62187ad03837da30d88dee7e',
          message: newMessage,
        });
      } else {
        socket.current.emit('onlineAgent', userId);
      }
      const res = await axios.post('/api/chat/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    }
    if (chattype === 'return') {
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: conversationId,
      };
      const convtype = await axios.put('/api/chat/conversation', {
        type: 'return',
        id: conversationId,
      });
      if (onlineagent) {
        socket.current.emit('sendMessage', {
          senderId: userId,
          receiverId: '62187ad03837da30d88dee7e',
          message: newMessage,
        });
      } else {
        socket.current.emit('onlineAgent', userId);
      }
      const res = await axios.post('/api/chat/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    }
    if (chattype === 'talkagent') {
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: conversationId,
      };
      if (onlineagent) {
        socket.current.emit('sendMessage', {
          senderId: userId,
          receiverId: '62187ad03837da30d88dee7e',
          message: newMessage,
        });
      } else {
        socket.current.emit('onlineAgent', userId);
      }
      const convtype = await axios.put('/api/chat/conversation', {
        type: 'Talk With Agent',
        id: conversationId,
      });
      const res = await axios.post('/api/chat/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      return submitHandler(e);
    }
  };

  useEffect(() => {
    socket.current.on('getUsers', (users) => {
      let agentOnline = users.filter(
        (user) => user.userId === '62187ad03837da30d88dee7e'
      );
      agentOnline.length > 0 ? SetOnlineagent(true) : SetOnlineagent(false);
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <>
      <div
        id="chat_body"
        className={`${styles.chat_body} ${styles.chat_body_height} ${
          chattype === '' ? styles.dblock : styles.dnone
        }`}
      >
        <div className={styles.chat_category}>
          <p>What would you like to talk about?</p>
          <ul className={styles.ul}>
            <li onClick={(e) => chathandler('trackorder')}>Track Orders</li>
            <li onClick={(e) => chathandler('shipping')}>Shipping Abroad</li>
            <li onClick={(e) => chathandler('return')}>Return / Exchange</li>
            <li onClick={(e) => chathandler('talkagent')}>Talk with Agent</li>
          </ul>
        </div>
      </div>
      {/* Chatbox Open */}
      <div
        id="chat_fullscreen"
        className={`${styles.chat_conversion} ${styles.chat_converse} ${
          chattype === '' ? styles.dnone : styles.dblock
        }`}
      >
        {messages.map((m, i) => (
          <div key={i} ref={scrollRef}>
            <Message message={m} />
          </div>
        ))}
      </div>
      <form onSubmit={submitHandler}>
        <div className={`${styles.fab_field} ${styles.chat_fields}`}>
          <button
            id="fab_send"
            type="submit"
            style={{ border: 0 }}
            className={`${styles.fab} ${styles.fab_send} ${styles.isVisible}`}
          >
            <BiSend />
          </button>
          <textarea
            id="chatSend"
            name="chat_message"
            placeholder="Send a message"
            value={newMessage}
            onKeyPress={handleEnterSubmit}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.chat_field} ${styles.chat_message}`}
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default Mobile;
