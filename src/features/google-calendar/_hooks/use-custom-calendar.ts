
import dayjs from '@/lib/date.ts'

const persianDaysFull = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
];

export type DateData = {
    day?: number | null;
    dayOfWeek?: number;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isDisabled?: boolean;
    isPast?: boolean;
    fullDate?: string;
    dayName?: string;
    isWeekend?: boolean;
    dateObj?: Date;
};

export type MonthData = {
    year: number;
    month: number;
    monthName: string;
    daysInMonth: number;
    firstDayWeekday: number;
    weeks: DateData[][];
};

export type CalendarData = {
    currentDate: {
	day: number;
	dayOfWeek: number;
	dayName: string;
	month: number;
	monthName: string;
	year: number;
	fullDate: string;
	dateObj?: Date;
    };
    targetDate: {
	month: number;
	monthName: string;
	year: number;
	fullDate: string;
    };
    monthData: MonthData;
};

export function useCustomCalendar() {
    function generateCalendarData(defauleDay: Date, monthOffset = 0) {
	const today = dayjs().calendar("jalali").locale("fa");

	const targetDate = today.add(monthOffset, "month");
	const currentMonth = targetDate.month();
	const currentYear = targetDate.year();

	// Get first and last day of target month
	const firstDayOfMonth = targetDate.startOf("month");
	const lastDayOfMonth = targetDate.endOf("month");

	const firstDayWeekday = (firstDayOfMonth.day() + 1) % 7;
	const daysInMonth = lastDayOfMonth.date();

	const calendarData: CalendarData = {
	    currentDate: {
		day: today.date(),
		dayOfWeek: today.day(),
		dayName: persianDaysFull[today.day()],
		month: today.month() + 1,
		monthName: today.format("MMMM"),
		year: today.year(),
		fullDate: today.format("YYYY/MM/DD"),
	    },
	    targetDate: {
		month: currentMonth + 1,
		monthName: targetDate.format("MMMM"),
		year: currentYear,
		fullDate: targetDate.format("YYYY/MM/DD"),
	    },
	    monthData: {
		year: currentYear,
		month: currentMonth + 1,
		monthName: targetDate.format("MMMM"),
		daysInMonth: daysInMonth,
		firstDayWeekday: firstDayWeekday,
		weeks: [],
	    },
	};

	// Generate weeks array
	let currentWeek: Array<{
	    day?: number | null;
	    dayOfWeek?: number;
	    isCurrentMonth?: boolean;
	    isToday?: boolean;
	    isDisabled?: boolean;
	    isPast?: boolean;
	    fullDate?: string;
	    dayName?: string;
	    isWeekend?: boolean;
	    dateObj?: Date;
	}> = [];

	// Add empty cells for days before month starts
	for (let i = 0; i < firstDayWeekday; i++) {
	    currentWeek.push({
		day: null,
		isCurrentMonth: false,
		isToday: false,
		isDisabled: true,
		isPast: true,
	    });
	}

	// Add all days of the month
	for (let day = 1; day <= daysInMonth; day++) {
	    const currentDate = targetDate.date(day);
	    const isToday = targetDate.isSame(today, "month") && day === today.date();
	    const isPast = currentDate.isBefore(today, "day");
	    currentWeek.push({
		day: day,
		dayOfWeek: currentDate.day(),
		isCurrentMonth: true,
		isToday: isToday,
		isDisabled: isPast,
		isPast: isPast,
		fullDate: currentDate.format("YYYY/MM/DD"),
		dayName: persianDaysFull[currentDate.day()],
		dateObj: currentDate.toDate(),
	    });

	    // If week is complete (7 days), add to weeks array and start new week
	    if (currentWeek.length === 7) {
		calendarData.monthData.weeks.push([...currentWeek]);
		currentWeek = [];
	    }
	}

	// Fill remaining cells in last week if needed
	while (currentWeek.length > 0 && currentWeek.length < 7) {
	    currentWeek.push({
		day: null,
		isCurrentMonth: false,
		isToday: false,
		isDisabled: true,
		isPast: true,
	    });
	}

	// Add last week if it has any days
	if (currentWeek.length > 0) {
	    calendarData.monthData.weeks.push(currentWeek);
	}

	return calendarData;
    }
    return { generateCalendarData };
}
