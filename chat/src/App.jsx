import React, { useState, useEffect } from "react";

import ChatWindow from "./components/ChatWindow/ChatWindow";

import "./App.css";
import useChatStore from "./store/useChatStore";
import ChatSidebar from "./components/ChatSidebar/ChatSidebar";
import ContactModal from "./components/ContactModal/ContactModal";

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
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
        onAddChat={() => setShowModal(true)}
      />
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          user={user}
          messageText={messageText}
          onMessageTextChange={(e) => setMessageText(e.target.value)}
          onSendMessage={handleSendMessage}
        />
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
