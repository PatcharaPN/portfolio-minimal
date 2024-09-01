"use client";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import ObjViewer from "../3DComponent/Model";

type Props = {};

const Profile = (props: Props) => {
  const contentEntry = useRef<HTMLDivElement>(null);
  const [content1, setContent1] = useState(false);
  useEffect(() => {
    const delay = 300;
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
    <div
      ref={contentEntry}
      className={`select-none pt-16 flex justify-center flex-col items-center ${content1 ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"} `}
    >
      <div className="flex justify-center items-center">
        <Image
          className="relative z-0 rounded-full hover:rotate-45 hover:scale-125 transition-transform duration-100"
          width={200}
          height={200}
          src={"/Mscot.png"}
          alt={""}
        />
      </div>
      <div>
        <p className="text-[2rem] font-semibold">Patcharapol Pannaen</p>
        <p className="">Freelance ( Developer / UI Designer / Artist )</p>
      </div>
      <div className="">
        <ObjViewer />
      </div>
    </div>
  );
};

export default Profile;
