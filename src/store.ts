import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoStatus = "done" | "pending";
export type TagType = "moderate" | "urgent" | "not-force";
type TodoItem = {
  id: string;
  title: string;
  description: string;
  tag: TagType;
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
    tag: TagType,
    dueDate: Date,
    status: TodoStatus,
    createdAt: Date
  ) => void;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    tag: TagType,
    dueDate: Date,
    status: TodoStatus
  ) => void;

  // bookmarks
  bookmarks: Array<BookMark>;
  addBookMark: (input: BookMark) => void;
  removeBookmark: (id: string) => void;

  // login and auth
  isAuthenticated: boolean;
  organizationId: string;
  accessToken: string;
  login: (token: string, organizationId: string) => void;
  logout: () => void;

  // banners
  banners: Array<{ image: string; position: string }>;
  setBanners: (data: Array<{ image: string; position: string }>) => void;

  // google
  googleToken: string;
  setGoogleToken: (token: string) => void;
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
        tag: TagType,
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
              tag,
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
        tag: TagType,
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
              tag,
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
      removeBookmark: (id) => {
        const bookmarks = get().bookmarks;
        set({ bookmarks: bookmarks.filter((i) => i.id !== id) });
      },

      // login
      isAuthenticated: false,
      accessToken: "",
      organizationId: "",
      login: (token, organizationId) => {
        set({ accessToken: token, organizationId: organizationId });
      },
      logout: () => {
        set({ isAuthenticated: false, accessToken: "" });
      },

      banners: [
        {
          image: "/ads-1.png",
          position: "1",
        },
        {
          image: "/ads-1.png",
          position: "2",
        },
      ],
      setBanners: (data: Array<{ image: string; position: string }>) => {
        set({ banners: [...data] });
      },
      googleToken: "",
      setGoogleToken: (token: string) => {
        set({ googleToken: token });
      },
    }),
    { name: "app-stare" }
  )
);
