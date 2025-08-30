import { useAppState } from "@/store";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

type AddBookmarkModalProps = {
  onClose: () => void;
};

export function AddBookmarkModal(props: AddBookmarkModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const { addBookMark } = useAppState(
    useShallow((state) => {
      return {
        addBookMark: state.addBookMark,
      };
    })
  );
  return (
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
          <p>ایجاد بوکمارک جدید</p>
          <div>
            <label htmlFor={"title"} className={"text-right text-xs"}>
              عنوان
            </label>
            <input
              type={"text"}
              name={"title"}
              className={
                "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
              }
              placeholder={"عنوان بوکمارک شما"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={"description"} className={"text-right text-xs"}>
              لینک
            </label>
            <input
              type={"text"}
              name={"description"}
              className={
                "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
              }
              placeholder={"لینک بوکمارک (بدون Https)"}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>

        <div className={"max-h-[52px] flex flex-row-reverse"}>
          <button
            className={
              "bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer"
            }
            onClick={() => {
              addBookMark({
                id: crypto.randomUUID(),
                link: "https://" + link,
                title: title,
                favicon: `${link}/favicon.ico`,
              });
              props.onClose();
            }}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
