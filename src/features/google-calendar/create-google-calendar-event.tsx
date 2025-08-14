import { useAppState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useShallow } from "zustand/shallow";

type CreateGoogleCalendarEventProps = {
  setIsNewEventModalOpen: (newState: boolean) => void;
  selectedDay: string;
};

export function CreateGoogleCalendarEvent(
  props: CreateGoogleCalendarEventProps
) {
  const { googleToken } = useAppState(
    useShallow((state) => {
      return {
        googleToken: state.googleToken,
      };
    })
  );
  const form = useForm({
    defaultValues: {
      summary: "",
      description: "",
      start: {
        hour: 0,
        minutes: 0,
      },
      end: {
        hour: 0,
        minutes: 0,
      },
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { description, end, start, summary } = form.getValues();
      const date = new Date(props.selectedDay);
      const startDate = new Date(date);
      startDate.setHours(start.hour, start.minutes, 0, 0);

      // End of today (23:59:59)
      const endDate = new Date(date);
      endDate.setHours(end.hour, end.minutes, 0, 0);

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary,
            description,
            start: {
              dateTime: startDate.toISOString(),
              timezode: "Asia/Tehran",
            },
            end: {
              dateTime: endDate.toISOString(),
              timezode: "Asia/Tehran",
            },
          }),
        }
      );
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      props.setIsNewEventModalOpen(false);
    },
  });
  return (
    <>
      <div
        className={
          "w-[768px] h-[367px] rounded-2xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"
        }
      >
        <div
          className={
            "rounded-2xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200 text-right flex flex-col justify-between items-stretch gap-4 p-2"
          }
        >
          <form className={"flex-1 w-full h-full"}>
            <p className={"text-xl"}>ایونت جدید</p>
            <div className={"w-full flex-1 my-2"}>
              <Controller
                control={form.control}
                name="summary"
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor={"summary"}
                        className={"text-right text-xs"}
                      >
                        عنوان ایونت
                      </label>
                      <input
                        type={"summary"}
                        name={"summary"}
                        className={
                          "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                        }
                        placeholder={"عنوان ایونت"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  );
                }}
              />
            </div>
            <div className={"w-full flex-1 my-2"}>
              <Controller
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor={"password"}
                        className={"text-right text-xs"}
                      >
                        توضیحات
                      </label>
                      <input
                        type={"description"}
                        name={"description"}
                        className={
                          "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                        }
                        placeholder={"توضیحات"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  );
                }}
              />
            </div>

            {/* start */}
            <div
              className={
                "w-full flex-1 flex justify-between items-center gap-4 my-2"
              }
            >
              <Controller
                control={form.control}
                name="start.hour"
                render={({ field }) => {
                  return (
                    <>
                      <label className={"text-right text-xs"}>ساعت شروع</label>
                      <select
                        {...field}
                        className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      >
                        {Array.from({ length: 25 }).map((item, idx) => {
                          return <option value={idx}>{idx}</option>;
                        })}
                      </select>
                    </>
                  );
                }}
              />
              <Controller
                control={form.control}
                name="start.minutes"
                render={({ field }) => {
                  return (
                    <>
                      <label className={"text-right text-xs"}>دقیقه</label>
                      <select
                        {...field}
                        className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      >
                        {Array.from({ length: 60 }).map((item, idx) => {
                          return <option value={idx}>{idx}</option>;
                        })}
                      </select>
                    </>
                  );
                }}
              />
            </div>

            {/* end */}

            <div
              className={
                "w-full flex-1 flex justify-between items-center gap-4 my-2"
              }
            >
              <Controller
                control={form.control}
                name="end.hour"
                render={({ field }) => {
                  return (
                    <>
                      <label className={"text-right text-xs"}>ساعت پایان</label>
                      <select
                        {...field}
                        className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      >
                        {Array.from({ length: 25 }).map((item, idx) => {
                          return <option value={idx}>{idx}</option>;
                        })}
                      </select>
                    </>
                  );
                }}
              />
              <Controller
                control={form.control}
                name="end.minutes"
                render={({ field }) => {
                  return (
                    <>
                      <label className={"text-right text-xs"}>دقیقه</label>
                      <select
                        {...field}
                        className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      >
                        {Array.from({ length: 60 }).map((item, idx) => {
                          return <option value={idx}>{idx}</option>;
                        })}
                      </select>
                    </>
                  );
                }}
              />
            </div>
          </form>
          <div className={"max-h-[52px] flex flex-row-reverse"}>
            <button
              className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
              onClick={() => {
                mutate();
              }}
            >
              ذخیره
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
