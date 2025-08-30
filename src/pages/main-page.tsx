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
import {
  IconBrandGoogle,
  IconLoader2,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Modal } from "@/components/modal.tsx";
import { LoginModal } from "@/features/auth/login-modal.tsx";
import { SettingsModal } from "@/features/settings/settings-modal.tsx";
import { useAppState } from "@/store.ts";
import { useShallow } from "zustand/react/shallow";
import { CreateGoogleCalendarEvent } from "@/features/google-calendar/create-google-calendar-event";
import { ChoreSettingModal } from "@/features/chores/chore-setting-modal";

export function MainPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isChoreModalOpen, setIsChoreModalOpen] = useState<boolean>(false);

  const { linocaShown, selectedBg, googleToken, setGoogleToken } = useAppState(
    useShallow((state) => {
      return {
        linocaShown: state.linocaShown,
        toggleLinocaShown: state.toggleLinocaShown,
        selectedBg: state.selectedBg,
        googleToken: state.googleToken,
        setGoogleToken: state.setGoogleToken,
      };
    })
  );

  const [isNewEventModalOpen, setIsNewEventModalOpen] =
    useState<boolean>(false);
  console.log("selectedBg", selectedBg);
  console.log("google token", googleToken);

  const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false);
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

      <Modal
        isOpen={isChoreModalOpen}
        onClose={() => setIsChoreModalOpen(false)}
      >
        <ChoreSettingModal onClose={() => setIsChoreModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
      >
        <CreateGoogleCalendarEvent
          selectedDay={new Date().toISOString()}
          setIsNewEventModalOpen={setIsNewEventModalOpen}
        />
      </Modal>
      <div
        //@ts-ignore
        style={{ "--bg-image": `url(${selectedBg})` }}
        className={`h-screen w-screen grid place-items-center bg-[image:var(--bg-image)] bg-cover bg-center`}
      >
        <div className="max-w-[1536px] h-[850px]  flex flex-col items-stretch gap-4 w-full">
          {/* profile start */}
          <div className="flex w-full justify-between items-center h-20  ">
            <div className="flex items-center justify-start flex-row-reverse">
              <p className="text-4xl text-blue-500 font-bold">نوتیکا</p>
              <img src="/logo.png" className="w-20 h-20" />
            </div>
            <div className="flex items-center justify-end gap-4">
              <div
                className="w-12 h-12  bg-white/50  backdrop-blur-sm rounded-full grid place-items-center"
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
                className="w-12 h-12  bg-white/50 backdrop-blur-sm rounded-full grid place-items-center"
                onClick={async () => {
                  setIsGoogleLoginPending(true);
                  //@ts-ignore
                  chrome.identity.getAuthToken(
                    { interactive: true },
                    //@ts-ignore
                    (token) => {
                      if (token) {
                        setGoogleToken(token);
                      } else {
                        console.log("authentication failed");
                      }
                      setIsGoogleLoginPending(false);
                    }
                  );
                }}
              >
                {isGoogleLoginPending ? (
                  <>
                    <IconLoader2 className="animate-spin" />
                  </>
                ) : (
                  <IconBrandGoogle />
                )}
              </div>

              <div
                className="w-12 h-12  bg-white/50  backdrop-blur-sm rounded-full grid place-items-center"
                onClick={() => {
                  setIsSettingModalOpen(true);
                }}
              >
                <IconSettings />
              </div>
              <div className="w-12 h-12  bg-white/50 0 backdrop-blur-sm rounded-full grid place-items-center">
                <IconLogout />
              </div>
            </div>
          </div>
          {/* profile end */}

          {/* google search start */}

          <div className="flex w-full justify-between items-center gap-3 ">
            <GlassContainer className="w-full h-[56px] pl-1">
              <GoogleSearchSection />
            </GlassContainer>
            <div className="max-w-[384px] h-[56px]">
              <ChoresSection
                isChoreModalOpen={isChoreModalOpen}
                setIsChoreModalOpen={setIsChoreModalOpen}
              />
            </div>
          </div>
          <LinocaSection />

          <div className="flex flex-row justify-between items-stretch gap-3 grow max-h-[530px] w-full">
            <div className="  flex flex-col justify-between items-stretch gap-3 w-[375px]">
              <TodoListSection />
            </div>

            <div className="  flex flex-col justify-between items-stretch gap-3 w-[375px]">
              <AdsSection />
            </div>

            <div className="  flex flex-col justify-between items-stretch gap-3 w-[375px]">
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

            <div className="flex flex-col justify-between items-stretch gap-3 w-[375px]">
              <GoogleEventsSection />
              <GoogleCalendarSection
                isNewEventModalOpen={isNewEventModalOpen}
                setIsNewEventModalOpen={setIsNewEventModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 
 * 
 * {
    "user": {
        "id": "76d563b7-cf65-4759-9c79-34813929c334",
        "name": "member user",
        "email": "member@company.com",
        "emailVerified": true,
        "image": null,
        "role": "user",
        "createdAt": "2025-08-08T07:37:24.080Z",
        "updatedAt": "2025-08-08T07:37:24.080Z",
        "accounts": [
            {
                "id": "6ff64142-4cf2-470f-8acb-d13e5731494b",
                "accountId": "76d563b7-cf65-4759-9c79-34813929c334",
                "providerId": "credential",
                "userId": "76d563b7-cf65-4759-9c79-34813929c334",
                "accessToken": null,
                "refreshToken": null,
                "idToken": null,
                "accessTokenExpiresAt": null,
                "refreshTokenExpiresAt": null,
                "scope": null,
                "password": "$argon2id$v=19$m=65536,t=3,p=4$72qswsYiuhVXDgzGcM4xxw$9zbwywIM0B1nhQt7j5ppsViAFmlRCFXSIh6nrRhqNwg",
                "createdAt": "2025-08-08T07:37:24.149Z",
                "updatedAt": "2025-08-08T07:37:24.149Z"
            }
        ],
        "members": [
            {
                "id": "440f93b8-1a63-4aff-8fca-eed5dcc980f6",
                "organizationId": "XmvCHoRf6JePQCMPrtXwjdH1KosZoLrR",
                "userId": "76d563b7-cf65-4759-9c79-34813929c334",
                "role": "member",
                "createdAt": "2025-08-08T07:37:24.163Z",
                "organization": {
                    "id": "XmvCHoRf6JePQCMPrtXwjdH1KosZoLrR",
                    "name": "notica",
                    "slug": "asdad",
                    "logo": null,
                    "createdAt": "2025-08-07T11:51:17.389Z",
                    "metadata": null
                }
            }
        ]
    },
    "auth": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NmQ1NjNiNy1jZjY1LTQ3NTktOWM3OS0zNDgxMzkyOWMzMzQiLCJpYXQiOjE3NTQ2NTk1NTcsImV4cCI6MTc4NjE5NTU1N30.oU_7am5Dd1pDHM9gGEX2sJG_TTpQSrdhfx3q05K6zKU"
    }
}
 */
