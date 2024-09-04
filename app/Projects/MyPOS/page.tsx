"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const MyPOS = () => {
  const contentEntry = useRef<HTMLDivElement | null>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const delay = 300;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContentVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    const timeout = setTimeout(() => {
      if (contentEntry.current) {
        observer.observe(contentEntry.current);
      }
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (contentEntry.current) {
        observer.observe(contentEntry.current);
      }
    };
  }, []);

  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      transition={{ duration: 1 }}
      ref={contentEntry}
      className={`py-16 px-12 ${contentVisible ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"}`}
    >
      <div className="flex items-center gap-5 mb-2">
        <p className="text-[1.2rem] font-bold">MyPOS</p>
        <p className="bg-orange-800/30 p-1 rounded-md text-[0.8rem]">2024</p>
      </div>
      <section className="flex flex-col gap-2 mb-5">
        <div className="flex gap-5 items-center">
          <p className="bg-green-400/30 w-fit p-1 rounded-md text-[0.8rem]">
            STACK
          </p>
          <p>React, NodeJS, MongoDB</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="bg-green-400/30 w-fit p-1 rounded-md text-[0.8rem]">
            WEBSITE
          </p>
          <Link
            className="flex items-center gap-1"
            href="https://my-pos-frontend.vercel.app"
          >
            <p
              className={`hover:underline ${theme === "dark" ? "text-orange-300" : "text-orange-700"}`}
            >
              https://my-pos-frontend.vercel.app/
            </p>
            <Icon
              className={`${theme === "dark" ? "text-orange-300" : "text-orange-700"}`}
              icon={"majesticons:open"}
            />
          </Link>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-4">
          <Image
            className="w-full rounded-md"
            src={"/Project/MyPOS/myPOS3.png"}
            width={1000}
            height={1000}
            alt={""}
          />
          <Image
            className="w-full rounded-md"
            src={"/Project/MyPOS/myPOS_2.png"}
            width={1000}
            height={1000}
            alt={""}
          />
          <Image
            className="w-full rounded-md"
            src={"/Project/MyPOS/myPOS_1.png"}
            width={1000}
            height={1000}
            alt={""}
          />
        </div>
      </section>
    </motion.div>
  );
};

export default MyPOS;
