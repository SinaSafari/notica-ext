import { GlassContainer } from "@/components/glass-container";
import {
  useCustomCalendar,
  type CalendarData,
  type DateData,
} from "./_hooks/use-custom-calendar.ts";
import { useEffect, useState } from "react";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/shallow";
import { IconLoader2, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]; // Sunday to Saturday

type GoogleCalendarSectionProps = {
  setIsNewEventModalOpen: (newState: boolean) => void;
  isNewEventModalOpen: boolean;
};

export function GoogleCalendarSection(props: GoogleCalendarSectionProps) {
  const { generateCalendarData } = useCustomCalendar();

  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false);

  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    const newCalendarData = generateCalendarData(new Date(), monthOffset);
    setCalendarData(newCalendarData);
    setSelectedDate(newCalendarData.currentDate);
  }, [monthOffset]);

  const { googleToken, setGoogleToken } = useAppState(
    useShallow((state) => ({
      googleToken: state.googleToken,
      setGoogleToken: state.setGoogleToken,
    }))
  );

  return (
    <>
      <GlassContainer className="grow flex flex-col justify-between items-stretch p-3 ">
        <div className={"flex-1"}>
          <div className="flex flex-col flex-grow">
            <div className="p-2  rounded-b-lg min-h-[240px]">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setMonthOffset((prev) => prev - 1)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <IconChevronRight size={20} />
                </button>
                <p className={"text-xl font-bold"}>
                  {calendarData && `${calendarData.monthData.monthName} ${calendarData.monthData.year}`}
                </p>
                <button
                  onClick={() => setMonthOffset((prev) => prev + 1)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <IconChevronLeft size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {persianDays.map((day, index) => (
                    <div key={index} className="text-center">
                      <span className="text-base font-semibold text-gray-800">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                {calendarData &&
                  calendarData.monthData.weeks.map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      className="grid grid-cols-7 gap-1 justify-items-center"
                    >
                      {week.map((dayData, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-8 h-8 flex items-center justify-center rounded-4xl 
                            ${dayData.isDisabled || !dayData.isCurrentMonth
                              ? "cursor-not-allowed"
                              : "cursor-pointer"}
                            ${selectedDate?.day === dayData.day &&
                              selectedDate?.fullDate === dayData.fullDate
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : ""}
                            ${dayData.isDisabled ? "opacity-40" : "opacity-100"}`}
                          onClick={() => setSelectedDate(dayData)}
                        >
                          {dayData.day && (
                            <span
                              className={`text-base ${dayData.isPast && dayData.isCurrentMonth
                                ? "text-gray-500"
                                : dayData.isCurrentMonth
                                  // ? dayData.isWeekend
                                  ? dayIndex === 6 && dayData.isCurrentMonth
                                    ? "text-red-700 border-1 w-8 h-8 flex items-center justify-center rounded-4xl"
                                    : selectedDate?.day &&
                                      selectedDate?.fullDate === dayData.fullDate
                                      ? "text-white"
                                      : "text-gray-800"
                                  : "text-gray-400"
                                }`}
                            >
                              {Number(dayData.day).toLocaleString("fa-IR")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* دکمه گوگل */}
        <button
          className={
            "bg-blue-600 hover:bg-blue-700 rounded-4xl text-white px-10 py-2 cursor-pointer flex items-center justify-center"
          }
          onClick={async () => {
            if (googleToken) {
              props.setIsNewEventModalOpen(true);
            } else {
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
            }
          }}
        >
          {isGoogleLoginPending ? (
            <IconLoader2 className="animate-spin" />
          ) : googleToken ? (
            <>ایجاد ایونت جدید</>
          ) : (
            <>حساب گوگل رو به توتیکا وصل کردید؟</>
          )}
        </button>
      </GlassContainer>
    </>
  );
}
