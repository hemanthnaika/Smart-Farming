import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavbarLinks } from "./../constants/index";
import { logo } from "../assets/images";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <div
        className={`px-5 md:px-10 py-2 flex justify-between items-center transition-all duration-300 z-40 ${
          scrolled
            ? "fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md shadow-md"
            : "absolute top-0 left-0 right-0 w-"
        }`}
      >
        {/* Logo */}
        <Link>
          {" "}
          <img src={logo} alt="Logo" className="w-15 h-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm">
          {NavbarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative font-heading tracking-widest   
               after:content-[''] after:absolute after:left-0 after:bottom-0 
               after:h-[2px] after:w-0 after:bg-tertiary after:transition-all 
               after:duration-300 hover:after:w-full text-md"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            className="font-heading border px-5 py-1 rounded-md hover:bg-tertiary ease-in duration-300 hover:text-secondary"
            to="/login"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden absolute  bg-primary w-full h-screen flex flex-col items-center justify-center gap-6 z-50 mt-15 ">
          {NavbarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block relative font-heading tracking-wide  text-lg
          after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:h-[2px] after:w-0 after:bg-tertiary after:transition-all 
          after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
          <Link
            className="font-heading border px-5 py-1 rounded-md hover:bg-tertiary ease-in duration-300 hover:text-secondary"
            to="/login"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
