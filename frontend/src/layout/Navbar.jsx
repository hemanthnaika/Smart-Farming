import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavbarLinks } from "./../constants/index";
import { logo } from "../assets/images";
import { Link } from "react-router";
import AuthModal from "../components/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

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
        {isAuthenticated ? (
          <div className="hidden md:inline-block relative">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" // or user.profilePhoto if you have it
              alt="Profile"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 z-50">
                <Link
                  to="/user-dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => setShowAuthModal(true)}
              className="font-heading border px-5 py-1 rounded-md hover:bg-tertiary ease-in duration-300 hover:text-secondary cursor-pointer"
            >
              Sign In
            </button>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        )}

        {/* Auth Modal */}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between gap-5">
          {isAuthenticated ? (
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" // or user.profilePhoto if you have it
                alt="Profile"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 z-50">
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setShowAuthModal(true)}
                className="font-heading border px-5 py-1 rounded-md hover:bg-tertiary ease-in duration-300 hover:text-secondary cursor-pointer"
              >
                Sign In
              </button>

              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
              />
            </div>
          )}
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
        </div>
      )}
    </nav>
  );
}
