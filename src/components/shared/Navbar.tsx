import React from "react";
import { Link, NavLink } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const navMenu = [
  { name: "All Books", path: "/books" },
  { name: "Add Book", path: "/create-book" },
  { name: "Borrow Summary", path: "/borrow-summary" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-between mx-auto  max-w-7xl p-4  ">
      <div className="font-semibold">
        <Link to="/">Library Management</Link>
      </div>
      <div className=" gap-4 hidden md:flex">
        {navMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* for small screen */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Library Management</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full justify-center items-center gap-3  font-semibold">
            {navMenu.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) => (isActive ? "text-primary" : "")}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
