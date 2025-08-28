import { GlassContainer } from "@/components/glass-container.tsx";
import { useAppState, type Chore } from "@/store";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

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

  return (
    <>
      <div className="h-full w-full flex items-center gap-2 justify-between flex-nowrap">
        {currentChores.map((c) => {
          if (c.icon) {
            return (
              <GlassContainer
                className={`w-[53px] h-[56px] rounded-2xl flex items-center justify-center ${
                  activeChores.includes(c.icon)
                    ? "ring-4 ring-blue-600"
                    : "ring-4 ring-transparent"
                }`}
                onClick={() => setIsChoreModalOpen(true)}
              >
                <img src={c.icon} className="w-6 h-6" />
              </GlassContainer>
            );
          }

          return (
            <GlassContainer
              className={`w-[53px] h-[56px] rounded-2xl flex items-center justify-center ring-4 ring-transparent`}
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
