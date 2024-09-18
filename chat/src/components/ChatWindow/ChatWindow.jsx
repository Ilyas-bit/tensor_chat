import React from "react";
import NoMessages from "../NoMessages/NoMessages";

const ChatWindow = ({
  chat,
  user,
  messageText,
  onMessageTextChange,
  onSendMessage,
}) => (
  <div className="chat-window">
    <div className="chat-window__header">
      <h2 className="chat-window__title">Чат с {chat.name}</h2>
    </div>
    <ul className="chat-window__messages">
      {chat.messages.length === 0 ? (
        <NoMessages />
      ) : (
        chat.messages.map((message) => (
          <li
            className={`chat-window__message ${
              message.sender === user
                ? "chat-window__message--outgoing"
                : "chat-window__message--incoming"
            }`}
            key={message.id}
          >
            <div className="chat-window__message-content">
              <strong className="chat-window__message-sender">
                {message.sender}:
              </strong>
              {message.text}{" "}
              <em className="chat-window__message-timestamp">
                (
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </em>
            </div>
          </li>
        ))
      )}
    </ul>
    <form className="chat-window__input-container">
      <input
        className="chat-window__input"
        type="text"
        value={messageText}
        onChange={onMessageTextChange}
        placeholder="Сообщение"
      />
      <button className="chat-window__send-button" onClick={onSendMessage}>
        Отправить
      </button>
    </form>
  </div>
);

export default ChatWindow;
