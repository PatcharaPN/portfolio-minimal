"use client";
import { useTheme } from "@/app/context/ThemeContext";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const navEntry = useRef<HTMLElement | null>(null);
  const [isNavVisible, setNavVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const delay = 100;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    const timeoutId = setTimeout(() => {
      if (navEntry.current) {
        observer.observe(navEntry.current);
      }
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      if (navEntry.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(navEntry.current);
      }
    };
  }, []);

  const navClass = theme === "dark" ? "text-white" : "text-black";
  const iconClass =
    theme === "dark"
      ? "text-white hover:scale-75 transition-transform duration-300"
      : "text-black hover:scale-75 transition-transform duration-300";
  return (
    <nav
      ref={navEntry}
      style={{ maxWidth: "600px", margin: "0 auto", left: 0, right: 0 }}
      className={`flex backdrop-blur-2xl justify-between z-10 fixed  items-center px-5 py-2 select-none ${navClass} ${isNavVisible ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"}`}
    >
      <div className="flex gap-5">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">PatcharaPN</h1>
        </Link>
        <ul className="flex gap-5 text-xl">
          <Link href={"/Projects"}>
            <li>Projects</li>
          </Link>
        </ul>
      </div>
      <ul className="flex items-center gap-5 ">
        <Link href={"https://github.com/PatcharaPN"}>
          <li>
            <Icon width={45} icon="mdi:github" className={iconClass} />
          </li>
        </Link>

        <li onClick={toggleTheme}>
          {theme === "dark" ? (
            <Icon width={35} icon="ph:sun-fill" className={iconClass} />
          ) : (
            <Icon width={35} icon="ph:moon-fill" className={iconClass} />
          )}
        </li>
        <li className="">
          <h1 className="text-xl">EN</h1>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
