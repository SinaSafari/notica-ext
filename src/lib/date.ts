import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import jalaliPlugin from "jalali-plugin-dayjs";

dayjs.extend(jalaliPlugin);
dayjs.extend(timezone);
dayjs.extend(utc);

export default dayjs;
