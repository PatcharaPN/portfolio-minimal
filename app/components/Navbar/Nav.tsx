import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between fixed w-full items-center px-5 py-2">
      <div className="flex gap-5">
        <h1 className="font-bold">Logo</h1>
        <ul className="flex gap-5">
          <li>Projects</li>
          <li>Skills</li>
        </ul>
      </div>
      <ul className="flex">
        <li>
          <Icon width={45} icon="mdi:github" />
        </li>
        <li>
          <Icon icon="ph:moon-fill" />
        </li>
        <li></li>
      </ul>
    </nav>
  );
};
export default Navbar;
