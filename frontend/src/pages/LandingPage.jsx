import { useNavigate } from "react-router-dom";
import {
  Heart,
  Users,
  MessageCircle,
  TrendingUp,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Heart
              size={32}
              className="text-primary-600"
              fill="currentColor"
            />
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              HYB
            </span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl p-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <section className="mb-20 pt-8 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-100 px-5 py-2.5 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            <Heart size={18} />
            Helping each other, one request at a time
          </div>

          <h1 className="mb-6 text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white md:text-7xl">
            Welcome to{" "}
            <span className="bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              HYB
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            Your college community platform where students help students.
            Need notes? Lost something? Looking for a study buddy?
            We’ve got you covered.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="rounded-2xl bg-primary-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary-700 hover:shadow-xl active:scale-95"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="rounded-2xl border-2 border-neutral-200 bg-white px-10 py-4 text-lg font-bold text-neutral-900 shadow-lg transition-all hover:scale-105 hover:bg-neutral-50 hover:shadow-xl active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            >
              Sign In
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 shadow-lg">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
              Community First
            </h3>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              Built by students, for students. Everyone can both ask
              for help and provide help.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent-500 to-accent-600 shadow-lg">
              <MessageCircle size={32} className="text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
              Direct Chat
            </h3>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              Connect directly with helpers through secure one-on-one
              messaging.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 shadow-lg">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">
              Trust Score
            </h3>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
              Build your reputation by helping others. Your help count
              speaks for itself.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-linear-to-r from-primary-500 to-accent-500 p-12 text-center text-white">
          <div className="mb-6 text-7xl">🤝</div>
          <h2 className="mb-4 text-3xl font-bold">
            Join hundreds of students already helping each other
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Start making a difference in your college community today
          </p>
          <button
            onClick={() => navigate("/register")}
            className="rounded-2xl bg-white px-10 py-4 text-lg font-bold text-primary-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Join Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
