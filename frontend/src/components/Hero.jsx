import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { hero } from "../assets/images";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(() => {
    const heroSplit = new SplitText(".hero-title", {
      type: "chars words",
    });
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    gsap.from(heroSplit.chars, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.03,
    });

    gsap.from(paragraphSplit.lines, {
      duration: 1,
      delay: 1,
      y: 50,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.5,
    });
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero section with smart farming intro"
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 ">
        <h1 className="text-5xl md:text-4xl font-heading text-center leading-tight hero-title text-shadow">
          Empowering Farmers with <br className="hidden sm:block" />
          <span className="text-accent">Smart Technology</span>
        </h1>

        <p className="mt-4 text-lg md:text-md font-paragraph text-center max-w-xl subtitle">
          Sell your crops, detect plant diseases, and get fertilizer advice —
          all in one place.
        </p>

        <Link
          to="/"
          className="bg-tertiary hover:bg-accent text-white py-3 px-10 rounded-md mt-8 transition duration-300 ease-in-out font-heading"
        >
          Get Started
        </Link>

        {/* ✅ Scroll Button */}
        <button
          onClick={scrollToNextSection}
          className="mt-10 text-white animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
