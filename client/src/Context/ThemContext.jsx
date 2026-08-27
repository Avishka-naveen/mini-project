import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemContext({ children }) {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );


  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemContext;