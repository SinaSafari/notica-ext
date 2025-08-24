"use client";

import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export function ClockAndWeatherSection() {
  const [time, setTime] = useState(new Date());

  const { selectedCity } = useAppState(
    useShallow((state) => {
      return {
        selectedCity: state.selectedCity,
      };
    })
  );

  const { data, isLoading } = useQuery({
    queryKey: ["weather", selectedCity.name],
    queryFn: async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current=temperature_2m,dew_point_2m&daily=temperature_2m_min,temperature_2m_max&forecast_days=1`;

      const res = await fetch(url);
      const data = await res.json();

      return {
        current: Math.ceil(data.current.temperature_2m as number),
        min: Math.ceil(data.daily.temperature_2m_min[0] as number),
        max: Math.ceil(data.daily.temperature_2m_max[0] as number),
      };
    },
    enabled: !!selectedCity,
  });

  console.log("weather", data);

  useEffect(() => {
    // Set up the interval
    const timerID = setTimeout(() => {
      setTime(new Date());
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return (
    <GlassContainer className="grow flex items-center justify-center max-h-[145px]">
      <div className="flex justify-between items-stretch w-full h-full">
        <div
          className={"flex flex-col justify-around items-stretch gap-2 flex-1"}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <IconLoader2 />
            </div>
          ) : data ? (
            <>
              <div className={"flex justify-around items-center w-full"}>
                <p className={"font-black text-5xl text-blue-600"}>
                  {data.current}&deg;
                </p>
                <img src={"/weather.png"} className={`w-12 h-12`} />
              </div>
              <p className={"text-center"}>هوا هوای کاره!</p>
              <div className={"flex justify-center items-center w-full gap-4"}>
                <p className={"text-xs"}>
                  <span>حداقل</span>
                  <span>{data.min}</span>
                </p>
                <div className={"w-[1px] h-full bg-slate-300"}></div>
                <p className={"text-xs"}>
                  <span>حداکثر</span>
                  <span>{data.max}</span>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={"w-[1px] h-full bg-slate-300"}></div>
        <div
          className={"flex flex-col justify-around items-stretch gap-2 flex-1"}
        >
          <div className={"flex justify-center items-center w-full"}>
            <p className={"text-blue-600 text-5xl font-black"}>
              {`${time.getHours().toString().padStart(2, "0")}:${time
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}
            </p>
          </div>
          <p className={"text-center"}>
            <span>
              {new Date().toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
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
