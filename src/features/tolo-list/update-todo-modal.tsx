"use client";

import { useAppState, type TagType, type TodoItem } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

type CreateTodoModalProps = {
  onClose: () => void;
  todo: TodoItem;
};

export function UpdateTodoModal(props: CreateTodoModalProps) {
  const [taskTitle, setTaskTitle] = useState(props.todo.title);
  const [taskDescription, setTaskDescription] = useState(
    props.todo.description
  );
  const [selectedTag, setSelectedTag] = useState<TagType>(props.todo.tag);

  const { updateTodo, deleteTodo } = useAppState(
    useShallow((state) => {
      return {
        createTodo: state.createTodo,
        updateTodo: state.updateTodo,
        deleteTodo: state.deleteTodo,
      };
    })
  );

  return (
    <>
      <div
        className={
          "w-[768px] h-[367px] rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-stretch justify-between p-4 gap-4"
        }
      >
        <div
          className={
            "rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 dark:text-white dark:ring-slate-600  flex-1 ring-1  ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 h-full p-2"
          }
        >
          <div className={"flex-1 items-stretch gap-4 p-4"}>
            <div>
              <label htmlFor={"title"} className={"text-right text-xs"}>
                عنوان تسک
              </label>
              <input
                type={"text"}
                name={"title"}
                className={
                  "text-sm rounded-lg border-slate-300 dark:bg-slate-700 dark:border-slate-600 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"عنوان تسک شما"}
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={"description"} className={"text-right text-xs"}>
                توضیحات تسک
              </label>
              <input
                type={"text"}
                name={"description"}
                className={
                  "text-sm rounded-lg border-slate-300 dark:bg-slate-700 dark:border-slate-600 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"توضیحات تسک شما"}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            <div className="flex items-stretch flex-row-reverse gap-2 my-4">
              <div
                className={`rounded-full bg-red-500 h-4 w-4 border ${selectedTag === "urgent"
                  ? "border-blue-500"
                  : "border-red-500"
                  }`}
                onClick={() => setSelectedTag("urgent")}
              ></div>
              <div
                className={`rounded-full bg-yellow-500 h-4 w-4 border ${selectedTag === "moderate"
                  ? "border-blue-500"
                  : "border-yellow-500"
                  }`}
                onClick={() => setSelectedTag("moderate")}
              ></div>
              <div
                className={`rounded-full bg-green-500 h-4 w-4 border ${selectedTag === "not-force"
                  ? "border-blue-500"
                  : "border-green-500"
                  }`}
                onClick={() => setSelectedTag("not-force")}
              ></div>
            </div>
          </div>

          <div className={"max-h-[52px] flex flex-row-reverse gap-4"}>
            <button
              className={
                "bg-red-600 rounded-xl text-white px-10 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              }
              onClick={() => {
                deleteTodo(props.todo.id);
                props.onClose();
              }}
              disabled={taskTitle == ""}
            >
              حذف
            </button>
            <button
              className={
                "bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              }
              onClick={() => {
                if (taskTitle.trim()) {
                  updateTodo(
                    props.todo.id,
                    taskTitle,
                    taskDescription,
                    selectedTag,
                    props.todo.dueDate,
                    "pending"
                  );
                }
                props.onClose();
              }}
              disabled={taskTitle == ""}
            >
              ذخیره
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
