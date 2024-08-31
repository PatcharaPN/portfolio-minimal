"use client";
import React, { ReactNode, useEffect } from "react";

import { useTheme } from "../context/ThemeContext";

const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
