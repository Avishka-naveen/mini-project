import React from 'react'

function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-blue-600">
            ABOUT QUICK-HIRE
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Connecting Talent
            <span className="block text-blue-600">
              With Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Quick-Hire is a simple and reliable platform that connects
            talented job seekers with employers looking for the right people.
          </p>

          <button className="mt-8 rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:-translate-y-0.5">
            Explore Jobs
          </button>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        {/* Image / Card */}
        <div className="flex min-h-[380px] items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-8">
          <div className="w-full max-w-sm rounded-2xl bg-white p-10 text-center shadow-2xl">
            <div className="text-6xl">🚀</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Build Your Future
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              Discover opportunities and take the next step in your career.
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-sm font-bold tracking-[0.2em] text-blue-600">
            WHO WE ARE
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Making recruitment{" "}
            <span className="text-blue-600">
              simple and accessible
            </span>
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Finding a job or the right employee shouldn't be complicated.
            Quick-Hire was created to make the hiring process easier, faster,
            and more accessible for everyone.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Our platform brings job seekers and employers together in one
            convenient place, helping people discover opportunities and
            businesses find talented individuals.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {/* Mission */}
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🎯
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 text-slate-500">
              To make recruitment simple, efficient, and accessible by
              connecting talented people with meaningful opportunities.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🌎
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 text-slate-500">
              To create a trusted platform where people can discover
              opportunities and businesses can build great teams.
            </p>
          </div>

          {/* Values */}
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🤝
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Our Values
            </h3>

            <p className="mt-4 leading-7 text-slate-500">
              We focus on simplicity, accessibility, trust, and meaningful
              connections between people and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-[0.2em] text-blue-600">
            WHAT WE OFFER
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            One platform.
            <span className="text-blue-600"> Endless possibilities.</span>
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Whether you're searching for your next career opportunity or
            looking for talented people to join your team, Quick-Hire makes
            the process easier.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Job Seekers */}
          <div className="rounded-2xl border border-slate-200 p-8 transition hover:border-blue-500 hover:shadow-xl">
            <div className="text-4xl">👨‍💼</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              For Job Seekers
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Discover new job opportunities
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Find jobs that match your skills
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Explore different career paths
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Take the next step in your career
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="rounded-2xl border border-slate-200 p-8 transition hover:border-blue-500 hover:shadow-xl">
            <div className="text-4xl">🏢</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              For Employers
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Post job opportunities easily
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Reach talented candidates
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Manage job listings
              </li>

              <li className="flex gap-3">
                <span className="text-blue-600">✓</span>
                Build your team with confidence
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 px-6 py-24 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to take the next step?
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-blue-200">
          Find your next opportunity or discover your next great hire
          with Quick-Hire.
        </p>

        <button className="mt-8 rounded-lg bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50">
          Get Started
        </button>
      </section>
    </div>
  );
  
}

export default AboutUs