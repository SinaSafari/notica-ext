"use client";

export function GoogleSearchSection() {

  return (
    // <div className="h-full w-full flex items-stretch justify-between">
        <div className={"flex items-center justify-between h-[56px] gap-4 h-full"}>
            <div className={""}>
                <img src={"/google.png"} className={"w-10 h-10"} alt={"google image"}/>
            </div>
            <div className={"flex-1"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `https://www.google.com/search?q=${encodeURIComponent("hello world")}`

                }}>
                    <input className={"border-0 outline-0 focus:outline-none w-full"} placeholder={"در گوگل جستجو کن"} />

                </form>
            </div>
            <button className={"h-[44px] w-[116px] bg-blue-600 rounded-xl text-white"}>جستجو کن</button>
        </div>

      // </div>
  );
}
