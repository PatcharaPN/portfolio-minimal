"use client";
import React, { useEffect, useRef, useState } from "react";
import { ProjectData } from "../mock/BioData";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import ObjViewer from "../components/3DComponent/Model";
import Link from "next/link";

type Props = {};

const Project = (props: Props) => {
  const contentEntry = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState(false);
  useEffect(() => {
    const delay = 300;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setProject(entry.isIntersecting);
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
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      transition={{ duration: 1 }}
      ref={contentEntry}
      className={`py-16 select-none px-12 ${project ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"} `}
    >
      <div className="">
        <p className="underline text-[1.2rem] mb-6 font-bold">Projects</p>
        <div className="grid grid-cols-2 gap-5">
          {ProjectData.map((project, index) => (
            <div
              key={index}
              className="flex justify-center flex-col items-center mb-2 gap-2"
            >
              <Link href={project.path}>
                <Image
                  className={`rounded-xl bg-white w-64 h-32 object-cover  ${project.style}`}
                  src={project.image1.image1}
                  width={240}
                  height={130}
                  alt={""}
                />
              </Link>
              <div className="felx flex-col text-start">
                <p className="text-[1.2rem]">{project.name}</p>
                <p className="text-center text-[0.8rem]">
                  {project.description}
                </p>
              </div>
              <ul className="flex text-2xl gap-3 w-full h-full justify-start items-center">
                <li>
                  <Icon icon={project.stack.icon.icon1} />
                </li>
                <li>
                  <Icon icon={project.stack.icon.icon2} />
                </li>
                <li>
                  <Icon icon={project.stack.icon.icon3} />
                </li>
                <li>
                  <Icon icon={project.stack.icon.icon4} />
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
