import React, { useState, useEffect } from "react";
import useChatStore from "./store/useChatStore"; // Убедитесь, что путь правильный
import ContactModal from "./components/ContactModal";
import "./App.css"; // Подключаем файл стилей

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
  const user = "user1"; // Один пользователь, от имени которого отправляются сообщения

  const { chats, addChat, addMessage } = useChatStore();

  // Функция для отправки сообщения в выбранный чат
  const handleSendMessage = () => {
    if (selectedChat && messageText) {
      addMessage(selectedChat.id, user, messageText);
      setMessageText(""); // Очищаем поле ввода после отправки сообщения
    }
  };

  // Эффект для установки первого чата по умолчанию
  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]); // Выбираем первый чат по умолчанию
    }
  }, [chats, selectedChat]);

  // Эффект для обновления истории сообщений при изменении выбранного чата
  useEffect(() => {
    if (selectedChat) {
      // Проверяем, что выбранный чат все еще существует
      const chat = chats.find((chat) => chat.id === selectedChat.id);
      if (chat) {
        setSelectedChat(chat);
      } else {
        // Если выбранный чат удален, сбрасываем выбор
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
              <p className="chat-list__item-name">{chat.name}</p>
              {chat.messages.length > 0 && (
                <p className="chat-list__item-last-message">
                  {chat.messages[chat.messages.length - 1].text}
                </p>
              )}
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
                <li className="chat-window__message" key={message.id}>
                  <strong className="chat-window__message-sender">
                    {message.sender}:
                  </strong>
                  {message.text}{" "}
                  <em className="chat-window__message-timestamp">
                    ({new Date(message.timestamp).toLocaleTimeString()})
                  </em>
                </li>
              ))
            )}
          </ul>
          <div className="chat-window__input-container">
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
          </div>
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
