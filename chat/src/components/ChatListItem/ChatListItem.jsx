import React from "react";

const ChatListItem = ({ chat, isSelected, onClick }) => (
  <li
    className={`chat-list__item ${
      isSelected ? "chat-list__item--selected" : ""
    }`}
    onClick={onClick}
  >
    <div className="chat-list__item-content">
      <p className="chat-list__item-name">{chat.name}</p>
      {chat.messages.length > 0 && (
        <div className="chat-list__item-bottom">
          <p className="chat-list__item-last-message">
            {chat.messages[chat.messages.length - 1].text}
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
);

export default ChatListItem;
