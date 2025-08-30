"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react"

export function GoogleSearchSection() {
  const [searchText, setSeatchText] = useState("");

  return (
    // <div className="h-full w-full flex items-stretch justify-between">
    <div className={"flex items-center justify-between gap-4 h-full"}>
      <div className={""}>
        <img src={"/google.png"} className={"w-10 h-10"} alt={"google image"} />
      </div>
      <div className={"flex-1"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
              searchText
            )}`;
          }}
        >
          <input
            className={"border-0 outline-0 focus:outline-none w-full"}
            placeholder={"در گوگل جستجو کن"}
            onChange={(e) => {
              setSeatchText(e.target.value);
            }}
            value={searchText}
          />
        </form>
      </div>
      <button
        className={"h-[48px] w-[48px] bg-blue-600 hover:bg-blue-700 rounded-full text-white flex items-center justify-center"}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
            searchText
          )}`;
        }}
      >
        <IconSearch stroke={2} />
      </button>
    </div>

    // </div>
  );
}
