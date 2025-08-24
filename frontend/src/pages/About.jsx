import { Person } from "../assets/images";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-20 mb-5">
      <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
        <img
          className="max-w-96 w-full  rounded-2xl h-[550px]"
          src={Person}
          alt="Person"
        />
      </div>
      <div className="text-sm text-slate-600 max-w-2xl">
        <h1 className="text-xl uppercase font-semibold text-slate-700">
          What we do?
        </h1>
        <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
        <div className="text-lg text-justify">
          <p className="mt-8">
            <strong>Smart Farming Platform</strong> is an AI-powered web
            application designed to support farmers in making better and smarter
            agricultural decisions. The platform primarily focuses on{" "}
            <strong>crop disease detection</strong> using deep learning
            techniques, allowing farmers to simply upload leaf images for
            accurate disease identification. Once a disease is detected, the
            system suggests suitable <strong>remedies and solutions</strong> to
            protect crops and prevent yield loss.
          </p>
          <p className="mt-4">
            In addition to disease detection, the platform enables farmers to{" "}
            <strong>manage their own products</strong> with features to{" "}
            <strong>add, edit, and delete listings</strong>. Other farmers or
            users can view these product listings, encouraging knowledge sharing
            and collaboration within the farming community.
          </p>
          <p className="mt-4">
            The platform is built with simplicity and accessibility in mind — it
            has only <strong>users</strong> (no admin role) to keep interactions
            straightforward and farmer-friendly.
          </p>
          <p className="mt-4">
            Our mission is to <strong>empower farmers</strong> with AI-driven
            tools that improve crop health, reduce losses, and enhance
            productivity, creating a sustainable and efficient agricultural
            ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
