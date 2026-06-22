import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-portfolio-bg flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center pt-40">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-6xl font-bold">
            <span className="text-portfolio-primary">4</span>
            <span className="text-white">0</span>
            <span className="text-portfolio-primary">4</span>
          </h1>

          <div className="space-y-4">
            <p className="text-2xl font-bold text-white">Page not found</p>
            <p className="text-portfolio-gray">
              The page you're looking for doesn't exist. Let's get you back on track.
            </p>
          </div>

          <Link
            to="/"
            className="inline-block px-6 py-3 border border-portfolio-primary text-white font-medium hover:bg-portfolio-primary hover:bg-opacity-10 transition"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
