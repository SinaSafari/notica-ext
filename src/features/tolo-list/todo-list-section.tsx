"use client";

import { GlassContainer } from "@/components/glass-container";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import {useAppState} from "@/store.ts";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";
import {Modal} from "@/components/modal.tsx";
import {CreateTodoModal} from "@/features/tolo-list/create-todo-modal.tsx";

function formatDate(date: Date) {
  return date.toLocaleDateString("fa-IR", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
}

const MOCK_DATA = [
  {
    id: 1,
    title: "کار 1",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نا مفهوم از صنعت.",
    status: "undone",
    tag: "red-500",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "کار 2",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نا مفهوم از صنعت.",
    status: "undone",
    tag: "green-500",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "کار 3",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نا مفهوم از صنعت.",

    status: "done",
    tag: "yellow-500",
    createdAt: new Date(),
  },
];

export function TodoListSection() {
  const {todos, createTodo, updateTodo} = useAppState(useShallow(state => {
    return {
      todos: state.todos,
      createTodo: state.createTodo,
      updateTodo: state.updateTodo,
    }
  }))
  const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  return (
      <>
        <Modal onClose={() => setIsCreateTodoModalOpen(false)} isOpen={isCreateTodoModalOpen} >
          <CreateTodoModal onClose={() => setIsCreateTodoModalOpen(false)}/>
        </Modal>

    <GlassContainer className="flex flex-col justify-between items-stretch h-full gap-4">
      <GlassContainer className="bg-white-20 flex items-center justify-between mx-4 rounded-2xl">
        <p className="text-lg font-bold">کارهای امروز</p>
        <div className="flex justify-end items-center gap-2">
          <div className="h-4 w-4 bg-red-500 rounded-full"></div>
          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
          <div className="h-4 w-4 bg-yellow-300 rounded-full"></div>
        </div>
      </GlassContainer>

      <div className="grow flex flex-col items-stretch justify-start gap-4 mx-4">
        {todos.map((todo) => {
          return (
            <GlassContainer
              key={todo.id.toString()}
              className="flex justify-between items-stretch  p-4 gap-4 rounded-xl bg-white-20"
            >
              <div className="h-full w-4 flex flex-col justify-around items-center gap-4">
                <input type="checkbox" className="w-4 h-4" />
                {/*{todo.tag !== null || todo.tag !== "" ? (*/}
                {/*  <div*/}
                {/*    className={`h-3 w-3 bg-${todo.tag} rounded-xl text-center`}*/}
                {/*  ></div>*/}
                {/*) : null}*/}
              </div>
              <div className="grow flex flex-col justify-between items-stretch gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">{todo.title}</p>

                  <div className="flex justify-end items-center gap-2">
                    <IconCalendar size={16} color="gray" />
                    <p className="text-xs text-gray-500">
                      {formatDate(todo.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{todo.description}</p>
              </div>
            </GlassContainer>
          );
        })}
      </div>

      <GlassContainer className="bg-white-20 flex items-center justify-between p-2 rounded-xl h-14">
        {/*<p className="text-lg font-bold">نوشتن کار جدید</p>*/}
        <input className={"border-0"} placeholder={"نوشتن کار جدید"}/>
        <div className="h-10 w-10 bg-blue-600 rounded-2xl flex justify-center items-center">
          <IconPlus color="white" size={20} onClick={() => setIsCreateTodoModalOpen(true)} />
        </div>
      </GlassContainer>
    </GlassContainer>

      </>
  );
}
