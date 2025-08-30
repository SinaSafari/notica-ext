import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormProps = {
  loginHander(email: string, password: string): void;
  forgetPasswordHandler(): void;
  loading: boolean;
};

export function LoginForm(props: LoginFormProps) {
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <p className={"text-right text-xl font-bold"}>به نوتیکا خوش آمدید</p>
      <Controller
        control={control}
        name="email"
        render={({ field }) => {
          return (
            <>
              <p className={"text-right text-base"}>
                برای استفاده از نوتیکا ایمیل خود را وارد کنید.
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
                // value={email}
                value={field.value}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={field.onChange}
              />
            </>
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => {
          return (
            <>
              <label htmlFor={"password"} className={"text-right"}>
                رمز عبور
              </label>
              <input
                type={"password"}
                name={"password"}
                className={
                  "rounded-lg border-slate-300 outline-0 border-[1px] w-full px-3 py-1"
                }
                placeholder={"رمز عبور شما"}
                // value={password}
                value={field.value}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={field.onChange}
              />
            </>
          );
        }}
      />

      <p className={"text-xs text-right"}>
        <span>رمز عبور خود را فراموش کردید؟</span>
        <span className={"underline text-blue-600 cursor-pointer mx-1"}>
          کلیک کنید
        </span>
      </p>
      <button
        className={
          "rounded-xl py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        }
        onClick={() => {
          //   props.onClose();
          //   handleSubmit();
          const { email, password } = getValues();
          props.loginHander(email, password);
        }}
        disabled={!isValid}
      >
        {props.loading ? (
          <>
            <IconLoader2 className="animate-spin" />
          </>
        ) : (
          <span>ورود به نوتیکا</span>
        )}
      </button>
      <p className={"text-xs text-center"}>
        <span>می‌خواهید ثبت نام کنید؟</span>
        <span
          className={"underline text-blue-600 cursor-pointer mx-1"}
          onClick={() => {
            // setPage("register:email")
            props.forgetPasswordHandler();
          }}
        >
          ثبت نام در نوتیکا
        </span>
      </p>
    </>
  );
}
