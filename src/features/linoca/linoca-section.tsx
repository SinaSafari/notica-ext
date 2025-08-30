"use client";
import { GlassContainer } from "@/components/glass-container";
import {
  IconCategory,
  IconLoader2,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useAppState, type BookMark } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { AddBookmarkModal } from "./add-bookmark-modal";
import useFavicon from "./use-favicon";
import { useQuery } from "@tanstack/react-query";

export function LinocaSection() {
  const { toggleLinocaShown, bookmarks, removeBookmark, linocaShown } =
    useAppState(
      useShallow((state) => {
        return {
          linocaShown: state.linocaShown,
          toggleLinocaShown: state.toggleLinocaShown,
          bookmarks: state.bookmarks,
          removeBookmark: state.removeBookmark,
        };
      })
    );

  const { data } = useQuery({
    queryKey: ["linoca:link"],
    queryFn: async () => {
      const res = await fetch("https://notica.app/api/ext/linoca/v1/list");
      const data = await res.json();
      return data.data as Array<BookMark>;
    },
  });

  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  return (
    <>
      <Modal
        onClose={() => setIsAddBookmarkOpen(false)}
        isOpen={isAddBookmarkOpen}
      >
        <AddBookmarkModal onClose={() => setIsAddBookmarkOpen(false)} />
      </Modal>

      <div className="flex flex-row justify-start gap-3 items-stretch overflow-y-hidden overflow-x-scroll no-scrollbar">
        <GlassContainer
          className="flex flex-col justify-center items-center w-[85px] h-[85px] bg-white gap-1"
          onClick={() => toggleLinocaShown()}
        >
          <IconCategory size={30} color="blue" />
          <p className="text-xs">لینوکا</p>
        </GlassContainer>

        {linocaShown ? (
          <>
            {data &&
              data.map((i) => {
                return (
                  <IconContainer
                    id={i.id}
                    link={i.link}
                    onRemove={() => removeBookmark(i.id)}
                    title={i.title}
                    removable={false}
                  />
                );
              })}
          </>
        ) : bookmarks.length === 0 ? (
          <>
            <>
              <GlassContainer
                className=" flex items-center justify-center w-[85px] h-[85px]"
                onClick={() => {
                  setIsAddBookmarkOpen(true);
                }}
              >
                <IconPlus />
              </GlassContainer>
            </>
          </>
        ) : (
          <>
            {bookmarks
              .map((i) => {
                return (
                  <IconContainer
                    id={i.id}
                    link={i.link}
                    onRemove={() => removeBookmark(i.id)}
                    title={i.title}
                    removable
                  />
                );
              })
              .concat(
                <GlassContainer
                  className=" flex items-center justify-center w-[85px] h-[85px]"
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

type IconContainer = {
  link: string;
  id: string;
  title: string;
  onRemove: (id: string) => void;
  removable: boolean;
};
function IconContainer(props: IconContainer) {
  const { favicon, loading, error } = useFavicon(props.link);
  return (
    <GlassContainer
      className="flex flex-col justify-center items-center gap-1 w-[85px] h-[85px] bg-white/70 hover:bg-white relative"
      onClick={() => {
        // window.location.href = props.link;
        window.open(props.link, "_blank");
      }}
    >
      {props.removable ? (
        <div
          className="absolute top-1 left-1 w-5 h-5 bg-gray-300 rounded-full m-2 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            props.onRemove(props.id);
          }}
        >
          <IconX color="white" />
        </div>
      ) : (
        <></>
      )}

      {loading ? (
        <>
          <IconLoader2 className="animate-spin" />
        </>
      ) : error ? (
        <>
          <img className="w-8 h-8" src={"./broken-link.png"} />
        </>
      ) : (
        <>
          <img className="w-8 h-8" src={favicon as string} />
        </>
      )}
      <p className="text-xs text-center">{props.title}</p>
    </GlassContainer>
  );
}
