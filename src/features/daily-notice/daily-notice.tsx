import { GlassContainer } from "@/components/glass-container";

export function DailyNotice() {
  return (
    <GlassContainer className="grow flex items-stretch justify-between max-h-[148px] gap-4">
        <div className={"w-[85px]  h-full flex items-center justify-center"}>
            <img src={"/logo.png"} className={"w-[85px] h-[87px]"} alt={"logo"} />
        </div>
        <div className={"flex-1 flex items-stretch justify-center flex-col gap-2 ml-4"}>
            <p className={"text-lg"}>روز ملی شدن صنعت نفت</p>
            <p className={"text-xs"}>لورم ایپسوم متن ساختگی با تولید سادگی نا مفهوم از صنعت.</p>
        </div>
    </GlassContainer>
  );
}
