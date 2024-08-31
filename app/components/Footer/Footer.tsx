"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Footer = (props: Props) => {
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
      className={`flex justify-end my-5 px-14 opacity-70 ${content1 ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"}`}
    >
      © PatcharaPN All Rights Reserved
    </div>
  );
};

export default Footer;
