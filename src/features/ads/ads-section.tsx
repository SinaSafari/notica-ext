import { GlassContainer } from "@/components/glass-container";

export function AdsSection() {
  return (
    <>
      <GlassContainer className="grow flex items-center justify-center h-full p-0 border-0 max-h-[270px]">
        <img
          src={"/ads-1.png"}
          className={`w-full h-full object-cover rounded-2xl`}
          alt={"ads 1"}
        />
      </GlassContainer>
      <GlassContainer className="grow flex items-center justify-center h-full p-0 border-0 max-h-[270px]">
        <img
          src={"/ads-1.png"}
          className={`w-full h-full object-cover rounded-2xl`}
          alt={"ads 1"}
        />
      </GlassContainer>
    </>
  );
}
