"use client";

import { GlassContainer } from "@/components/glass-container";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useAppState, type TagType } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { Modal } from "@/components/modal.tsx";
import { CreateTodoModal } from "@/features/tolo-list/create-todo-modal.tsx";
import { Controller, useForm } from "react-hook-form";

function formatDate(date: Date) {
  return date.toLocaleDateString("fa-IR", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  });
}

export function TodoListSection() {
  const { todos, createTodo } = useAppState(
    useShallow((state) => {
      return {
        todos: state.todos,
        createTodo: state.createTodo,
      };
    })
  );
  const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);
  const [isCreateTodoFieldOpen, setIsCreateTodoFieldOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTodoTag, setSelectedTodoTag] = useState<TagType>("urgent");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tag: "red",
    },
  });
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

        {isCreateTodoFieldOpen ? (
          <>
            <GlassContainer
              className={`bg-white-20 flex-col flex items-strech justify-between p-2 rounded-xl h-50`}
            >
              <GlassContainer className="my-2 p-2 text-xs rounded-2xl">
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
                      />
                    );
                  }}
                />
              </GlassContainer>

              <GlassContainer className="my-2 p-2 rounded-2xl text-xs">
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
                  <div className="flex items-center justify-start gap-2">
                    <div
                      className={`h-4 w-4 bg-red-500 rounded-full border ${
                        selectedTodoTag === "urgent"
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedTodoTag("urgent")}
                    ></div>
                    <div
                      className={`h-4 w-4 bg-yellow-500 rounded-full border ${
                        selectedTodoTag === "moderate"
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedTodoTag("moderate")}
                    ></div>
                    <div
                      className={`h-4 w-4 bg-green-500 rounded-full border ${
                        selectedTodoTag === "not-force"
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedTodoTag("not-force")}
                    ></div>
                  </div>
                </div>
                <div className="h-10 w-10 bg-blue-600 rounded-2xl flex justify-center items-center">
                  <IconPlus
                    color="white"
                    size={20}
                    onClick={() => {
                      // setIsCreateTodoModalOpen(true)
                      // setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen);
                      const { title, description } = form.getValues();

                      createTodo(
                        title,
                        description,
                        selectedTodoTag,
                        new Date(),
                        "pending",
                        new Date()
                      );
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
              className={`bg-white-20 flex items-center justify-between p-2 rounded-xl h-14`}
            >
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
                  onClick={() => {
                    // setIsCreateTodoModalOpen(true)
                    setIsCreateTodoFieldOpen(!isCreateTodoFieldOpen);
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
