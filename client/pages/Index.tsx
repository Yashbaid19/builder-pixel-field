import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Search, Users, Trophy } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-12">
            <img
              src="https://cdn.builder.io/api/v1/assets/8b4f828eec6344e98bea2975194c1465/landing-page-dc2663?format=webp&width=800"
              alt="People collaborating around a circular design"
              className="mx-auto max-w-md w-full h-auto mb-8"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock New Opportunities with SkillSwap
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect, Learn, and Grow by Exchanging Your Skills
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-skillswap-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Sign Up
            </Link>
            <Link
              to="/how-it-works"
              className="bg-skillswap-yellow text-skillswap-black px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-skillswap-light-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Find Skills */}
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Skills
              </h3>
              <p className="text-gray-600">
                Search for the skills you want to learn from our extensive
                database.
              </p>
            </div>

            {/* Swap */}
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Users className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Swap</h3>
              <p className="text-gray-600">
                Exchange your skills with others and start learning immediately.
              </p>
            </div>

            {/* Gain Experience */}
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Trophy className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gain Experience
              </h3>
              <p className="text-gray-600">
                Apply your newly acquired skills and gain valuable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-skillswap-yellow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-skillswap-black mb-2">
                SkillSwap
              </h3>
              <p className="text-skillswap-black">
                Connecting people through skill sharing
              </p>
            </div>

            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-skillswap-black hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-skillswap-black hover:text-gray-700 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
