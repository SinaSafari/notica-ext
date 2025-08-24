"use client";
import { GlassContainer } from "@/components/glass-container";
import { useQuery } from "@tanstack/react-query";

type PriceItemProps = {
  title: string;
  icon?: string;
  changeRate: number;
  price: number;
};

export function PriceTableSection() {
  const { data } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await fetch(
        // "https://notica.rhinolabs.ir/api/ext/price/v1/list"
        "https://notica.app/api/ext/price/v1/list"
      );
      const result = await res.json();
      return result;
    },
    select: (data) => {
      const gold18k = data.gold.find((item: { symbol: string }) => {
        return item.symbol === "IR_GOLD_18K";
      });
      const coin = data.gold.find((item: { symbol: string }) => {
        return item.symbol === "IR_COIN_EMAMI";
      });

      const dollar = data.currency.find((item: { symbol: string }) => {
        return item.symbol === "USD";
      });
      const euro = data.currency.find((item: { symbol: string }) => {
        return item.symbol === "EUR";
      });

      const bitcoin = data.cryptocurrency.find((item: { symbol: string }) => {
        return item.symbol === "BTC";
      });
      const etherium = data.cryptocurrency.find((item: { symbol: string }) => {
        return item.symbol === "ETH";
      });

      const result: Array<PriceItemProps> = [
        {
          title: gold18k!.name,
          price: gold18k!.price,
          changeRate: gold18k!.change_percent,
          icon: "/icons/gold18.png",
        },
        {
          title: coin!.name,
          price: coin!.price,
          changeRate: coin!.change_percent,
          icon: "/icons/coin.png",
        },

        //
        {
          title: dollar!.name,
          price: dollar!.price,
          changeRate: dollar!.change_percent,
          icon: "/icons/dollar.png",
        },
        {
          title: euro!.name,
          price: euro!.price,
          changeRate: euro!.change_percent,
          icon: "/icons/euro.png",
        },

        //
        {
          title: bitcoin!.name,
          price: parseFloat(bitcoin!.price),
          changeRate: bitcoin!.change_percent,
          icon: "/icons/bitcoin.png",
        },
        {
          title: etherium!.name,
          price: parseFloat(etherium!.price),
          changeRate: etherium!.change_percent,
          icon: "/icons/eth.png",
        },
      ];

      return result;
    },
  });

  return (
    <GlassContainer className="grow flex flex-col items-stretch gap-4 max-h-[240px]">
      <p className={"text-xl font-bold text-right"}>الان چند؟</p>
      <div
        className={"flex flex-col flex-1 items-stretch gap-2 justify-around"}
      >
        {data &&
          data.map((item) => {
            return (
              <PriceItem
                title={item.title}
                changeRate={item.changeRate}
                price={item.price}
                icon={item.icon}
              />
            );
          })}
      </div>
    </GlassContainer>
  );
}

function PriceItem(props: PriceItemProps) {
  return (
    <div className={"flex items-center justify-between h-[20px]"}>
      <div className={"flex-1 flex items-center justify-start gap-2"}>
        <img src={props.icon} className={"h-[20px] w-[20px]"} alt={"logo"} />
        <p className={"text-xs"}>{props.title}</p>
      </div>

      <div
        className={`w-[45px] h-[20px] flex items-center justify-center rounded-lg bg-green-700 text-xs text-white text-center p-2 ${
          props.changeRate === 0
            ? "bg-gray-500"
            : props.changeRate > 0
            ? "bg-green-700"
            : "bg-red-700"
        }  `}
      >
        <span>{props.changeRate}</span>
        <span>%</span>
      </div>
      <div className={"flex-1 flex items-center justify-end"}>
        <p>
          <span className="text-sm mx-2">
            {Number(props.price).toLocaleString("fa-IR")}
          </span>
          <span className={"font-thin text-xs"}> تومان </span>
        </p>
      </div>
    </div>
  );
}
