import React, { useContext, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { ThemeContext } from "../Context/ThemContext";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ToggleBtn() {

  const { theme, setTheme } = useContext(ThemeContext);

  const darkMode = theme === "dark";

  const buttonRef = useRef(null);

  const onToggle = useCallback(async () => {

    if (!buttonRef.current) return;

    await document.startViewTransition(() => {

      flushSync(() => {

        const toggled = !darkMode;

        setTheme(toggled ? "dark" : "light");

      });

    }).ready;

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
      "

    >

      <AnimatePresence mode="wait">

        {

          darkMode ?

            <motion.span

              key="sun"

              initial={{ opacity: 0, rotate: 30 }}

              animate={{ opacity: 1, rotate: 0 }}

              exit={{ opacity: 0 }}

            >

              <Sun className="text-yellow-400" />

            </motion.span>

            :

            <motion.span

              key="moon"

              initial={{ opacity: 0, rotate: -30 }}

              animate={{ opacity: 1, rotate: 0 }}

              exit={{ opacity: 0 }}

            >

              <Moon className="text-gray-900" />

            </motion.span>

        }

      </AnimatePresence>

    </button>

  );
}

export default ToggleBtn;