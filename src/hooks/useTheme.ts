import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);

  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);

    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    localTheme ? setTheme(localTheme) : setMode("light");

    setIsLoading(false);
  }, []);

  return { theme, toggleTheme, isLoading };
};
