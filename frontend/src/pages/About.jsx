import { Person } from "../assets/images";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-15 mb-5">
      <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
        <img
          className="max-w-96 w-full object-cover rounded-2xl h-[550px]"
          src={Person}
          alt="Person"
        />
      </div>
      <div className="text-sm text-slate-600 max-w-lg">
        <h1 className="text-xl uppercase font-semibold text-slate-700">
          What we do?
        </h1>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
        <p className="mt-8">
          Smart Farming is a digital platform that empowers farmers to monitor
          crop health, detect diseases using AI, and improve yield through
          data-driven decisions.
        </p>
        <p className="mt-4">
          Our system provides personalized fertilizer recommendations based on
          land type and crop variety, helping reduce waste and improve soil
          health.
        </p>
        <p className="mt-4">
          With features like image-based crop analysis and predictive insights,
          we help farmers take timely actions to protect and grow their crops
          effectively.
        </p>
        <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white">
          <span>Read more</span>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
