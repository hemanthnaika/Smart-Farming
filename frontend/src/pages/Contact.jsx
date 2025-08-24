import toast, { Toaster } from "react-hot-toast";
import { Contact } from "../assets/images";

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 py-20 px-6">
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src={Contact}
            alt="Smart Farming"
            className="rounded-2xl  max-h-[500px] object-cover"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-slate-800">
            Contact Smart Farming Team
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-indigo-600 to-purple-400 mb-6 rounded-full"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3"
                placeholder="farmer@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Query Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-slate-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Remedy for tomato leaf disease"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="block p-3 w-full text-sm text-slate-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us more about your issue or question..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-6 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
