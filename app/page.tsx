"use client";
import Link from "next/link";
import { useTheme } from "./context/ThemeContext";
import { BioDate, Skills, SocialData } from "./mock/BioData";
import { parse } from "path";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { theme } = useTheme();
  const contentEntry = useRef<HTMLDivElement>(null);
  const [content1, setContent1] = useState(false);
  useEffect(() => {
    const delay = 250;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContent1(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    const timeoutId = setTimeout(() => {
      if (contentEntry.current) {
        observer.observe(contentEntry.current);
      }
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      if (contentEntry.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(contentEntry.current);
      }
    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{ duration: 1 }}
        ref={contentEntry}
        className={`w-full h-full select-none ${content1 ? "transition-opacity opacity-100 duration-300" : "transition-opacity opacity-0 duration-300"} `}
      >
        <div className="grid grid-rows-[14rem_auto] px-12">
          <div className="grid grid-rows-[auto]">
            <p className="underline my-5 font-bold text-[1.2rem]">About me</p>
            <article className="indent-8">
              I’ve graduated from
              <Link
                href={"https://www.bu.ac.th/th"}
                className={`px-1 ${theme === "dark" ? "text-orange-300 hover:text-orange-400 duration-300" : "text-orange-700 hover:text-orange-900 duration-300"} `}
              >
                Bangkok University
              </Link>
              with a degree in Computer & Robotic Engineering in 2024. My
              educational journey has equipped me with a strong foundation in
              both theoretical and practical aspects of computer science and
              robotics. During my time at the university, I engaged in various
              projects that enhanced my skills in programming, Design, and
              system design.
            </article>
            <p className="underline text-[1.2rem] my-5 font-bold">Skills</p>
            <div className="grid grid-cols-6 gap-5">
              {Skills.map((skill, index) => (
                <div key={index}>
                  <Icon width={30} icon={skill.icon} color={skill.color} />
                </div>
              ))}
            </div>
            <p className="text-[1.2rem] underline font-bold my-5">Bio</p>
            {BioDate.map((data, index) => (
              <div key={index} className="grid grid-cols-[0.2fr_1fr] ">
                <p className="font-bold">{data.year}</p>
                <p>{data.data}</p>
              </div>
            ))}

            <p className="text-[1.2rem] underline font-bold my-5">Social</p>
            {SocialData.map((data, index) => (
              <div key={index} className="flex flex-col gap-5">
                <Link href={data.link}>
                  <div
                    className={`flex items-center gap-5 font-bold mb-2 ${theme === "dark" ? "text-orange-300 hover:text-orange-400 duration-300" : "text-orange-700 hover:text-orange-900 duration-300"}`}
                  >
                    <Icon icon={data.icon} />
                    <p>{data.username}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
