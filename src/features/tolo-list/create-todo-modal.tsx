"use client"

import {useAppState} from "@/store.ts";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";

type CreateTodoModalProps = {
    onClose: () => void;
}

export function CreateTodoModal(props: CreateTodoModalProps) {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const {createTodo, updateTodo} = useAppState(useShallow(state => {
	return {
	    createTodo: state.createTodo,
	    updateTodo: state.updateTodo,
	}
    }))
    return (
	<>
	    <div
		className={"w-[768px] h-[367px] rounded-2xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"}>
		<div
		    className={"rounded-xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 h-full p-2"}>
		    <div className={"flex-1 items-stretch gap-4 p-4"}>
			<p>ایجاد تسک جدید</p>
			<div>
			    <label htmlFor={"title"} className={"text-right text-xs"}>عنوان تسک</label>
			    <input type={"text"} name={"title"}
				   className={"text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"}
				   placeholder={"عنوان تسک شما شما"}
			    value={taskTitle}
			    onChange={(e) => setTaskTitle(e.target.value)}/>
			</div>
			<div>
			    <label htmlFor={"description"} className={"text-right text-xs"}>توضیحات تسک</label>
			    <input type={"text"} name={"description"}
				   className={"text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"}
				   placeholder={"توضیحات تسک شما شما"}
			    value={taskDescription}
			    onChange={(e) => setTaskDescription(e.target.value)}/>
			</div>

		    </div>

		    <div className={"max-h-[52px] flex flex-row-reverse"}>
			<button className={"bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer"}
				onClick={() => {

				    createTodo(taskTitle, taskDescription, new Date(), "pending", new Date())
				    props.onClose();
				}}>ذخیره
			</button>
		    </div>
		</div>

	    </div>
	</>
    )
}