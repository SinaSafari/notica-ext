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

const linocaLinks: Array<BookMark> = [
  {
    id: crypto.randomUUID(),
    link: "https://www.digikala.com",
    title: "دیجیکالا",
    favicon: "",
  },
  {
    id: crypto.randomUUID(),
    link: "https://www.alibaba.ir/",
    title: "علی‌بابا",
    favicon: "",
  },
  {
    id: crypto.randomUUID(),
    link: "https://www.varzesh3.ir/",
    title: "ورزش ۳",
    favicon: "",
  },
  {
    id: crypto.randomUUID(),
    link: "https://www.bbc.com/persian",
    title: "bbc",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://ir.voanews.com/",
    title: "voa",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://www.fifa.com/en",
    title: "fifa",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://www.filimo.com/",
    title: "فیلیمو",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://www.netflix.com/gb/",
    title: "نتفلیکس",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://www.spotify.com/",
    title: "سپتیفای",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://780.ir/",
    title: "۷۸۰",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://blubank.sb24.ir/",
    title: "بلوبانک",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://chatgpt.com/",
    title: "چت جی‌پی‌تی",
    favicon: "",
  },

  {
    id: crypto.randomUUID(),
    link: "https://claude.ai/",
    title: "کلاد",
    favicon: "",
  },
];

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

  console.log("linoca links", { linocaShown, linocaLinks });

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

        {linocaShown ? (
          <>
            {linocaLinks.map((i) => {
              console.log("qweqwe");

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
                className="w-24 h-24 flex items-center justify-center"
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
      className="flex flex-col justify-center items-center w-24 h-24 bg-white gap-2 relative rounded-3xl"
      onClick={() => {
        // window.location.href = props.link;
        window.open(props.link, "_blank");
      }}
    >
      {props.removable ? (
        <div
          className="absolute top-0 left-0 w-5 h-5 bg-gray-200 rounded-full m-2 flex items-center justify-center cursor-pointer"
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
          <IconLoader2 />
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
      <p className="text-xs">{props.title}</p>
    </GlassContainer>
  );
}
