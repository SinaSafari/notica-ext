"use client";

import { GlassContainer } from "@/components/glass-container";
import {useQuery} from "@tanstack/react-query";

const mockGoogleCalendarEvents = [
    {
        id: 1,
        title: "جلسه دمو نوتیکا",
        start: "18:00",
        end: "20:00",
        status: "last",
    },
    {
        id: 2,
        title: "جلسه دمو نوتیکا",
        start: "20:00",
        end: "21:00",
        status: "incoming"
    },
]


export function GoogleEventsSection() {
    const {data} = useQuery({
        queryKey: ["goggle:events"],
        queryFn: async () => {
            return mockGoogleCalendarEvents;
        },
    })
  return (
    <GlassContainer className="grow flex items-stretch flex-col max-h-[230px] gap-2">
      <p className={"text-lg font-bold"}>امروز چه خبره؟</p>
        {data?.map(item => {
            return (
                <div className={`w-full h-[36px] flex items-center justify-between px-4 border-r-4 ${item.status === "incoming" ? "bg-[#EAFFE0] border-r-green-700" : "bg-[#FFE0E1] border-r-red-700"}`}>
                    <p>{item.title}</p>
                    <p>
                        <span>{item.start}</span>
                        <span> الی </span>
                        <span>{item.end}</span>
                    </p>
                </div>
            )
        })}

    </GlassContainer>
  );
}
