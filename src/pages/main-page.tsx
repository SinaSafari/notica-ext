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
import {IconLogout, IconSettings, IconUser} from "@tabler/icons-react";
import {useState} from "react";
import {Modal} from "@/components/modal.tsx";
import {LoginModal} from "@/features/auth/login-modal.tsx";
import {SettingsModal} from "@/features/settings/settings-modal.tsx";
import {useAppState} from "@/store.ts";
import {useShallow} from "zustand/react/shallow";

export function MainPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const {linocaShown, selectedBg} = useAppState(useShallow(state => {
    return {
      linocaShown: state.linocaShown,
      toggleLinocaShown: state.toggleLinocaShown,
      selectedBg: state.selectedBg
    }
  }))
  console.log("selectedBg", selectedBg)

  return (
      <>
        <Modal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)}>
          <SettingsModal onClose={() => setIsSettingModalOpen(false)} />
        </Modal>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      </Modal>
    <div className={`h-screen w-screen grid place-items-center bg-[url(/bgs/2.jpg)] bg-cover bg-center`}>
      <div className="w-10/12 h-10/12 max-h-[852px]  flex flex-col justify-between items-stretch gap-4">
        {/* profile start */}
        <div className="flex w-full justify-between items-center h-20  ">
          <div className="flex items-center justify-start flex-row-reverse">
            <p className="text-4xl text-blue-500 font-bold">نوتیکا</p>
            <img src="/logo.png" className="w-20 h-20" />
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center" onClick={() => {setIsLoginModalOpen(true)}}>
              <IconUser  />
            </div>
            <div className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center" onClick={() => {setIsSettingModalOpen(true)}}>
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

        <div className="flex flex-row justify-between items-stretch gap-4 grow">
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

          <div className="  flex flex-col justify-between items-stretch gap-4 w-1/4">
            <GoogleEventsSection />
            <GoogleCalendarSection />
          </div>
        </div>
      </div>
    </div>
      </>

  );
}
