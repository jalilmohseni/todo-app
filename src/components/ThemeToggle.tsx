
import React, { FC } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * ThemeToggle component allows users to toggle between light and dark themes.
 * The selected theme is saved in localStorage using a custom hook.
 */
const ThemeToggle: FC = () => {
  // useLocalStorage is a custom hook that gets and sets a value in localStorage.
  // Here, it provides the current theme and a function to update it.
  const [theme, setTheme] = useLocalStorage<string>("theme", "light");

  /**
   * Toggles the current theme between "light" and "dark",
   * then applies it to the root <html> element.
   */
  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // Save the new theme to localStorage

    // Apply the new theme by manipulating the <html> class list
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
      {/* Display corresponding icon and label based on theme */}
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
