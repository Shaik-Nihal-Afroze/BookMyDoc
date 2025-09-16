// frontend/src/components/Chat.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { FaArrowLeft} from 'react-icons/fa'
import './chat.css'; // import css file

export default function Chat({ appointmentId ,onBack}) {
  const { authUser } = useAuthStore();
  const { joinAppointment, loadMessages, sendText, sendImage, getMessagesFor } = useChatStore();
  const [text, setText] = useState('');
  const fileRef = useRef(null);
  const messages = getMessagesFor(appointmentId);

  useEffect(() => {
    if (!appointmentId) return;
    joinAppointment(appointmentId);
    loadMessages(appointmentId);
  }, [appointmentId]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendText(appointmentId, text.trim());
    setText('');
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    sendImage(appointmentId, f);
    e.target.value = null;
  };

  const containerRef = useRef();
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages.length]);

  return (
    <div className="chat-container">
       
      <div className="chat-messages" ref={containerRef}>
        {messages.map((m) => {
          const isMe = m.sender?._id === authUser?._id;
          return (
            <div
              key={m._id}
              className={`chat-message-row ${isMe ? 'me' : 'other'}`}
            >
              <div className={`chat-message ${isMe ? 'me' : 'other'}`}>
                {m.text && <div className="chat-text">{m.text}</div>}
                {m.imageUrl && <img src={m.imageUrl} alt="chat" className="chat-image" />}
                <div className="chat-time">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="no-messages">No messages yet</div>
        )}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFile}
          className="chat-file"
        />
        <button onClick={handleSend} className="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
}
