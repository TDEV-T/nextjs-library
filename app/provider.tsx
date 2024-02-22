"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { ConfigProvider, theme as ThemeAntd } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const CustomProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme } = useTheme();
    const { darkAlgorithm, defaultAlgorithm } = ThemeAntd;
    const [themeSelected, setthemeSelected] = useState("dark");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const router = useRouter();

    return (
        <ThemeProvider attribute="class" defaultTheme={themeSelected}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeProvider>
    );
};