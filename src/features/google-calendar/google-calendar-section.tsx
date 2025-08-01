import {GlassContainer} from "@/components/glass-container";
import {
    useCustomCalendar, type CalendarData,
    type DateData,
} from './_hooks/use-custom-calendar.ts'
import {useEffect, useState} from "react";
import {Modal} from "@/components/modal.tsx";
import {IconMenu, IconMenu2, IconMenu3, IconNotification, IconUser} from "@tabler/icons-react";

const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]; // Sunday to Saturday


export function GoogleCalendarSection() {
    const {generateCalendarData} = useCustomCalendar();


    const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
    const [nextMonthCalendarData, setNextMonthCalendarData] =
	useState<CalendarData | null>(null);


    useEffect(() => {
	const calendarData = generateCalendarData(new Date());
	const nextMonthCalendarData = generateCalendarData(
	    new Date(),
	    1
	);
	setCalendarData(calendarData);
	setNextMonthCalendarData(nextMonthCalendarData);
    }, []);

    const [selectedDate, setSelectedDate] = useState<DateData | null>(null);

    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState<boolean>(false);

    return (
	<>
	<Modal isOpen={isNewEventModalOpen} onClose={() => setIsNewEventModalOpen(false)}>
	    <div className={"w-[768px] h-[440px] rounded-xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"}>
		<div className={"rounded-2xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 p-2"}>
		    <div className={"flex-1 w-full h-full"}>
		    <p className={"text-xl"}>ایونت جدید</p>
		    <div className={"w-full flex-1"}>
			<label htmlFor={"password"} className={"text-right text-xs"}>عنوان ایونت</label>
			<input type={"password"} name={"password"} className={"text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"} placeholder={"عنوان ایونت"}/>

		    </div>
		    <div className={"w-full flex-1"}>
			<label htmlFor={"password"} className={"text-right text-xs"}>توضیحات</label>
			<input type={"password"} name={"password"} className={"text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"} placeholder={"توضیحات"}/>

		    </div>
		</div>
		    <div className={"max-h-[52px] flex flex-row-reverse"}>
			<button className={"bg-blue-600 rounded-xl text-white px-10 py-2"} onClick={() => setIsNewEventModalOpen(false)}>ذخیره</button>
		    </div>

		</div>


	    </div>
	</Modal>

	<GlassContainer className="grow flex flex-col justify-between items-stretch p-2">
	    <div className={"flex-1"}>
		<div className="flex flex-col flex-grow">
		    <div className="p-2  rounded-b-lg min-h-[240px]">
			<p className={"text-xl font-bold mb-3"}>{calendarData && calendarData.monthData.monthName}</p>
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
			    {calendarData && calendarData.monthData.weeks.map((week, weekIndex) => (
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
					    } ${
						dayData.day ? "" : ""
					    } ${
						dayData.isDisabled ? "opacity-40" : "opacity-100"
					    }`}
					    // onClick={() => handleDateClick(dayData)}
					    onClick={() => {
						setSelectedDate(dayData)
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
	    <button className={"bg-blue-600 rounded-xl text-white px-10 py-2 cursor-pointer"} onClick={() => setIsNewEventModalOpen(true)}>ایجاد ایونت جدید</button>
	</GlassContainer>
	</>
    );
}
