"use client";

import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const WEATHER_CODES = {
  0: { description: "وقت کارای بزرگه", icon: "☀️", img: "/weather/sun.png" },
  1: { description: "روز عالی برای کار", icon: "🌤️", img: "/weather/cloudy-1.png" },
  2: { description: "کار کن، ابرا مهمونن", icon: "⛅", img: "/weather/cloudy.png" },
  3: { description: "ابریه، وقت تمرکزه", icon: "☁️", img: "/weather/cloudy.png" },
  45: { description: "مه اومده، آروم باش", icon: "🌫️", img: "/weather/cloudy.png" },
  48: { description: "هوای مرموز کار", icon: "🌫️", img: "/weather/cloudy.png" },
  51: { description: "نم‌نم بارون و ایده", icon: "🌦️", img: "/weather/drizzle.png" },
  53: { description: "بارون ملایم، تمرکز کن", icon: "🌦️", img: "/weather/drizzle.png" },
  55: { description: "بارون حسابی! بجنب", icon: "🌦️", img: "/weather/drizzle.png" },
  56: { description: "سرده، اما وقت کار", icon: "🌨️", img: "/weather/drizzle.png" },
  57: { description: "زمستونی کار کن", icon: "🌨️", img: "/weather/drizzle.png" },
  61: { description: "چه بارونی شده!", icon: "🌧️", img: "/weather/downpour.png" },
  63: { description: "بارون انگیزه میاره", icon: "🌧️", img: "/weather/downpour.png" },
  65: { description: "بارون شدید، کار شدید", icon: "🌧️", img: "/weather/downpour.png" },
  66: { description: "بارون یخی، محکم باش", icon: "🌨️", img: "/weather/freezing-rain.png" },
  67: { description: "سختی بارونه، ادامه بده", icon: "🌨️", img: "/weather/freezing-rain.png" },
  71: { description: "برف سبک، آروم کار کن", icon: "🌨️", img: "/weather/freezing-rain.png" },
  73: { description: "برف میاد، داغ کار کن", icon: "❄️", img: "/weather/snow.png" },
  75: { description: "برف سنگین، تلاش سنگین", icon: "❄️", img: "/weather/snow.png" },
  77: { description: "برف دونه‌دونه، کار دونه‌دونه", icon: "🌨️", img: "/weather/snow.png" },
  80: { description: "رگبار اومد، وقت دویدنه", icon: "🌦️", img: "/weather/heavy-rain.png" },
  81: { description: "رگبار متوسط، انرژی بگیر", icon: "🌦️", img: "/weather/heavy-rain.png" },
  82: { description: "رگبار شدید، انرژی شدید", icon: "⛈️", img: "/weather/heavy-rain.png" },
  85: { description: "برف سبک، ایده‌هات سنگین", icon: "🌨️", img: "/weather/heavy-rain.png" },
  86: { description: "برف سنگین، دل سنگین نکن", icon: "❄️", img: "/weather/storm.png" },
  95: { description: "رعدوبرق = الهام", icon: "⛈️", img: "/weather/storm.png" },
  96: { description: "رعدوبرق با تگرگ، قوی باش", icon: "⛈️", img: "/weather/storm.png" },
  99: { description: "توفان شدید، تو هم شدید", icon: "⛈️", img: "/weather/storm.png" },
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

  // console.log("weather", data);

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
    <GlassContainer className="grow flex items-center justify-center min-h-[145px] max-h-[145px]">
      <div className="flex justify-between items-stretch w-full h-full">
        <div
          className={"flex flex-col justify-around items-stretch gap-2 flex-1"}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <IconLoader2 className="animate-spin" />
            </div>
          ) : data ? (
            <>
              <div className={"flex justify-around items-center gird w-full"}>
                <p className={"font-black text-4xl text-blue-600 dark:text-blue-400"}>
                  {data.current}&deg;
                </p>
                <img
                  src={data.code.img}
                  className={`w-12 h-12 flex items-center justify-center `}
                />
              </div>
              <p className={"text-center"}>{data.code.description}</p>
              <div className={"flex justify-center items-center w-full gap-4"}>
                <p className={"text-xs"}>
                  <span>حداقل </span>
                  <span>{data.min}</span>
                </p>
                <div className={"w-[1px] h-full bg-slate-300"}></div>
                <p className={"text-xs"}>
                  <span>حداکثر </span>
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
            <p className={"text-blue-600 text-4xl font-black dark:text-blue-400"}>
              {`${time.getHours().toString().padStart(2, "0")}:${time
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}
            </p>
          </div>
          <p className={"text-center"}>
            {new Date().toLocaleDateString("fa-IR", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-4 items-center justify-center text-xs w-full">
            <span className="flex-1 text-center">
              {new Date().toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className={"w-[1px] h-full bg-slate-300"}></div>
            <span className="flex-1">
              {new Date().toLocaleDateString("fa-IR-u-ca-islamic", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </GlassContainer >
  );
}
