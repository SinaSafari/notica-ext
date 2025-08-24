import { GlassContainer } from "@/components/glass-container";
import { useQuery } from "@tanstack/react-query";

export function DailyNotice() {
  const { data } = useQuery({
    queryKey: ["daily"],
    queryFn: async () => {
      const response = await fetch(
        "https://notica.app/api/ext/events/v1/daily"
        // "http://localhost:3000/api/ext/events/v1/daily"
      );
      const res = await response.json();
      return res;
    },
  });

  return (
    <GlassContainer className="grow flex items-stretch justify-between max-h-[148px] gap-4">
      <div className={"w-[85px]  h-full flex items-center justify-center"}>
        <img src={"/logo.png"} className={"w-[85px] h-[87px]"} alt={"logo"} />
      </div>
      {data && data.result.events.length ? (
        <>
          <div
            className={
              "flex-1 flex items-stretch justify-center flex-col gap-2 ml-4"
            }
          >
            <p className={"text-sm"}>{data.result.events[0]?.description}</p>
            <p className={"text-xs"}>{data.result.events[1]?.description}</p>
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p className={"text-lg"}>امروز خبری نیست!</p>
        </div>
      )}
    </GlassContainer>
  );
}
