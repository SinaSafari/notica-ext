"use client";

import {
  IconMenu,
  IconMenu2,
  IconMenu3,
  IconNotification,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAppState, type WeatherCity } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

const weatherCities: Array<WeatherCity> = [
  { name: "tehran", title: "تهران", lat: 35.715298, lng: 51.404343 },
  { name: "shiraz", title: "شیراز", lat: 29.591768, lng: 52.583698 },
  { name: "gorgan", title: "گرگان", lat: 36.841644, lng: 54.432922 },
  { name: "qom", title: "قم", lat: 34.639999, lng: 50.876389 },
  { name: "tabriz", title: "تبریز", lat: 38.066666, lng: 46.299999 },
  { name: "ahvaz", title: "اهواز", lat: 31.318327, lng: 48.670620 },
  { name: "kerman", title: "کرمان", lat: 30.29, lng: 57.06 },
];

type SettingsModalProps = {
  onClose: () => void;
};

type Menus = "account" | "background" | "general_settings" | "privacy";

export function SettingsModal(props: SettingsModalProps) {
  const queryClient = useQueryClient();
  const { setSelectedBg, selectedCity, setSelectedCity } = useAppState(
    useShallow((state) => {
      return {
        setSelectedBg: state.setSelectedBg,
        selectedCity: state.selectedCity,
        setSelectedCity: state.setSelectedCity,
      };
    })
  );
  const [activeTab, setActiveTab] = useState<Menus>("account");
  return (
    <>
      <div
        className={
          "w-[768px] h-[440px] rounded-xl bg-slate-100 flex items-stretch justify-between p-4 gap-4"
        }
      >
        <div
          className={
            "rounded-2xl bg-[#F8FAFC] max-w-[220px] flex-1 flex flex-col items-stretch justify-between ring-1 ring-slate-200"
          }
        >
          <div className={"flex-1 flex flex-col items-stretch gap-2 p-4"}>
            <div
              className={`flex items-center justify-between gap-2 text-sm p-1 cursor-pointer ${activeTab === "account"
                  ? "text-white bg-blue-600 rounded-lg p-1"
                  : ""
                }`}
              onClick={() => setActiveTab("account")}
            >
              <div className={"max-w-[16px]"}>
                <IconUser className={"w-[16px] h-16px"} />
              </div>
              <p className={"flex-1 text-right"}>حساب کاربری</p>
            </div>
            <div
              className={`flex items-center justify-between gap-2 text-sm p-1 cursor-pointer ${activeTab === "background"
                  ? "text-white bg-blue-600 rounded-lg p-1"
                  : ""
                }`}
              onClick={() => setActiveTab("background")}
            >
              <div className={"max-w-[16px]"}>
                <IconNotification className={"w-[16px] h-16px"} />
              </div>
              <p className={"flex-1 text-right"}>تصویر پس زمینه</p>
            </div>
            <div
              className={`flex items-center justify-between gap-2 text-sm p-1 cursor-pointer ${activeTab === "general_settings"
                  ? "text-white bg-blue-600 rounded-lg p-1"
                  : ""
                }`}
              onClick={() => setActiveTab("general_settings")}
            >
              <div className={"max-w-[16px]"}>
                <IconMenu className={"w-[16px] h-16px"} />
              </div>
              <p className={"flex-1 text-right"}>تنظیمات عمومی</p>
            </div>
            <div
              className={`flex items-center justify-between gap-2 text-sm p-1 cursor-pointer ${activeTab === "privacy"
                  ? "text-white bg-blue-600 rounded-lg "
                  : ""
                }`}
              onClick={() => setActiveTab("privacy")}
            >
              <div className={"max-w-[16px]"}>
                <IconMenu3 className={"w-[16px] h-16px"} />
              </div>
              <p className={"flex-1 text-right"}>حریم شخصی</p>
            </div>
          </div>
          <div
            className={
              "flex-1 max-h-[70px] flex flex-col items-stretch justify-around px-4 "
            }
          >
            <div
              className={`flex items-center justify-between gap-2 text-sm p-1 cursor-pointer`}
              onClick={() => props.onClose()}
            >
              <div className={"max-w-[16px]"}>
                <IconMenu2 className={"w-[16px] h-16px"} />
              </div>
              <p className={"flex-1 text-right"}>خروج از حساب کاربری</p>
            </div>
            <div className={" w-full h-[1px] bg-slate-300"}></div>
            <p className={"text-center text-xs text-gray-600"}>Version 0.0.1</p>
          </div>
        </div>
        <div
          className={"rounded-2xl bg-[#F8FAFC]  flex-1 ring-1 ring-slate-200"}
        >
          {activeTab === "account" ? (
            <div
              className={
                "flex flex-col items-stretch h-full w-full p-2 text-right"
              }
            >
              <div className={"flex-1 flex flex-col items-stretch gap-2"}>
                <p className={"text-xl font-bold"}>حساب کاربری</p>
                <p className={"text-sm"}>
                  در اینجا میتوانید اطلاعات کاربری خود را تغییر دهید.
                </p>

                <div className={"flex justify-between items-center gap-2"}>
                  <div className={"w-full flex-1"}>
                    <label
                      htmlFor={"password"}
                      className={"text-right text-xs"}
                    >
                      نام
                    </label>
                    <input
                      type={"password"}
                      name={"password"}
                      className={
                        "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      }
                      placeholder={"نام شما"}
                    />
                  </div>
                  <div className={"w-full flex-1"}>
                    <label
                      htmlFor={"password"}
                      className={"text-right text-xs"}
                    >
                      نام خانوادگی
                    </label>
                    <input
                      type={"password"}
                      name={"password"}
                      className={
                        "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                      }
                      placeholder={"نام خانوادگی شما"}
                    />
                  </div>
                </div>
                <label htmlFor={"password"} className={"text-right text-xs"}>
                  شماره موبایل
                </label>
                <input
                  type={"password"}
                  name={"password"}
                  className={
                    "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                  }
                  placeholder={"شماره موبایل شما"}
                />

                <label htmlFor={"password"} className={"text-right text-xs"}>
                  تاریخ تولد
                </label>
                <div className={"flex justify-between items-center gap-2"}>
                  <div className={"w-full flex-1"}>
                    <label className="text-sm">روز</label>
                    <select className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1">
                      {Array.from({ length: 31 - 1 + 1 }, (_, i) => 1 + i).map(
                        (i) => {
                          return <option>{i}</option>;
                        }
                      )}
                    </select>
                  </div>
                  <div className={"w-full flex-1"}>
                    <label className="text-sm">ماه</label>
                    <select className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1">
                      {[
                        "فروردین",
                        "اردیبهشت",
                        "خرداد",
                        "تیر",
                        "مرداد",
                        "شهریور",
                        "مهر",
                        "آبان",
                        "آذر",
                        "دی",
                        "بهمن",
                        "اسفند",
                      ].map((i) => {
                        return <option value={i}>{i}</option>;
                      })}
                      {/* {Array.from(
                        { length: 1404 - 1300 + 1 },
                        (_, i) => 1300 + i
                      ).map((i) => {
                        return <option>{i}</option>;
                      })} */}
                    </select>
                  </div>
                  <div className={"w-full flex-1"}>
                    <label className="text-sm">سال</label>
                    <select className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1">
                      {Array.from(
                        { length: 1404 - 1300 + 1 },
                        (_, i) => 1300 + i
                      )
                        .reverse()
                        .map((i) => {
                          return <option>{i}</option>;
                        })}
                    </select>
                  </div>
                </div>
                <div
                  className="bg-[#DB4437] px-4 py-2 text-white rounded-xl flex items-center justify-center gap-2 flex-row-reverse"
                  onClick={() => {
                    //@ts-ignore
                    chrome.identity.clearAllCachedAuthTokens();
                  }}
                >
                  <IconBrandGoogle />
                  <span>اتصال گوگل به نوتیکا</span>
                </div>
              </div>
              <div className={"max-h-[52px] flex flex-row-reverse"}>
                <button
                  className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
                  onClick={() => props.onClose()}
                >
                  ذخیره
                </button>
              </div>
            </div>
          ) : activeTab === "background" ? (
            <>
              <div
                className={
                  "flex flex-col items-stretch h-full w-full p-2 text-right overflow-y-scroll"
                }
              >
                <div className={"flex-1 flex flex-col items-stretch gap-2"}>
                  <p className={"text-xl font-bold"}>انتخاب تصویر پس زمینه</p>
                  <p className={"text-sm"}>
                    تصویر پس زمینه خود را انتخاب کنید.
                  </p>
                  <div className={"grid grid-cols-4 gap-2"}>
                    <img
                      src={"/bgs/01.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/01.jpg")}
                    />
                    <img
                      src={"/bgs/02.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/02.jpg")}
                    />
                    <img
                      src={"/bgs/03.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/03.jpg")}
                    />
                    <img
                      src={"/bgs/04.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/04.jpg")}
                    />
                    <img
                      src={"/bgs/05.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/05.jpg")}
                    />
                    <img
                      src={"/bgs/06.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/06.jpg")}
                    />
                    <img
                      src={"/bgs/07.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/07.jpg")}
                    />
                    <img
                      src={"/bgs/08.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/08.jpg")}
                    />
                    <img
                      src={"/bgs/09.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/09.jpg")}
                    />
                    <img
                      src={"/bgs/10.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/10.jpg")}
                    />
                    <img
                      src={"/bgs/11.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/11.jpg")}
                    />
                    <img
                      src={"/bgs/12.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/12.jpg")}
                    />
                    <img
                      src={"/bgs/13.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/13.jpg")}
                    />
                    <img
                      src={"/bgs/14.jpg"}
                      className={"w-[114px] h-[64px] cursor-pointer"}
                      onClick={() => setSelectedBg("/bgs/14.jpg")}
                    />
                  </div>
                </div>
                <div className={"max-h-[52px] flex flex-row-reverse"}>
                  <button
                    className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
                    onClick={() => props.onClose()}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </>
          ) : activeTab === "general_settings" ? (
            <>
              <div
                className={
                  "flex flex-col items-stretch h-full w-full p-2 text-right"
                }
              >
                <div className={"flex-1 flex flex-col items-stretch gap-2"}>
                  <p className={"text-xl font-bold"}>تنظیمات عمومی</p>
                  <p className={"text-sm"}>
                    تنظیمات عمومی شامل زبان و نمایش زمان را تغییر دهید.
                  </p>
                  <label htmlFor={"password"} className={"text-right text-xs"}>
                    انتخاب زبان
                  </label>
                  {/* <input
                    type={"password"}
                    name={"password"}
                    className={
                      "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                    }
                    placeholder={"فارسی"}
                  /> */}
                  <select
                    defaultValue={"fa"}
                    className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                  >
                    <option value={"fa"}>فارسی</option>
                  </select>
                  <label htmlFor={"password"} className={"text-right text-xs"}>
                    تغییر شهر آب و هوایی
                  </label>
                  {/* <input
                    type={"password"}
                    name={"password"}
                    className={
                      "text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                    }
                    placeholder={"تهران"}
                  /> */}
                  <select
                    className="text-sm rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                    value={selectedCity.name}
                    onChange={async (e) => {
                      const found = weatherCities.find(
                        (i) => i.name === e.target.value
                      );
                      await queryClient.invalidateQueries({
                        queryKey: ["weather", selectedCity.name],
                      });
                      setSelectedCity(found!);
                    }}
                  >
                    {weatherCities.map((c) => {
                      return <option value={c.name}>{c.title}</option>;
                    })}
                  </select>
                </div>
                <div className={"max-h-[52px] flex flex-row-reverse"}>
                  <button
                    className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
                    onClick={() => props.onClose()}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </>
          ) : activeTab === "privacy" ? (
            <>
              <div
                className={
                  "flex flex-col items-stretch h-full w-full p-2 text-right"
                }
              >
                <div className={"flex-1 flex flex-col items-stretch gap-2"}>
                  <p className={"text-xl font-bold"}>تنظیمات حریم شخصی</p>
                  <p className={"text-sm"}>
                    اعمال تغییرات روی حریم شخصی خود در نوتیکا
                  </p>
                  <hr className="text-gray-200" />
                  <p className="text-xl">تنظیمات حریم شخصی گوگل</p>
                  <div className="flex items-center my-4 justify-end">
                    <div
                      className="bg-[#DB4437] px-4 py-2 text-white rounded-xl flex items-center justify-center gap-2 flex-row-reverse"
                      onClick={() => {
                        //@ts-ignore
                        chrome.identity.clearAllCachedAuthTokens();
                      }}
                    >
                      <IconBrandGoogle />
                      قطع ارتباط با گوگل
                    </div>
                  </div>
                </div>
                <div className={"max-h-[52px] flex flex-row-reverse"}>
                  <button
                    className={"bg-blue-600 rounded-xl text-white px-10 py-2"}
                    onClick={() => props.onClose()}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
