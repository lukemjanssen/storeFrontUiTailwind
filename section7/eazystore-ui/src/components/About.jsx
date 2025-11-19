function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero / Intro */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-600 p-8 shadow-xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)]" />
        <h1 className="relative text-4xl font-extrabold tracking-tight text-white mb-4">
          About EazyStore
        </h1>
        <p className="relative max-w-2xl text-indigo-50 leading-relaxed">
          We craft seamless shopping experiences powered by modern tech, thoughtful design, and a relentless focus on performance and accessibility.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid gap-10 md:grid-cols-2 mb-12">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Empower shoppers and merchants with fast, reliable, and intuitive commerce experiences. We obsess over details so our users can enjoy frictionless discovery and checkout.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Build a platform that feels effortless—where personalization, performance, and trust converge to redefine digital commerce expectations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-14">
        {[
          { label: "Products Served", value: "25K+" },
          { label: "Global Shoppers", value: "120K" },
          { label: "Avg. Response Time", value: "<150ms" },
          { label: "Uptime", value: "99.98%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 text-center shadow-sm"
          >
            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Core Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Performance First",
              body: "We engineer for speed—optimizing builds, queries, and UI rendering to keep interactions instant.",
            },
            {
              title: "Design With Empathy",
              body: "Interfaces should feel intuitive and inclusive. Accessibility is a baseline, not a bonus.",
            },
            {
              title: "Continuous Learning",
              body: "We iterate relentlessly—refining architecture, tooling, and practices to stay ahead.",
            },
          ].map((val) => (
            <div
              key={val.title}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {val.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                {val.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
