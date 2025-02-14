import Button from "../components/Button";
import { FaBolt, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import gpuanimation from "../assets/landingpage/gpuanimation.gif";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <div className="flex justify-center items-center">
          <img
            src={gpuanimation}
            alt="gpuanimation"
            className="max-w-full h-auto sm:max-w-md"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Bid on High-Performance GPUs
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Get the best deals on the latest GPUs through our secure auction
          platform.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg">
          <Link to="/login">Start Bidding</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 sm:px-10 py-16">
        <FeatureCard
          icon={<FaBolt className="text-yellow-400 text-5xl mx-auto" />}
          title="Fast Bidding"
          description="Real-time bidding with instant updates and notifications."
        />
        <FeatureCard
          icon={<FaMoneyBillWave className="text-green-400 text-5xl mx-auto" />}
          title="Best Prices"
          description="Win auctions at unbeatable prices and save big on GPUs."
        />
        <FeatureCard
          icon={<FaBolt className="text-blue-400 text-5xl mx-auto" />}
          title="Instant GPU Selling"
          description="List your GPU in seconds and sell it at the best price!"
        />
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 sm:py-20 bg-blue-700 px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Join the Auction Now
        </h2>
        <p className="text-gray-200 mb-6">
          Sign up today and start bidding on your dream GPU.
        </p>
        <Button className="bg-white text-blue-700 px-6 py-3 text-lg rounded-lg">
          <Link to="/register"> Sign Up</Link>
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 text-center rounded-lg shadow-lg flex flex-col items-center"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </motion.div>
  );
}
