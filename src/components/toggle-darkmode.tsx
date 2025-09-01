import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react"

export function DarkModeToggle() {
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <div className="w-12 h-12 bg-white/50 dark:bg-slate-800 dark:text-white backdrop-blur-sm grid rounded-full place-items-center hover:bg-white dark:hover:bg-slate-900"
            onClick={() => setDark(!dark)}>
            {dark ? <IconMoon /> : <IconSun />}
        </div>
    );
}