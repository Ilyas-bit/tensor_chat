import React from "react";
import ChatListItem from "../ChatListItem/ChatListItem";

const ChatSidebar = ({ chats, selectedChat, onChatSelect, onAddChat }) => (
  <div className="chat-app__sidebar">
    <h1 className="chat-app__title">Список чатов</h1>
    <button className="chat-app__add-chat" onClick={onAddChat}>
      +
    </button>
    <ul className="chat-list">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChat?.id === chat.id}
          onClick={() => onChatSelect(chat)}
        />
      ))}
    </ul>
  </div>
);

export default ChatSidebar;
