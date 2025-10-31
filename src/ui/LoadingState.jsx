import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useDarkMode from "../hooks/useDarkMode";

function LoadingState() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <motion.img
        src={`/logo-${isDarkMode ? "dark" : "white"}.svg`}
        alt="Loading"
        className="w-32 h-32"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="text-neutral-500 text-sm tracking-wide">Loading...</p>
    </div>
  );
}

export default LoadingState;
