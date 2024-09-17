import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Пример предустановленных сообщений
const defaultMessages = [
  { sender: "user1", text: "Привет!" },
  { sender: "user2", text: "Здравствуйте!" },
  { sender: "user1", text: "Как ваши дела?" },
];

const useChatStore = create((set) => ({
  chats: [], // Список чатов

  // Функция для добавления нового чата
  addChat: (name) => {
    set((state) => {
      // Создаем новый чат с предустановленными сообщениями
      const newChat = {
        id: uuidv4(), // Уникальный ID для чата
        name: name, // Имя контакта/чата
        messages: defaultMessages.map((message) => ({
          id: uuidv4(), // Уникальный ID для каждого сообщения
          sender: message.sender,
          text: message.text,
          timestamp: Date.now(), // Время отправки
        })),
      };

      return {
        chats: [...state.chats, newChat],
      };
    });
  },

  // Функция для добавления сообщения в чат
  addMessage: (chatId, sender, text) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: uuidv4(), // Уникальный ID для каждого сообщения
                  sender, // Кто отправил сообщение
                  text, // Текст сообщения
                  timestamp: Date.now(), // Время отправки
                },
              ],
            }
          : chat
      ),
    }));
  },
}));

export default useChatStore;
