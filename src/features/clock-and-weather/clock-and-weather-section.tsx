"use client";

import { GlassContainer } from "@/components/glass-container";

export function ClockAndWeatherSection() {
  return (
    <GlassContainer className="grow flex items-center justify-center max-h-[145px]">
      <div className="flex justify-between items-stretch w-full h-full">
          <div className={"flex flex-col justify-around items-stretch gap-2 flex-1"}>
              <div className={"flex justify-around items-center w-full"}>
                  <p className={"font-black text-5xl text-blue-600"}>
                     15&deg;
                  </p>
                  <img src={"/weather.png"} className={`w-12 h-12`} />
              </div>
              <p className={"text-center"}>هوا هوای کاره!</p>
              <div className={"flex justify-center items-center w-full gap-4"}>
                  <p className={"text-xs"}>
                      <span>حداقل</span>
                      <span>12</span>
                  </p>
                  <div className={"w-[1px] h-full bg-slate-300"}></div>
                  <p className={"text-xs"}>
                      <span>حداکثر</span>
                      <span>21</span>
                  </p>
              </div>
          </div>
          <div className={"w-[1px] h-full bg-slate-300"}></div>
          <div className={"flex flex-col justify-around items-stretch gap-2 flex-1"}>
              <div className={"flex justify-center items-center w-full"}>
                  <p className={"text-blue-600 text-5xl font-black"}>
                      {new Date().toLocaleTimeString("fa-IR", {hour: "2-digit", minute: "2-digit"})}
                  </p>
              </div>
              <p className={"text-center"}>
                  <span>{new Date().toLocaleDateString("fa-IR", {weekday: "long", month: "long", day: "numeric"})}</span>
                  <span> ماه </span>
              </p>
              <div className={"flex justify-center items-center w-full gap-4"}>
                  {/*<p className={"text-xs"}>*/}
                  {/*    <span>{new Date().toLocaleDateString("ar")}</span>*/}
                  {/*</p>*/}
                  {/*<div className={"w-[1px] h-full bg-slate-300"}></div>*/}
                  {/*<p className={"text-xs"}>*/}
                  {/*    <span>حداکثر</span>*/}
                  {/*    <span>21</span>*/}
                  {/*</p>*/}
              </div>
          </div>
      </div>
    </GlassContainer>
  );
}
