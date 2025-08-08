"use client";

import { GlassContainer } from "@/components/glass-container";
import { AdsSection } from "@/features/ads/ads-section";
import { ChoresSection } from "@/features/chores/chores-section";
import { ClockAndWeatherSection } from "@/features/clock-and-weather/clock-and-weather-section";
import { DailyNotice } from "@/features/daily-notice/daily-notice";
import { GoogleCalendarSection } from "@/features/google-calendar/google-calendar-section";
import { GoogleEventsSection } from "@/features/google-events/google-events-section";
import { GoogleSearchSection } from "@/features/google-search/google.search-section";
import { LinocaSection } from "@/features/linoca/linoca-section";
import { PriceTableSection } from "@/features/price-table/price-table-section";
import { TodoListSection } from "@/features/tolo-list/todo-list-section";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Modal } from "@/components/modal.tsx";
import { LoginModal } from "@/features/auth/login-modal.tsx";
import { SettingsModal } from "@/features/settings/settings-modal.tsx";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";

export function MainPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const { linocaShown, selectedBg } = useAppState(
    useShallow((state) => {
      return {
        linocaShown: state.linocaShown,
        toggleLinocaShown: state.toggleLinocaShown,
        selectedBg: state.selectedBg,
      };
    })
  );
  console.log("selectedBg", selectedBg);

  return (
    <>
      <Modal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
      >
        <SettingsModal onClose={() => setIsSettingModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      </Modal>
      <div
        className={`h-screen w-screen grid place-items-center bg-[url(/bgs/2.jpg)] bg-cover bg-center `}
      >
        <div className="w-10/12 h-10/12   flex flex-col items-stretch gap-4">
          {/* profile start */}
          <div className="flex w-full justify-between items-center h-20  ">
            <div className="flex items-center justify-start flex-row-reverse">
              <p className="text-4xl text-blue-500 font-bold">نوتیکا</p>
              <img src="/logo.png" className="w-20 h-20" />
            </div>
            <div className="flex items-center justify-end gap-4">
              <div
                className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center"
                onClick={async () => {
                  setIsLoginModalOpen(true);
                  // const res = await fetch(
                  //   "http://localhost:3000/api/ext/auth",
                  //   {
                  //     method: "POST",
                  //     body: JSON.stringify({
                  //       email: "member@company.com",
                  //       password: "password",
                  //     }),
                  //   }
                  // );
                  // const data = await res.json();
                  // console.log({ data });
                }}
              >
                <IconUser />
              </div>

              <div
                className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center"
                onClick={() => {
                  setIsSettingModalOpen(true);
                }}
              >
                <IconSettings />
              </div>
              <div className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center">
                <IconLogout />
              </div>
            </div>
          </div>
          {/* profile end */}

          {/* google search start */}

          <div className="flex w-full justify-between items-center gap-4 ">
            <GlassContainer className="w-4/6 h-20">
              <GoogleSearchSection />
            </GlassContainer>
            <GlassContainer className="w-2/6 h-20">
              <ChoresSection />
            </GlassContainer>
          </div>
          {/* google search  end */}

          {/* <div className="flex w-full justify-between items-center h-24  rounded-4xl  bg-white/50 shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm">
          <div>hi</div>
          <div>bye</div>
        </div> */}

          <LinocaSection />

          <div className="flex flex-row justify-between items-stretch gap-4 grow max-h-[550px]">
            <div className="  flex flex-col justify-between items-stretch gap-4 w-1/4">
              <TodoListSection />
            </div>

            <div className="  flex flex-col justify-between items-stretch gap-4 w-1/4">
              <AdsSection />
            </div>

            <div className="  flex flex-col justify-between items-stretch gap-4 w-1/4">
              {linocaShown ? (
                <AdsSection />
              ) : (
                <>
                  <ClockAndWeatherSection />

                  <DailyNotice />

                  <PriceTableSection />
                </>
              )}
            </div>

            <GlassContainer className="  flex flex-col justify-between items-stretch gap-4 w-1/4">
              <GoogleEventsSection />
              <GoogleCalendarSection />
            </GlassContainer>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 
 * 
 * 
 * 
 * 
 * {
    "data": {
        "user": {
            "id": "76d563b7-cf65-4759-9c79-34813929c334",
            "name": "member user",
            "email": "member@company.com",
            "emailVerified": true,
            "image": null,
            "role": "user",
            "createdAt": "2025-08-08T07:37:24.080Z",
            "updatedAt": "2025-08-08T07:37:24.080Z",
            "members": [
                {
                    "id": "440f93b8-1a63-4aff-8fca-eed5dcc980f6",
                    "organizationId": "XmvCHoRf6JePQCMPrtXwjdH1KosZoLrR",
                    "userId": "76d563b7-cf65-4759-9c79-34813929c334",
                    "role": "member",
                    "createdAt": "2025-08-08T07:37:24.163Z",
                    "organization": {
                        "id": "XmvCHoRf6JePQCMPrtXwjdH1KosZoLrR",
                        "name": "asdad",
                        "slug": "asdad",
                        "logo": null,
                        "createdAt": "2025-08-07T11:51:17.389Z",
                        "metadata": null
                    }
                }
            ]
        },
        "auth": {
            "redirect": false,
            "token": "3MFETHvXMgN5l3Hlj0vDekWSqTGIE4Rj",
            "user": {
                "id": "76d563b7-cf65-4759-9c79-34813929c334",
                "email": "member@company.com",
                "name": "member user",
                "image": null,
                "emailVerified": true,
                "createdAt": "2025-08-08T07:37:24.080Z",
                "updatedAt": "2025-08-08T07:37:24.080Z"
            }
        }
    }
}
 */
