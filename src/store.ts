import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TodoStatus = "done" | "pending";
export type TagType = "moderate" | "urgent" | "not-force";
export type TodoItem = {
  id: string;
  title: string;
  description: string;
  tag: TagType;
  dueDate: Date;
  createdAt: Date;
  status: TodoStatus;
};

export type BookMark = {
  id: string;
  title: string;
  link: string;
  favicon?: string;
};

export type Chore = {
  icon: string;
  time: string;
  hour: string;
  minute: string;
};

export type WeatherCity = {
  name: string;
  title: string;
  lat: number;
  lng: number;
};

interface AppState {
  selectedCity: WeatherCity;
  setSelectedCity: (newCity: WeatherCity) => void;
  chores: Array<Chore>;
  addChore: (data: Chore) => void;
  deleteChore: (id: string) => void;
  linocaLinks: Array<BookMark>;
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
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string, newStatus: TodoStatus) => void;

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
      selectedCity: {
        name: "tehran",
        title: "تهران",
        lat: 35.69439,
        lng: 51.42151,
      },
      setSelectedCity(newCity) {
        set({ selectedCity: newCity });
      },
      chores: [],
      deleteChore: (id: string) => {
        const newChores = get().chores.filter((i) => i.icon !== id);
        set({ chores: newChores });
      },
      addChore: (data) => {
        console.log({ data });

        const chores = get().chores;

        const alreadyRegistered = chores.findIndex((i) => i.icon === data.icon);

        if (alreadyRegistered >= 0) {
          console.log("alreadyRegistered", alreadyRegistered);

          chores[alreadyRegistered] = data;
          set({ chores: chores });
        } else {
          const x = [...chores, data];
          console.log({ x });

          set({ chores: [...chores, data] });
        }

        console.log({ state: chores });
      },
      linocaLinks: [],
      linocaShown: false,
      toggleLinocaShown: () => {
        const state = get();
        set({ linocaShown: !state.linocaShown });
      },
      selectedBg: "/bgs/02.jpg",
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
        console.log({ todos, todo, filteredTodos });

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
      deleteTodo: (id) => {
        const d = get().todos.filter((i) => i.id !== id);
        set({ todos: d });
      },
      toggleStatus: (id, newStatus) => {
        const mappedTodos = get().todos.map((i) => {
          if (i.id === id) {
            i.status = newStatus;
          }
          return i;
        });
        set({ todos: mappedTodos });
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
