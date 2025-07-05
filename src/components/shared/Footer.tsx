import React from "react";
import { Link } from "react-router";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className=" max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        {/* Brand Section */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Library Management
          </h2>
          <p className="text-xs text-muted-foreground">
            A modern library management system for seamless borrowing and
            inventory.
          </p>
        </div>

        <Separator className="md:hidden" />

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />

          <Link to="/books" className="hover:text-foreground transition-colors">
            Books
          </Link>
          <Separator orientation="vertical" className="h-4 hidden md:block" />

          <Link
            to="/borrow-summary"
            className="hover:text-foreground transition-colors"
          >
            Borrow Summary
          </Link>
        </div>
      </div>

      <div className="border-t">
        <div className=" max-w-7xl mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Library Management. All rights
            reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <span className="text-foreground font-medium">
              Md Abdus Salam Suhag
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
