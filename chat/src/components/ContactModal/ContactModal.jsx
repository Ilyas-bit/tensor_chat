import React from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import useChatStore from "../../store/useChatStore";
import "./styles.css"; // Подключение стилей

const ContactModal = ({ onClose }) => {
  const { chats, addChat } = useChatStore();

  // Обновленный путь к изображениям
  const contacts = [
    { id: 1, name: "Лена", avatar: "/avatar1.JPG" },
    { id: 2, name: "Катя", avatar: "/avatar2.JPG" },
    { id: 3, name: "Михаил", avatar: "/avatar3.JPG" },
    { id: 4, name: "Илья", avatar: "/avatar4.JPG" },
    { id: 4, name: "Александра ", avatar: "/avatar5.JPG" },
    { id: 4, name: "Василиса", avatar: "/avatar6.JPG" },
    { id: 4, name: "Виктория", avatar: "/avatar7.JPG" },
    { id: 4, name: "Мирослав", avatar: "/avatar8.JPG" },
    { id: 4, name: "Юлия", avatar: "/avatar9.JPG" },
    { id: 4, name: "Никита", avatar: "/avatar10.JPG" },
    { id: 4, name: "Джон", avatar: "/avatar12.JPG" },
  ];

  const handleSelectContact = (name) => {
    const existingChat = chats.find((chat) => chat.name === name);
    if (existingChat) {
      onClose(existingChat);
    } else {
      addChat(name);
      onClose({
        id: uuidv4(),
        name: name,
        messages: [],
      });
    }
  };

  return createPortal(
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={() => onClose(null)}>
          X
        </button>
        <h2 className="modal__title">Choose contact</h2>
        <ul className="modal__contact-list">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="modal__contact-item"
              onClick={() => handleSelectContact(contact.name)}
            >
              <img
                className="modal__contact-avatar"
                src={contact.avatar}
                alt={contact.name}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <span className="modal__contact-name">{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
