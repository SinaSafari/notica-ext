import { GlassContainer } from "@/components/glass-container";
import { useAppState, type Chore } from "@/store";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const defaultChores: Array<Chore> = [
  {
    icon: "/chore/Brake.svg",
    time: "",
    hour: "",
    minute: "",
  },
  {
    icon: "/chore/Breakfast.svg",
    time: "",
    hour: "",
    minute: "",
  },
  {
    icon: "/chore/Coffee.svg",
    time: "",
    hour: "",
    minute: "",
  },
  {
    icon: "/chore/Food.svg",
    time: "",
    hour: "",
    minute: "",
  },
  {
    icon: "/chore/Pill.svg",
    time: "",
    hour: "",
    minute: "",
  },
  {
    icon: "/chore/Smooking.svg",
    time: "",
    hour: "",
    minute: "",
  },
];

type ChoreSettingModalProps = {
  onClose: () => void;
};

export function ChoreSettingModal({ onClose }: ChoreSettingModalProps) {
  const { chores, addChore, deleteChore } = useAppState(
    useShallow((state) => {
      return {
        chores: state.chores,
        addChore: state.addChore,
        deleteChore: state.deleteChore,
      };
    })
  );

  console.log({ chores });

  const [selectedChore, setSelectedChore] = useState<string>(() => {
    return chores.at(0)?.icon || "/chore/Brake.svg";
  });
  return (
    <>
      <div
        className={
          "w-[768px] h-[367px] rounded-2xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"
        }
      >
        <div
          className={
            "rounded-2xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 p-2"
          }
        >
          <p className="text-xl "> مدیریت کارهای روزانه</p>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {defaultChores.map((c) => {
                return (
                  <GlassContainer
                    className={`w-[56px] h-[56px] rounded-4xl flex items-center justify-center border  ${c.icon === selectedChore
                      ? "border-blue-600 border-2"
                      : "border-slate-400"
                      }`}
                    onClick={() => {
                      setSelectedChore(c.icon);
                    }}
                  >
                    <img src={c.icon} className="w-6 h-6" />
                  </GlassContainer>
                );
              })}
            </div>

            {defaultChores.map((c) => {
              const alreadyRegisteredChore = chores.find(
                (i) => i.icon === c.icon
              );
              let ch = c;
              if (alreadyRegisteredChore) {
                ch = alreadyRegisteredChore;
              }

              return (
                <>
                  <div
                    className={`flex items-center justify-between w-full gap-4 ${c.icon === selectedChore ? "" : "hidden"
                      }`}
                  >
                    <div className="flex-1">
                      <label>ساعت</label>
                      <select
                        className="w-full rounded-xl border border-slate-300 p-2"
                        value={ch.hour || "00"}
                        onChange={(e) =>
                          addChore({ ...ch, hour: e.target.value })
                        }
                      >
                        {Array.from({ length: 25 }).map((_, i) => {
                          return (
                            <option
                              value={String(i).length === 1 ? `0${i}` : i}
                            >
                              {String(i).length === 1 ? `0${i}` : i}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label>دقیقه</label>
                      <select
                        className="w-full rounded-xl border border-slate-300 p-2"
                        value={ch.minute || "00"}
                        onChange={(e) =>
                          addChore({ ...ch, minute: e.target.value })
                        }
                      >
                        {Array.from({ length: 60 }).map((_, i) => {
                          return (
                            <option
                              value={String(i).length === 1 ? `0${i}` : i}
                            >
                              {String(i).length === 1 ? `0${i}` : i}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div
                    className={`flex justify-end items-center w-full my-4 ${c.icon === selectedChore ? "" : "hidden"
                      }`}
                  >
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white rounded-4xl px-4 py-2"
                      onClick={() => {
                        deleteChore(ch.icon);
                        onClose();
                      }}
                    >
                      حذف تایمر کار های روزانه
                    </button>
                  </div>
                </>
              );
            })}
          </div>

          <div className={"max-h-[52px] flex flex-row-reverse"}>
            <button
              className={"bg-blue-600 hover:bg-blue-700 rounded-4xl text-white px-10 py-2"}
              onClick={() => {
                onClose();
              }}
            >
              ذخیره
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
