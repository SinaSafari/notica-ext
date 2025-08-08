import { GlassContainer } from "@/components/glass-container";
import { useAppState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

export function AdsSection() {
  const { organizationId } = useAppState(
    useShallow((store) => {
      return {
        banners: store.banners,
        organizationId: store.organizationId,
        setBanners: store.setBanners,
      };
    })
  );

  const { data } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const bannersRes = await fetch(
        `http://localhost:3000/api/banners/${organizationId}`
      );
      const banners = await bannersRes.json();
      return banners.map((i: { image: string; position: string }) => ({
        image: i.image,
        position: i.position,
      }));
    },
  });

  return (
    <>
      <GlassContainer className="grow flex items-center justify-center h-full p-0 border-0 max-h-[270px]">
        <img
          src={
            data?.find((i: { position: string }) => i.position === "1")
              ? data.find((i: { position: string }) => i.position === "1")
                  ?.image
              : "/ads-1.png"
          }
          className={`w-full h-full object-cover rounded-2xl`}
          alt={"ads 1"}
        />
      </GlassContainer>
      <GlassContainer className="grow flex items-center justify-center h-full p-0 border-0 max-h-[270px]">
        <img
          src={
            data?.find((i: { position: string }) => i.position === "2")
              ? data.find((i: { position: string }) => i.position === "2")
                  ?.image
              : "/ads-1.png"
          }
          className={`w-full h-full object-cover rounded-2xl`}
          alt={"ads 1"}
        />
      </GlassContainer>
    </>
  );
}
