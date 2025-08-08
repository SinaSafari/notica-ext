"use client";

import { GlassContainer } from "@/components/glass-container";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { Modal } from "@/components/modal.tsx";
import { CreateTodoModal } from "@/features/tolo-list/create-todo-modal.tsx";

function formatDate(date: Date) {
  return date.toLocaleDateString("fa-IR", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
}

export function TodoListSection() {
  const { todos } = useAppState(
    useShallow((state) => {
      return {
        todos: state.todos,
      };
    })
  );
  const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  console.log({ todos });

  return (
    <>
      <Modal
        onClose={() => setIsCreateTodoModalOpen(false)}
        isOpen={isCreateTodoModalOpen}
      >
        <CreateTodoModal
          onClose={() => setIsCreateTodoModalOpen(false)}
          defaultTitle={taskTitle}
        />
      </Modal>

      <GlassContainer className="flex flex-col justify-between items-stretch h-full gap-4">
        <GlassContainer className="bg-white-20 flex items-center justify-between  rounded-2xl">
          <p className="text-lg font-bold">کارهای امروز</p>
          <div className="flex justify-end items-center gap-2">
            <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            <div className="h-4 w-4 bg-yellow-300 rounded-full"></div>
          </div>
        </GlassContainer>

        <div className="grow flex flex-col items-stretch justify-start gap-4">
          {todos.map((todo) => {
            return (
              <GlassContainer
                key={todo.id.toString()}
                className="flex justify-between items-stretch gap-4 rounded-xl bg-white-20"
              >
                <div className="h-full w-4 flex flex-col justify-around items-center gap-4">
                  <input type="checkbox" className="w-4 h-4" />
                  {todo.tag !== null || todo.tag !== "" ? (
                    <div
                      className={`h-3 w-3 ${
                        todo.tag === "urgent"
                          ? "bg-red-500"
                          : todo.tag === "moderate"
                          ? "bg-yellow-500"
                          : todo.tag === "not-force"
                          ? "bg-green-500"
                          : "bg-transparent"
                      } rounded-xl text-center`}
                    ></div>
                  ) : null}
                </div>
                <div className="grow flex flex-col justify-between items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">{todo.title}</p>

                    <div className="flex justify-end items-center gap-2">
                      <IconCalendar size={16} color="gray" />
                      <p className="text-xs text-gray-500">
                        {todo.createdAt ? (
                          <>{formatDate(new Date(todo.createdAt))}</>
                        ) : (
                          <></>
                        )}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsCreateTodoModalOpen(true);
            }}
          >
            <input
              className={"border-0 w-full outline-0"}
              placeholder={"نوشتن کار جدید"}
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taskTitle}
            />
            <input type="submit" className="hidden" />
          </form>

          <div className="h-10 w-10 bg-blue-600 rounded-2xl flex justify-center items-center">
            <IconPlus
              color="white"
              size={20}
              onClick={() => setIsCreateTodoModalOpen(true)}
            />
          </div>
        </GlassContainer>
      </GlassContainer>
    </>
  );
}
