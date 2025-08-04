import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoStatus = "done" | "pending";
type TodoItem = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  status: TodoStatus;
};

type BookMark = {
  id: string;
  title: string;
  link: string;
  favicon?: string;
};

interface AppState {
  linocaShown: boolean;
  toggleLinocaShown: () => void;
  selectedBg: string;
  setSelectedBg: (bg: string) => void;
  todos: Array<TodoItem>;
  createTodo: (
    title: string,
    description: string,
    dueDate: Date,
    status: TodoStatus,
    createdAt: Date
  ) => void;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    status: TodoStatus
  ) => void;

  // bookmarks
  bookmarks: Array<BookMark>;
  addBookMark: (input: BookMark) => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      linocaShown: false,
      toggleLinocaShown: () => {
        const state = get();
        set({ linocaShown: !state.linocaShown });
      },
      selectedBg: "/bgs/2.jpg",
      setSelectedBg: (bg: string) => {
        set({ selectedBg: bg });
      },
      todos: [],
      createTodo: (
        title: string,
        description: string,
        dueDate: Date,
        status: TodoStatus,
        createdAt: Date
      ) => {
        set({
          todos: [
            ...get().todos,
            {
              id: crypto.randomUUID(),
              title,
              description,
              dueDate,
              status,
              createdAt,
            },
          ],
        });
      },
      updateTodo: (
        id: string,
        title: string,
        description: string,
        dueDate: Date,
        status: TodoStatus
      ) => {
        const todos = get().todos;
        const todo = todos.find((i) => i.id === id);
        const filteredTodos = todos.filter((i) => i.id !== id);
        set({
          todos: [
            ...filteredTodos,
            {
              id: id,
              title,
              description,
              dueDate,
              status,
              createdAt: todo!.createdAt,
            },
          ],
        });
      },

      // bookmarks
      bookmarks: [],
      addBookMark: (input) => {
        set({ bookmarks: [...get().bookmarks, input] });
      },
    }),
    { name: "app-store" }
  )
);
