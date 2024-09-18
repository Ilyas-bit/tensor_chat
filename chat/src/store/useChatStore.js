import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const defaultMessages = [
  { sender: "user1", text: "Привет!" },
  { sender: "user2", text: "Здравствуйте!" },
  { sender: "user1", text: "Как ваши дела?" },
];

const loadFromLocalStorage = () => {
  const storedState = localStorage.getItem("chatStore");
  return storedState ? JSON.parse(storedState) : { chats: [] };
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("chatStore", JSON.stringify(state));
};

const useChatStore = create((set) => ({
  ...loadFromLocalStorage(),

  addChat: (name) => {
    set((state) => {
      const newChat = {
        id: uuidv4(),
        name: name,
        messages: defaultMessages.map((message) => ({
          id: uuidv4(),
          sender: message.sender,
          text: message.text,
          timestamp: Date.now(),
        })),
      };

      const newState = {
        chats: [...state.chats, newChat],
      };

      saveToLocalStorage(newState);
      return newState;
    });
  },

  addMessage: (chatId, sender, text) => {
    set((state) => {
      const newState = {
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: uuidv4(),
                    sender,
                    text,
                    timestamp: Date.now(),
                  },
                ],
              }
            : chat
        ),
      };

      saveToLocalStorage(newState);
      return newState;
    });
  },

  updateChatOrder: (chatId) => {
    set((state) => {
      const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);
      if (chatIndex === -1) return state;

      const [chat] = state.chats.splice(chatIndex, 1);

      const newState = {
        chats: [chat, ...state.chats],
      };

      saveToLocalStorage(newState);
      return newState;
    });
  },
}));

export default useChatStore;
