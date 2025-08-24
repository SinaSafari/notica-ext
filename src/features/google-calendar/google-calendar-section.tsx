import { GlassContainer } from "@/components/glass-container";
import {
  useCustomCalendar,
  type CalendarData,
  type DateData,
} from "./_hooks/use-custom-calendar.ts";
import { useEffect, useState } from "react";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/shallow";
import { IconLoader2 } from "@tabler/icons-react";

const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]; // Sunday to Saturday

type GoogleCalendarSectionProps = {
  setIsNewEventModalOpen: (newState: boolean) => void;
  isNewEventModalOpen: boolean;
};

export function GoogleCalendarSection(props: GoogleCalendarSectionProps) {
  const { generateCalendarData } = useCustomCalendar();

  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [nextMonthCalendarData, setNextMonthCalendarData] =
    useState<CalendarData | null>(null);

  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false);

  useEffect(() => {
    const calendarData = generateCalendarData(new Date());
    const nextMonthCalendarData = generateCalendarData(new Date(), 1);
    setCalendarData(calendarData);
    setNextMonthCalendarData(nextMonthCalendarData);
    setSelectedDate(calendarData.currentDate);
  }, []);

  // const [isNewEventModalOpen, setIsNewEventModalOpen] =
  //   useState<boolean>(false);

  const { googleToken, setGoogleToken } = useAppState(
    useShallow((state) => {
      return {
        googleToken: state.googleToken,
        setGoogleToken: state.setGoogleToken,
      };
    })
  );

  console.log({ googleToken, isNewEventModalOpen: props.isNewEventModalOpen });

  return (
    <>
      <GlassContainer className="grow flex flex-col justify-between items-stretch p-2 ">
        <div className={"flex-1"}>
          <div className="flex flex-col flex-grow">
            <div className="p-2  rounded-b-lg min-h-[240px]">
              <p className={"text-xl font-bold mb-3"}>
                {calendarData && calendarData.monthData.monthName}
              </p>
              <div className="flex flex-col gap-2">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {persianDays.map((day, index) => (
                    <div key={index} className="text-center">
                      <span className="text-xs font-semibold text-gray-500">
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
                          className={`w-8 h-8 flex items-center justify-center rounded ${
                            dayData.isDisabled || !dayData.isCurrentMonth
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } ${
                            selectedDate?.day === dayData.day &&
                            selectedDate?.fullDate === dayData.fullDate
                              ? "bg-blue-600 text-white"
                              : dayData.isPast && dayData.isCurrentMonth
                              ? ""
                              : ""
                          } ${dayData.day ? "" : ""} ${
                            dayData.isDisabled ? "opacity-40" : "opacity-100"
                          }`}
                          // onClick={() => handleDateClick(dayData)}
                          onClick={() => {
                            setSelectedDate(dayData);
                          }}
                        >
                          {dayData.day && (
                            <span
                              className={`text-xs ${
                                dayData.isPast && dayData.isCurrentMonth
                                  ? "text-gray-500"
                                  : dayData.isCurrentMonth
                                  ? dayData.isWeekend
                                    ? "text-red-500"
                                    : selectedDate?.day &&
                                      selectedDate?.fullDate ===
                                        dayData.fullDate
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
        <button
          className={
            "bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer"
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
            <>
              <IconLoader2 />
            </>
          ) : (
            <>
              {googleToken ? (
                <>ایجاد ایونت جدید</>
              ) : (
                <>حساب گوگل رو به توتیکا وصل کردید؟</>
              )}
            </>
          )}
        </button>
      </GlassContainer>
    </>
  );
}
