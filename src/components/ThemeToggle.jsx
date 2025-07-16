import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // TODO Try to stay away from useEffect
  // useEffect(() => {
  //   document.documentElement.classList.remove('light', 'dark');
  //   document.documentElement.classList.add(theme);
  // }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
