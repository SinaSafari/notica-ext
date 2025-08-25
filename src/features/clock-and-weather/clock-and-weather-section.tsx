"use client";

import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const WEATHER_CODES = {
  0: { description: "Clear sky", icon: "☀️", img: "/weather/sun.png" },
  1: { description: "Mainly clear", icon: "🌤️", img: "/weather/cloudy-1.png" },
  2: { description: "Partly cloudy", icon: "⛅", img: "/weather/cloudy.png" },
  3: { description: "Overcast", icon: "☁️", img: "/weather/cloudy.png" },
  45: { description: "Fog", icon: "🌫️", img: "/weather/cloudy.png" },
  48: {
    description: "Depositing rime fog",
    icon: "🌫️",
    img: "/weather/cloudy.png",
  },
  51: { description: "Light drizzle", icon: "🌦️", img: "/weather/drizzle.png" },
  53: {
    description: "Moderate drizzle",
    icon: "🌦️",
    img: "/weather/drizzle.png",
  },
  55: { description: "Dense drizzle", icon: "🌦️", img: "/weather/drizzle.png" },
  56: {
    description: "Light freezing drizzle",
    icon: "🌨️",
    img: "/weather/drizzle.png",
  },
  57: {
    description: "Dense freezing drizzle",
    icon: "🌨️",
    img: "/weather/drizzle.png",
  },
  61: { description: "Slight rain", icon: "🌧️", img: "/weather/downpour.png" },
  63: {
    description: "Moderate rain",
    icon: "🌧️",
    img: "/weather/downpour.png",
  },
  65: { description: "Heavy rain", icon: "🌧️", img: "/weather/downpour.png" },
  66: {
    description: "Light freezing rain",
    icon: "🌨️",
    img: "/weather/freezing-rain.png",
  },
  67: {
    description: "Heavy freezing rain",
    icon: "🌨️",
    img: "/weather/freezing-rain.png",
  },
  71: {
    description: "Slight snow fall",
    icon: "🌨️",
    img: "/weather/freezing-rain.png",
  },
  73: {
    description: "Moderate snow fall",
    icon: "❄️",
    img: "/weather/snow.png",
  },
  75: { description: "Heavy snow fall", icon: "❄️", img: "/weather/snow.png" },
  77: { description: "Snow grains", icon: "🌨️", img: "/weather/snow.png" },
  80: {
    description: "Slight rain showers",
    icon: "🌦️",
    img: "/weather/heavy-rain.png",
  },
  81: {
    description: "Moderate rain showers",
    icon: "🌦️",
    img: "/weather/heavy-rain.png",
  },
  82: {
    description: "Violent rain showers",
    icon: "⛈️",
    img: "/weather/heavy-rain.png",
  },
  85: {
    description: "Slight snow showers",
    icon: "🌨️",
    img: "/weather/heavy-rain.png",
  },
  86: {
    description: "Heavy snow showers",
    icon: "❄️",
    img: "/weather/storm.png",
  },
  95: {
    description: "Slight or moderate thunderstorm",
    icon: "⛈️",
    img: "/weather/storm.png",
  },
  96: {
    description: "Thunderstorm with slight hail",
    icon: "⛈️",
    img: "/weather/storm.png",
  },
  99: {
    description: "Thunderstorm with heavy hail",
    icon: "⛈️",
    img: "/weather/storm.png",
  },
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
                {/* <div
                  className={`w-12 h-12 flex items-center justify-center text-4xl`}
                >
                  {data.code.icon}
                </div> */}
                <img
                  src={data.code.img}
                  className={`w-12 h-12 flex items-center justify-center `}
                />
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
