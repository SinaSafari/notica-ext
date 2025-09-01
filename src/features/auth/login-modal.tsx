"use client";

import { useAppState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { LoginForm } from "./login-form";

type LoginPage =
  | "login"
  | "register:email"
  | "register:verify"
  | "register:info";

type LoginModal = {
  onClose: () => void;
};
export function LoginModal(props: LoginModal) {
  const [page, setPage] = useState<LoginPage>("login");

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { login } = useAppState(
    useShallow((store) => {
      return {
        login: store.login,
        setBanners: store.setBanners,
      };
    })
  );

  const handleSubmit = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        // "http://localhost:3000/api/ext/auth/login"
        "https://notica.app/api/ext/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      login(
        data.auth.token as string,
        data?.user?.members[0]?.organization?.id
      );
      await queryClient.invalidateQueries({ queryKey: ["banners"] });
      props.onClose();
    } catch (err) {
      console.log({ err });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={
        "w-[768px] h-[448px] rounded-xl bg-zinc-50 dark:bg-slate-800 flex items-stretch justify-between"
      }
    >
      <div className={"flex-1 flex justify-center items-center w-full"}>
        <div
          className={
            "flex flex-col items-stretch justify-center gap-4 w-full max-w-10/12"
          }
        >
          {page === "login" ? (
            <>
              <LoginForm
                forgetPasswordHandler={() => setPage("register:email")}
                loginHander={(email, password) => {
                  handleSubmit(email, password);
                }}
                loading={isLoading}
              />
            </>
          ) : page === "register:email" ? (
            <>
              <p className={"text-center text-xl font-bold"}>
                ثبت نام در نوتیکا
              </p>
              <p className={"text-center text-xs"}>
                برای ثبت نام لطفا ایمیل خود را وارد کنید
              </p>
              <label htmlFor={"email"} className={"text-right"}>
                ایمیل
              </label>
              <input
                type={"email"}
                name={"email"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"ایمیل"}
              />
              <button
                className={
                  "rounded-xl py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                }
                onClick={() => {
                  setPage("register:verify");
                }}
              >
                ثبت نام در نوتیکا
              </button>
              <p className={"text-xs text-center"}>
                <span>ثبت نام کردید؟</span>
                <span
                  className={"underline text-blue-600  cursor-pointer mx-1"}
                  onClick={() => setPage("login")}
                >
                  {" "}
                  ورود نوتیکا
                </span>
              </p>
            </>
          ) : page === "register:verify" ? (
            <>
              <p className={"text-center text-xl font-bold"}>کد تایید</p>
              <p className={"text-center text-xs"}>
                کد تایید ارسال شده به ایمیل وارد شده را وارد کنید.
              </p>
              <label htmlFor={"code"} className={"text-right"}>
                کد تایید
              </label>
              <input
                type={"text"}
                name={"code"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"کد تایید"}
              />
              <button
                className={
                  "rounded-xl py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                }
                onClick={() => {
                  setPage("register:info");
                }}
              >
                تایید کد
              </button>
              <p className={"text-xs text-center"}>
                <span>آدرس ایمیل اشتباه است؟</span>
                <span
                  className={"underline text-blue-600 cursor-pointer mx-1"}
                  onClick={() => setPage("register:email")}
                >
                  تغییر آدرس ایمیل
                </span>
              </p>
            </>
          ) : page === "register:info" ? (
            <>
              <p className={"text-center text-xl font-bold"}>تکمیل اطلاعات</p>
              <p className={"text-center text-xs"}>
                برای اینگه بیشتر بشناسیمت نیاز به اطلاعات بیشتری داریم.
              </p>
              <label htmlFor={"firstname"} className={"text-right"}>
                نام
              </label>
              <input
                type={"text"}
                name={"firstname"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"نام شما"}
              />
              <label htmlFor={"lastname"} className={"text-right"}>
                نام خانوادگی
              </label>
              <input
                type={"text"}
                name={"lastname"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"نام خانوادگی شما"}
              />
              <label htmlFor={"phone"} className={"text-right"}>
                شماره همراه
              </label>
              <input
                type={"text"}
                name={"phone"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"شماره همراه شما"}
              />

              <button
                className={
                  "rounded-xl py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                }
                onClick={() => {
                  props.onClose();
                }}
              >
                تکمیل ثبت نام
              </button>
            </>
          ) : null}
        </div>
      </div>
      <div className={"flex-1 flex justify-center items-center"}>
        {page === "login" ? (
          <img
            src={"/img/auth/welcome.png"}
            alt={"welcome"}
            className={"w-[300px] h-[300px] object-contain"}
          />
        ) : page === "register:email" ? (
          <img
            src={"/img/auth/register.png"}
            alt={"welcome"}
            className={"w-[300px] h-[300px] object-contain"}
          />
        ) : page === "register:verify" ? (
          <img
            src={"/img/auth/verification.png"}
            alt={"welcome"}
            className={"w-[300px] h-[300px] object-contain"}
          />
        ) : page === "register:info" ? (
          <img
            src={"/img/auth/info.png"}
            alt={"welcome"}
            className={"w-[300px] h-[300px] object-contain"}
          />
        ) : null}
      </div>
    </div>
  );
}
