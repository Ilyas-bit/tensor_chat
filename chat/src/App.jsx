import React, { useState, useEffect } from "react";
import useChatStore from "./store/useChatStore";
import ContactModal from "./components/ContactModal";
import "./App.css";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const user = "user1";

  const { chats, addChat, addMessage, updateChatOrder } = useChatStore();

  const handleSendMessage = () => {
    if (selectedChat && messageText) {
      addMessage(selectedChat.id, user, messageText);
      setMessageText("");

      updateChatOrder(selectedChat.id);
    }
  };

  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats, selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      const chat = chats.find((chat) => chat.id === selectedChat.id);
      if (chat) {
        setSelectedChat(chat);
      } else {
        setSelectedChat(null);
      }
    }
  }, [chats, selectedChat?.id]);

  return (
    <div className="chat-app">
      <div className="chat-app__sidebar">
        <h1 className="chat-app__title">Список чатов</h1>
        <button
          className="chat-app__add-chat"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        <ul className="chat-list">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-list__item ${
                selectedChat?.id === chat.id ? "chat-list__item--selected" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-list__item-content">
                <p className="chat-list__item-name">{chat.name}</p>
                {chat.messages.length > 0 && (
                  <div className="chat-list__item-bottom">
                    <p className="chat-list__item-last-message">
                      {chat.messages[chat.messages.length - 1].text}{" "}
                    </p>
                    <span className="chat-list__item-timestamp">
                      {new Date(
                        chat.messages[chat.messages.length - 1].timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedChat ? (
        <div className="chat-window">
          <div className="chat-window__header">
            <h2 className="chat-window__title">Чат с {selectedChat.name}</h2>
          </div>
          <ul className="chat-window__messages">
            {selectedChat.messages.length === 0 ? (
              <p className="chat-window__no-messages">Нет сообщений</p>
            ) : (
              selectedChat.messages.map((message) => (
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
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Сообщение"
            />
            <button
              className="chat-window__send-button"
              onClick={handleSendMessage}
            >
              Отправить
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-window__empty">
          <p>Выберите чат для отправки сообщений</p>
        </div>
      )}
      {showModal && (
        <ContactModal
          onClose={(chat) => {
            if (chat) {
              setSelectedChat(chat);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ChatApp;
