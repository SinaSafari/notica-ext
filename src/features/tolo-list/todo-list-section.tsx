"use client";

import { GlassContainer } from "@/components/glass-container";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import {
  useAppState,
  type TagType,
  type TodoItem,
  type TodoStatus,
} from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { Modal } from "@/components/modal.tsx";
import { Controller, useForm } from "react-hook-form";
import { UpdateTodoModal } from "./update-todo-modal";

function formatDate(date: Date) {
  return date.toLocaleDateString("fa-IR", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
}

export function TodoListSection() {
  const { todos, createTodo, toggleStatus } = useAppState(
    useShallow((state) => {
      return {
        todos: state.todos,
        createTodo: state.createTodo,
        deleteTodo: state.deleteTodo,
        toggleStatus: state.toggleStatus,
      };
    })
  );
  // const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  const [isCreateTodoFieldOpen, setIsCreateTodoFieldOpen] = useState(false);
  const [selectedTodoTag, setSelectedTodoTag] = useState<TagType>("urgent");

  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>();
  const [isUpdateTodoModalOpen, setIsUpdateTodoModalOpen] = useState(false);

  const [selectedSortFilter, setSelectedSortFilter] = useState<TagType | "all">(
    "all"
  );

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tag: "red",
    },
  });

  function sorter(todos: Array<TodoItem>, by: TagType | "all") {
    if (selectedSortFilter === "all") {
      return todos;
    }
    const top = todos.filter((i) => i.tag === by);
    const rest = todos.filter((i) => i.tag !== by);
    return top.concat(rest);
  }

  return (
    <>
      <Modal
        onClose={() => setIsUpdateTodoModalOpen(false)}
        isOpen={isUpdateTodoModalOpen}
      >
        <UpdateTodoModal
          // onClose={() => setIsCreateTodoModalOpen(false)}
          // defaultTitle={taskTitle}
          onClose={() => setIsUpdateTodoModalOpen(false)}
          todo={selectedTodo!}
        />
      </Modal>

      <GlassContainer className="flex p-3 flex-col justify-between items-stretch h-full gap-4 w-full">
        <GlassContainer className="bg-white-20 flex items-center justify-between h-[50px]">
          <p className="text-lg font-bold">کارهای امروز</p>
          <div className="flex justify-end items-center gap-1">
            <div
              className={`h-3 w-3 bg-red-500 rounded-full hover:bg-red-600 ${selectedSortFilter === "urgent" ? "ring-1 to-blue-600" : ""
                }`}
              onClick={(e) => {
                e.preventDefault();
                if (selectedSortFilter === "urgent") {
                  setSelectedSortFilter("all");
                  return;
                }
                setSelectedSortFilter("urgent");
              }}
            ></div>
            <div
              className={`h-3 w-3 bg-green-500 rounded-full hover:bg-green-600 ${selectedSortFilter === "not-force" ? "ring-1 to-blue-600" : ""
                }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedSortFilter === "not-force") {
                  setSelectedSortFilter("all");
                  return;
                }
                setSelectedSortFilter("not-force");
              }}
            ></div>
            <div
              className={`h-3 w-3 bg-yellow-500 rounded-full hover:bg-yellow-600 ${selectedSortFilter === "moderate" ? "ring-1 to-blue-600" : ""
                }`}
              onClick={(e) => {
                e.preventDefault();
                if (selectedSortFilter === "moderate") {
                  setSelectedSortFilter("all");
                  return;
                }
                setSelectedSortFilter("moderate");
              }}
            ></div>
          </div>
        </GlassContainer>

        <div className="grow flex flex-col items-stretch justify-start gap-2 overflow-y-scroll no-scrollbar ">
          {sorter(todos, selectedSortFilter).map((todo) => {
            return (
              <GlassContainer
                key={todo.id.toString()}
                className={`flex justify-between items-stretch gap-4 rounded-xl hover:bg-white dark:hover:bg-slate-900 ${todo.status === "done" ? "bg-white/5 dark:bg-slate-500/20" : ""
                  }`}
              >
                <div className="h-full w-4 flex flex-col justify-around items-center gap-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={todo.status === "done"}
                    onClick={(e) => {
                      const newTodoStatus: TodoStatus =
                        todo.status === "done" ? "pending" : "done";

                      toggleStatus(todo.id, newTodoStatus);
                    }}
                  />
                  {todo.tag !== null || todo.tag !== "" ? (
                    <div
                      className={`h-3 w-3 ${todo.tag === "urgent"
                        ? "bg-red-500 "
                        : todo.tag === "moderate"
                          ? "bg-yellow-500"
                          : todo.tag === "not-force"
                            ? "bg-green-500"
                            : "bg-transparent"
                        } rounded-xl text-center`}
                    ></div>
                  ) : null}
                </div>
                <div
                  className={`grow flex flex-col justify-between items-stretch gap-2`}
                  onClick={(e) => {
                    console.log("card clicked");

                    setSelectedTodo(todo);
                    setIsUpdateTodoModalOpen(true);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-sm font-bold overflow-x-hidden max-w-[100px] whitespace-nowrap overflow-ellipsis ${todo.status === "done" ? "text-black-10 dark:text-slate-400/50" : ""
                        }`}
                    >
                      {todo.title}
                    </p>

                    <div className="flex justify-end items-center gap-1">
                      <IconCalendar size={16} color="gray" />
                      <p
                        className={`text-xs  ${todo.status === "done"
                          ? "text-black/10 dark:text-slate-400/30"
                          : "text-gray-500 dark:text-slate-400"
                          }`}
                      >
                        {todo.createdAt ? (
                          <>{formatDate(new Date(todo.createdAt))}</>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm  overflow-x-hidden max-w-[200px] whitespace-nowrap overflow-ellipsis ${todo.status === "done" ? "text-black/10 dark:text-slate-400/30" : "text-gray-500"
                      }`}
                  >
                    {todo.description}
                  </p>
                </div>
              </GlassContainer>
            );
          })}
        </div>

        {isCreateTodoFieldOpen ? (
          <>
            <GlassContainer
              className={`bg-white-20 flex-col flex items-strech p-3 rounded-3xl`}
            >
              <GlassContainer className="my-2 p-2 text-xs rounded-lg">
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <input
                        className={"border-0 w-full outline-0"}
                        placeholder={"عنوان کار جدید"}
                        onChange={field.onChange}
                        value={field.value}
                        maxLength={50}
                      />
                    );
                  }}
                />
              </GlassContainer>

              <GlassContainer className="my-2 rounded-xl text-xs">
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <textarea
                        className={"border-0 w-full outline-0 resize-none"}
                        placeholder={"توضیحات"}
                        rows={2}
                        wrap="hard"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    );
                  }}
                />
              </GlassContainer>

              <div className="flex justify-end items-stretch gap-2">
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-start gap-1">
                    <div
                      className={`h-4 w-4 bg-red-500 hover:bg-red-600 rounded-full border ${selectedTodoTag === "urgent"
                        ? "border-blue-600"
                        : "border-transparent"
                        }`}
                      onClick={() => setSelectedTodoTag("urgent")}
                    ></div>
                    <div
                      className={`h-4 w-4 bg-yellow-500 hover:bg-yellow-600 rounded-full border ${selectedTodoTag === "moderate"
                        ? "border-blue-600"
                        : "border-transparent"
                        }`}
                      onClick={() => setSelectedTodoTag("moderate")}
                    ></div>
                    <div
                      className={`h-4 w-4 bg-green-500 hover:bg-green-600 rounded-full border ${selectedTodoTag === "not-force"
                        ? "border-blue-600"
                        : "border-transparent"
                        }`}
                      onClick={() => setSelectedTodoTag("not-force")}
                    ></div>
                  </div>
                </div>
                <div
                  className={`h-10 w-10 rounded-4xl flex justify-center items-center ${form.getValues().title === ""
                    ? "bg-gray-400 "
                    : "bg-blue-600 "
                    }`}
                >
                  <IconPlus
                    color="white"
                    size={20}
                    onClick={() => {
                      // setIsCreateTodoModalOpen(true)
                      // setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen);
                      const { title, description } = form.getValues();

                      if (title.trim()) {
                        createTodo(
                          title,
                          description,
                          selectedTodoTag,
                          new Date(),
                          "pending",
                          new Date()
                        );
                        form.reset();
                      }

                      setIsCreateTodoFieldOpen(false);
                    }}
                  />
                </div>
              </div>
            </GlassContainer>
          </>
        ) : (
          <>
            <GlassContainer
              className={`bg-white-20 flex items-center justify-between p-2 rounded-4xl h-14`}
              onClick={() => setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen)}
            >
              {/*<p className="text-lg font-bold">نوشتن کار جدید</p>*/}
              <div
                onSubmit={(e) => {
                  e.preventDefault();
                  // setIsCreateTodoModalOpen(true);
                }}
              // onClick={() => setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen)}
              >
                <p>نوشتن تسک جدید</p>
                {/* <input
                  className={"border-0 w-full outline-0"}
                  placeholder={"نوشتن کار جدید"}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  value={taskTitle}
                  disabled
                />
                <input type="submit" className="hidden" /> */}
              </div>

              <div className="h-10 w-10 bg-blue-600 rounded-4xl flex justify-center items-center hover:bg-blue-700">
                <IconPlus
                  color="white"
                  size={20}
                  onClick={() => {
                    // setIsCreateTodoModalOpen(true)
                    // setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen);
                  }}
                />
              </div>
            </GlassContainer>
          </>
        )}
      </GlassContainer>
    </>
  );
}
