"use client";

import { useAppState, type TagType } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

type CreateTodoModalProps = {
  onClose: () => void;
  defaultTitle: string;
};

export function CreateTodoModal(props: CreateTodoModalProps) {
  const [taskTitle, setTaskTitle] = useState(props.defaultTitle);
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType>("moderate");

  const { createTodo } = useAppState(
    useShallow((state) => {
      return {
        createTodo: state.createTodo,
      };
    })
  );
  return (
    <>
      <div
        className={
          "w-[768px] h-[367px] rounded-2xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"
        }
      >
        <div
          className={
            "rounded-xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 h-full p-2"
          }
        >
          <div className={"flex-1 items-stretch gap-4 p-4"}>
            <p>ایجاد تسک جدید</p>
            <div>
              <label htmlFor={"title"} className={"text-right text-xs"}>
                عنوان تسک
              </label>
              <input
                type={"text"}
                name={"title"}
                className={
                  "text-sm rounded border-slate-300 dark:bg-slate-700 dark:border-slate-600 outline-0 border-[1px] w-full px-3 py-1"
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

            <div className="flex items-stretch gap-4 my-4">
              <div
                onClick={() => setSelectedTag("urgent")}
                className={`border  rounded-lg p-3 flex items-center gap-1 cursor-pointer ${selectedTag === "urgent"
                  ? "border-blue-500"
                  : "border-gray-300"
                  }`}
              >
                <div className="rounded-full bg-red-500 h-4 w-4"></div>
                <div className="flex-1">
                  <p className="text-sm">فوری</p>
                </div>
              </div>
              <div
                onClick={() => setSelectedTag("moderate")}
                className={`border  rounded-lg p-3 flex items-center gap-1 cursor-pointer ${selectedTag === "moderate"
                  ? "border-blue-500"
                  : "border-gray-300"
                  }`}
              >
                <div className="rounded-full bg-yellow-500 h-4 w-4"></div>
                <div className="flex-1">
                  <p className="text-sm">مهم</p>
                </div>
              </div>
              <div
                onClick={() => setSelectedTag("not-force")}
                className={`border  rounded-lg p-3 flex items-center gap-1 cursor-pointer ${selectedTag === "not-force"
                  ? "border-blue-500"
                  : "border-gray-300"
                  }`}
              >
                <div className="rounded-full bg-green-600 h-4 w-4"></div>
                <div className="flex-1">
                  <p className="text-sm">اگر شد</p>
                </div>
              </div>
            </div>
          </div>

          <div className={"max-h-[52px] flex flex-row-reverse"}>
            <button
              className={
                "bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              }
              onClick={() => {
                if (taskTitle) {
                  createTodo(
                    taskTitle,
                    taskDescription,
                    selectedTag,
                    new Date(),
                    "pending",
                    new Date()
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
