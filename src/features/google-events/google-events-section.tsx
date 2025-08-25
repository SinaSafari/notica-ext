"use client";

import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const sammpleResponse = {
  kind: "calendar#events",
  etag: '"p32fohbture4ou0o"',
  summary: "m.sinasafari@gmail.com",
  description: "",
  updated: "2025-08-14T06:52:33.996Z",
  timeZone: "Asia/Tehran",
  accessRole: "owner",
  defaultReminders: [
    {
      method: "popup",
      minutes: 30,
    },
  ],
  items: [
    {
      kind: "calendar#event",
      etag: '"3510308707046206"',
      id: "6mfg4l3p79jf7elukfbcd7s04c",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=Nm1mZzRsM3A3OWpmN2VsdWtmYmNkN3MwNGMgbS5zaW5hc2FmYXJpQG0",
      created: "2025-08-14T06:52:33.000Z",
      updated: "2025-08-14T06:52:33.523Z",
      summary: "test task",
      creator: {
        email: "m.sinasafari@gmail.com",
        self: true,
      },
      organizer: {
        email: "m.sinasafari@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2025-08-14T17:00:00+03:30",
        timeZone: "Asia/Tehran",
      },
      end: {
        dateTime: "2025-08-14T18:00:00+03:30",
        timeZone: "Asia/Tehran",
      },
      iCalUID: "6mfg4l3p79jf7elukfbcd7s04c@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
  ],
};

export function GoogleEventsSection() {
  const { googleToken, setGoogleToken } = useAppState(
    useShallow((state) => {
      return {
        googleToken: state.googleToken,
        setGoogleToken: state.setGoogleToken,
      };
    })
  );
  const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false);

  const { data } = useQuery({
    queryKey: ["goggle:events"],
    queryFn: async () => {
      const today = new Date();

      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      const searchParams = new URLSearchParams();
      searchParams.set("timeMin", startOfDay.toISOString());
      searchParams.set("timeMax", endOfDay.toISOString());
      searchParams.set("maxResults", "10");
      searchParams.set("singleEvents", "true");
      searchParams.set("orderBy", "startTime");

      const re = await fetch(
        "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest",
        {
          headers: { Authorization: `Bearer ${googleToken}` },
        }
      );
      const d = await re.json();
      console.log({ d });

      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
          searchParams.toString(),
        {
          headers: { Authorization: `Bearer ${googleToken}` },
        }
      );
      const data = await res.json();
      console.log({ data });

      const response: Array<{
        title: string;
        from: string;
        to: string;
        status: string;
      }> = data.items.map((item: (typeof sammpleResponse)["items"][0]) => {
        const startDate = new Date(item.start.dateTime);
        const endDate = new Date(item.end.dateTime);
        return {
          title: item.summary,
          from: `${startDate.getHours()}:${startDate.getMinutes()}`,
          to: `${endDate.getHours()}:${endDate.getMinutes()}`,
          status: "incoming",
        };
      });

      return response;
      //   return data.items || [];
    },
    enabled: !!googleToken,
  });
  return (
    <GlassContainer className="grow flex items-stretch flex-col max-h-[230px] gap-2 ">
      <p className={"text-lg font-bold"}>امروز چه خبره؟</p>
      {!googleToken && (
        <div className="flex justify-center items-center flex-col">
          <button
            className="text-white  bg-[#de5246] rounded-lg text-xs cursor-pointer px-3 py-2 flex items-center justify-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              setIsGoogleLoginPending(true);

              //@ts-ignore
              chrome.identity.getAuthToken(
                { interactive: true },
                //@ts-ignore
                (token) => {
                  if (token) {
                    setGoogleToken(token);
                  } else {
                    console.log("authentication failed");
                  }
                  setIsGoogleLoginPending(false);
                }
              );
            }}
          >
            {isGoogleLoginPending ? (
              <>
                <IconLoader2 />
              </>
            ) : (
              <>
                <IconBrandGoogle />
                <span>اتصال به گوگل</span>
              </>
            )}
          </button>
        </div>
      )}
      {data?.map((item) => {
        return (
          <div
            className={`w-full h-[36px] flex items-center justify-between px-4 border-r-4 ${
              item.status === "incoming"
                ? "bg-[#EAFFE0] border-r-green-700"
                : "bg-[#FFE0E1] border-r-red-700"
            }`}
          >
            <p>{item.title}</p>
            <p>
              <span>{item.from}</span>
              <span> الی </span>
              <span>{item.to}</span>
            </p>
          </div>
        );
      })}
    </GlassContainer>
  );
}
