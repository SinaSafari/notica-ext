"use client";
import { GlassContainer } from "@/components/glass-container";
import { IconCategory } from "@tabler/icons-react";
import {useAppState} from "@/store.ts";
import {useShallow} from "zustand/react/shallow";

export function LinocaSection() {
    const {toggleLinocaShown} = useAppState(useShallow(state => {
        return {
            linocaShown: state.linocaShown,
            toggleLinocaShown: state.toggleLinocaShown
        }
    }))


  return (
    <div className="flex flex-row justify-start gap-4 items-stretch">
      <GlassContainer className="flex flex-col justify-center items-center w-24 h-24 bg-white" onClick={() => toggleLinocaShown()}>
        <IconCategory size={30} color="blue" />
        <p className="text-xs">لینوکا</p>
      </GlassContainer>

    </div>
  );
}
