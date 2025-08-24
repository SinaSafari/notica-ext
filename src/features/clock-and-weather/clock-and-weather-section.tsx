"use client";

import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const WEATHER_CODES = {
  0: { description: "Clear sky", icon: "☀️" },
  1: { description: "Mainly clear", icon: "🌤️" },
  2: { description: "Partly cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },
  45: { description: "Fog", icon: "🌫️" },
  48: { description: "Depositing rime fog", icon: "🌫️" },
  51: { description: "Light drizzle", icon: "🌦️" },
  53: { description: "Moderate drizzle", icon: "🌦️" },
  55: { description: "Dense drizzle", icon: "🌦️" },
  56: { description: "Light freezing drizzle", icon: "🌨️" },
  57: { description: "Dense freezing drizzle", icon: "🌨️" },
  61: { description: "Slight rain", icon: "🌧️" },
  63: { description: "Moderate rain", icon: "🌧️" },
  65: { description: "Heavy rain", icon: "🌧️" },
  66: { description: "Light freezing rain", icon: "🌨️" },
  67: { description: "Heavy freezing rain", icon: "🌨️" },
  71: { description: "Slight snow fall", icon: "🌨️" },
  73: { description: "Moderate snow fall", icon: "❄️" },
  75: { description: "Heavy snow fall", icon: "❄️" },
  77: { description: "Snow grains", icon: "🌨️" },
  80: { description: "Slight rain showers", icon: "🌦️" },
  81: { description: "Moderate rain showers", icon: "🌦️" },
  82: { description: "Violent rain showers", icon: "⛈️" },
  85: { description: "Slight snow showers", icon: "🌨️" },
  86: { description: "Heavy snow showers", icon: "❄️" },
  95: { description: "Slight or moderate thunderstorm", icon: "⛈️" },
  96: { description: "Thunderstorm with slight hail", icon: "⛈️" },
  99: { description: "Thunderstorm with heavy hail", icon: "⛈️" },
};

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
      const url = new URL("/v1/forcast", "https://api.open-meteo.com");
      url.searchParams.append("latitude", `${selectedCity.lat}`);
      url.searchParams.append("longitude", `${selectedCity.lng}`);
      url.searchParams.append(
        "current",
        `temperature_2m,dew_point_2m,weather_code`
      );
      url.searchParams.append(
        "daily",
        `temperature_2m,dew_point_2m,weather_code`
      );
      url.searchParams.append("forecast_days", `1`);

      const url_ = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current=temperature_2m,dew_point_2m,weather_code&daily=temperature_2m_min,temperature_2m_max,weather_code&forecast_days=1`;

      const res = await fetch(url_);
      const data = await res.json();

      const weather_code = +data.current
        .weather_code as keyof typeof WEATHER_CODES;

      return {
        current: Math.ceil(data.current.temperature_2m as number),
        min: Math.ceil(data.daily.temperature_2m_min[0] as number),
        max: Math.ceil(data.daily.temperature_2m_max[0] as number),
        code: WEATHER_CODES[weather_code] || {
          description: `Unknown weather code: ${weather_code}`,
          icon: "❓",
        },
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
                <div
                  className={`w-12 h-12 flex items-center justify-center text-4xl`}
                >
                  {data.code.icon}
                </div>
                {/* <img src={"/weather.png"} className={`w-12 h-12`} /> */}
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
