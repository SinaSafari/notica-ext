import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

type ChoreSettingModalProps = {
  onClose: () => void;
};

export function ChoreSettingModal({ onClose }: ChoreSettingModalProps) {
  const { chores, addChore } = useAppState(
    useShallow((state) => {
      return {
        chores: state.chores,
        addChore: state.addChore,
      };
    })
  );

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
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              {chores.map((c) => {
                return (
                  <GlassContainer
                    className={`w-[53px] h-[56px] rounded-2xl flex items-center justify-center border  ${
                      c.icon === selectedChore
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

            {chores.map((c) => {
              console.log({ as: c.icon === selectedChore });

              return (
                <>
                  <div
                    className={`flex items-center justify-between w-full gap-4 ${
                      c.icon === selectedChore ? "" : "hidden"
                    }`}
                  >
                    <div className="flex-1">
                      <label>ساعت</label>
                      <select
                        className="w-full rounded-xl border border-slate-300 p-2"
                        value={c.hour || "00"}
                        onChange={(e) =>
                          addChore({ ...c, hour: e.target.value })
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
                        value={c.minute || "00"}
                        onChange={(e) =>
                          addChore({ ...c, minute: e.target.value })
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
                </>
              );
            })}
          </div>

          <div className={"max-h-[52px] flex flex-row-reverse"}>
            <button
              className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
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
