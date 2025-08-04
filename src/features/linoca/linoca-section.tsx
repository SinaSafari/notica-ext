"use client";
import { GlassContainer } from "@/components/glass-container";
import { IconCategory, IconPlus } from "@tabler/icons-react";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";

export function LinocaSection() {
  const { toggleLinocaShown } = useAppState(
    useShallow((state) => {
      return {
        linocaShown: state.linocaShown,
        toggleLinocaShown: state.toggleLinocaShown,
      };
    })
  );

  return (
    <div className="flex flex-row justify-start gap-4 items-stretch overflow-y-hidden overflow-x-scroll no-scrollbar">
      <GlassContainer
        className="flex flex-col justify-center items-center w-24 h-24 bg-white"
        onClick={() => toggleLinocaShown()}
      >
        <IconCategory size={30} color="blue" />
        <p className="text-xs">لینوکا</p>
      </GlassContainer>
      {Array.from({ length: 12 })
        .fill(crypto.randomUUID())
        .map((i) => {
          return (
            <GlassContainer
              key={i}
              className="w-24 h-24 flex items-center justify-center"
            >
              <IconPlus />
            </GlassContainer>
          );
        })}
    </div>
  );
}
