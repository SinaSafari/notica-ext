"use client";
import { GlassContainer } from "@/components/glass-container";
import { IconCategory, IconPlus } from "@tabler/icons-react";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { AddBookmarkModal } from "./add-bookmark-modal";

export function LinocaSection() {
  const { toggleLinocaShown, bookmarks } = useAppState(
    useShallow((state) => {
      return {
        linocaShown: state.linocaShown,
        toggleLinocaShown: state.toggleLinocaShown,
        bookmarks: state.bookmarks,
      };
    })
  );

  console.log({ bookmarks, l: bookmarks.length });

  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  return (
    <>
      <Modal
        onClose={() => setIsAddBookmarkOpen(false)}
        isOpen={isAddBookmarkOpen}
      >
        <AddBookmarkModal onClose={() => setIsAddBookmarkOpen(false)} />
      </Modal>

      <div className="flex flex-row justify-start gap-4 items-stretch overflow-y-hidden overflow-x-scroll no-scrollbar">
        <GlassContainer
          className="flex flex-col justify-center items-center w-24 h-24 bg-white"
          onClick={() => toggleLinocaShown()}
        >
          <IconCategory size={30} color="blue" />
          <p className="text-xs">لینوکا</p>
        </GlassContainer>
        {bookmarks.length === 0 ? (
          <>
            <GlassContainer
              className="w-24 h-24 flex items-center justify-center"
              onClick={() => {
                setIsAddBookmarkOpen(true);
              }}
            >
              <IconPlus />
            </GlassContainer>
          </>
        ) : (
          <>
            {bookmarks
              .map((i) => {
                return (
                  <GlassContainer
                    className="flex flex-col justify-center items-center w-24 h-24 bg-white gap-2"
                    onClick={() => {
                      window.location.href = i.link;
                    }}
                  >
                    <img className="w-8 h-8" src={i.favicon} />
                    <p className="text-xs">{i.title}</p>
                  </GlassContainer>
                );
              })
              .concat(
                <GlassContainer
                  className="w-24 h-24 flex items-center justify-center"
                  onClick={() => {
                    setIsAddBookmarkOpen(true);
                  }}
                >
                  <IconPlus />
                </GlassContainer>
              )}
          </>
        )}
      </div>
    </>
  );
}
