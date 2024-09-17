import React from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid"; // Убедитесь, что импортируете uuidv4
import useChatStore from "../store/useChatStore";
import "./styles.css"; // Подключение стилей

const ContactModal = ({ onClose }) => {
  const { chats, addChat } = useChatStore();
  const contacts = [
    { id: 1, name: "John Fisher", avatar: "avatar1.png" },
    { id: 2, name: "James Green", avatar: "avatar2.png" },
    { id: 3, name: "Kate Williams", avatar: "avatar3.png" },
    { id: 4, name: "Катя", avatar: "avatar1.png" },
  ]; // Пример списка контактов с аватарами

  const handleSelectContact = (name) => {
    const existingChat = chats.find((chat) => chat.name === name);
    if (existingChat) {
      // Выбираем существующий чат
      onClose(existingChat);
    } else {
      // Создаем новый чат
      addChat(name);
      onClose({
        id: uuidv4(), // Генерируем уникальный ID для нового чата
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
