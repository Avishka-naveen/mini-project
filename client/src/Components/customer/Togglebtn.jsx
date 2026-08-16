import React, { useContext, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { ThemeContext } from "../../Context/ThemContext";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ToggleBtn() {
  const { theme, setTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";
  const buttonRef = useRef(null);

  const onToggle = useCallback(async (e) => {
    if (!buttonRef.current) return;


    if (!document.startViewTransition) {
      setTheme(darkMode ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

  
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

 
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(darkMode ? "light" : "dark");
      });
    });

   
   await transition.ready;

    const isGoingDark = !darkMode;

    document.documentElement.animate(
     {
    clipPath: isGoingDark
      ? ['inset(0 100% 0 0)', 'inset(0 0 0 0)']
      : ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
  },
  {
    duration: 500,
    easing: "ease-in-out",
    pseudoElement: "::view-transition-new(root)",
  }
    );
  }, [darkMode, setTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      className="
        p-2
        rounded-full
        bg-gray-200
        dark:bg-gray-800
        transition-colors
      "
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            className="block"
          >
            <Sun className="text-yellow-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            className="block"
          >
            <Moon className="text-gray-900" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default ToggleBtn;