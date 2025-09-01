import { GlassContainer } from "@/components/glass-container.tsx";
import { useAppState, type Chore } from "@/store";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { IconBattery2 } from '@tabler/icons-react';

// import { BrakeSvg } from "./icons/brake-svg";
// import { BreakfastSvg } from "./icons/breakfast-svg";
// import { CoffeeSvg } from "./icons/coffee-svg";
// import { FoodSvg } from "./icons/food-svg";
// import { PillSvg } from "./icons/pill-svg";
// import { SmookingSvg } from "./icons/smooking-svg";

// const choreIconMapper = {
//   "/chore/Brake.svg": BrakeSvg,
//   "/chore/Breakfast.svg": BreakfastSvg,
//   "/chore/Coffee.svg": CoffeeSvg,
//   "/chore/Food.svg": FoodSvg,
//   "/chore/Pill.svg": PillSvg,
//   "/chore/Smooking.svg": SmookingSvg,
// };

type ChoresSection = {
  isChoreModalOpen: boolean;
  setIsChoreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ChoresSection({
  isChoreModalOpen,
  setIsChoreModalOpen,
}: ChoresSection) {
  const { chores } = useAppState(
    useShallow((state) => {
      return {
        chores: state.chores,
      };
    })
  );

  const [activeChores, setActiveChores] = useState<Array<string>>([]);
  const [currentChores, setCurrentChores] = useState<Array<Chore>>(() => {
    const l = chores.length;
    if (l >= 6) {
      return chores;
    }

    return [
      ...chores,
      ...Array.from({ length: 6 - l }).fill({
        icon: "",
        hour: "",
        minute: "",
        time: "",
      } as Chore),
    ] as Array<Chore>;
  });

  useEffect(() => {
    let newChore = [];
    const l = chores.length;
    if (l >= 6) {
      newChore = chores;
    }
    newChore = [
      ...chores,
      ...Array.from({ length: 6 - l }).fill({
        icon: "",
        hour: "",
        minute: "",
        time: "",
      } as Chore),
    ] as Array<Chore>;
    setCurrentChores(newChore);
  }, [chores]);

  useEffect(() => {
    const choresInterval = setInterval(() => {
      setActiveChores([]);
      const d = new Date();
      chores.forEach((i) => {
        if (i.hour && d.getHours() === Number(i.hour)) {
          setActiveChores((prev) => prev.concat(i.icon));
        }
      });
    }, 6000);

    return () => clearInterval(choresInterval);
  }, []);

  console.log({ currentChores });

  return (
    <>
      <div className="h-full w-full flex items-center gap-2 justify-between flex-nowrap">
        {currentChores.map((c) => {
          if (c.icon) {
            if (activeChores.includes(c.icon)) {
              return (
                <div className="relative flex justify-center items-center">
                  <div className="absolute">
                    <div className="flex w-[56px] h-[56px] rounded-4xl justify-center items-center relative">
                      {/* <div className="w-[110%] h-[110%] shadow-sm shadow-pink-500 bg-transparent rounded-4xl absolute "></div>
                      <div className="w-[108%] h-[108%] shadow-sm shadow-violet-500 bg-transparent rounded-4xl absolute rotate-90"></div>
                      <div className="w-[106%] h-[106%] shadow-sm shadow-cyan-500 bg-transparent rounded-4xl absolute rotate-180"></div> */}
                    </div>
                  </div>

                  <GlassContainer
                    className={`w-[56px] h-[56px] rounded-4xl bg-blue-600 dark:bg-blue-700 flex items-center justify-center`}
                    onClick={() => setIsChoreModalOpen(true)}
                  >
                    <img src={c.icon} className="w-6 h-6" />
                  </GlassContainer>
                </div>
              );
              // return (
              //   <GlassContainer
              //     className={`w-[53px] h-[56px] rounded-2xl flex items-center justify-center ${
              //       activeChores.includes(c.icon)
              //         ? "ring-4 ring-blue-600"
              //         : "ring-4 ring-transparent"
              //     }`}
              //     onClick={() => setIsChoreModalOpen(true)}
              //   >
              //     <img src={c.icon} className="w-6 h-6" />
              //   </GlassContainer>
              // );
            } else {
              return (
                <GlassContainer
                  className={`group w-[56px] h-[56px] rounded-4xl flex items-center justify-center hover:bg-white dark:hover:bg-slate-900 ${activeChores.includes(c.icon)
                    ? "ring-4 ring-blue-600"
                    : "ring-4 ring-transparent"
                    }`}
                  onClick={() => setIsChoreModalOpen(true)}
                >
                  <img src={c.icon} className="w-6 h-6" />
                </GlassContainer>
              );
            }
          }

          return (
            <GlassContainer
              className={`w-[56px] h-[56px] rounded-4xl flex items-center justify-center ring-4 ring-transparent hover:bg-white dark:hover:bg-slate-900`}
              onClick={() => setIsChoreModalOpen(true)}
            >
              <IconPlus className="w-6 h-6" />
              {/* <img src={c.icon} className="w-6 h-6" /> */}
            </GlassContainer>
          );
        })}
      </div>
    </>
  );
}
