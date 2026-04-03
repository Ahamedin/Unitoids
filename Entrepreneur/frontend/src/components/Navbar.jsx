import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import unitoidsLogo from "../assets/logo1-reduced size.png";
import { Button } from "@/components/ui/button";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex justify-between items-center ">

        {/* 🔥 LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={unitoidsLogo}
            alt="Unitoids"
            className="h-14 md:h-[84px] w-auto object-contain -ml-1 -mt-2"
          />
        </Link>

        {/* ================= DESKTOP ================= */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">

          {location.pathname !== "/" && (
            <Link className="hover:text-white transition" to="/">
              Home
            </Link>
          )}

          <Link className="hover:text-white transition" to="/aboutus">
            About
          </Link>

          <Link className="hover:text-white transition" to="/contact">
            Contact
          </Link>

          <Link className="hover:text-white transition" to="/pp">
            Privacy
          </Link>

          {/* AUTH */}
          {!isSignedIn ? (
            <Link to="/login">
              <Button className="bg-white text-black hover:bg-gray-200">
                Sign In
              </Button>
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </nav>

        {/* ================= MOBILE ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-6 space-y-4 text-gray-300">

          {location.pathname !== "/" && (
            <Link onClick={() => setIsOpen(false)} to="/" className="block hover:text-white">
              Home
            </Link>
          )}

          <Link onClick={() => setIsOpen(false)} to="/aboutus" className="block hover:text-white">
            About
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/contact" className="block hover:text-white">
            Contact
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/pp" className="block hover:text-white">
            Privacy
          </Link>

          {!isSignedIn ? (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-white text-black">
                Sign In
              </Button>
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;