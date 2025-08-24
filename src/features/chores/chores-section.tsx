import { GlassContainer } from "@/components/glass-container.tsx";
import { useAppState } from "@/store";
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

  return (
    <>
      <div className="h-full w-full flex items-center gap-2 justify-between flex-nowrap">
        {chores.map((c) => {
          return (
            <GlassContainer
              className="w-[53px] h-[56px] rounded-2xl flex items-center justify-center"
              onClick={() => setIsChoreModalOpen(true)}
            >
              <img src={c.icon} className="w-6 h-6" />
            </GlassContainer>
          );
        })}
      </div>
    </>
  );
}
