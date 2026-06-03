"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Choice = {
  label: string;
  impact: {
    pollution: number;
    reefHealth: number;
    protection: number;
    awareness: number;
  };
  note: string;
};

type Scenario = {
  title: string;
  context: string;
  choices: Choice[];
};
const statCards = [
  {
    label: "Plastic entering the ocean each year",
    value: "5-12M",
    detail: "metric tons annually, with the plastic burden still rising.",
  },
  {
    label: "Marine pollution clogging the ocean in 2021",
    value: "17M",
    detail: "metric tons reported by UN sources.",
  },
  {
    label: "Ocean currently protected",
    value: "8.4%",
    detail: "still far below the 30% 2030 target.",
  },
  {
    label: "Reefs hit by bleaching-level heat stress",
    value: "84%",
    detail: "across 83 countries and territories.",
  },
];

const pressureBars = [
  { label: "Plastic pollution", value: 92 },
  { label: "Warming stress", value: 84 },
  { label: "Ocean protection", value: 28 },
  { label: "Recovery momentum", value: 46 },
];

const scenarios: Scenario[] = [
  {
    title: "Morning commute",
    context: "You grab a drink before heading to the beach cleanup.",
    choices: [
      {
        label: "Refill a reusable bottle",
        impact: { pollution: -7, reefHealth: 4, protection: 1, awareness: 8 },
        note: "A small daily switch cuts plastic pressure immediately.",
      },
      {
        label: "Buy a single-use plastic bottle",
        impact: { pollution: 8, reefHealth: -3, protection: 0, awareness: -2 },
        note: "Convenient now, costly later.",
      },
      {
        label: "Skip the drink and keep going",
        impact: { pollution: 1, reefHealth: 0, protection: 0, awareness: 1 },
        note: "Neutral, but it misses a chance to model better behavior.",
      },
    ],
  },
  {
    title: "Lunch choice",
    context: "The seafood vendor offers two sets of packaging and sourcing options.",
    choices: [
      {
        label: "Choose reusable packaging and local catch",
        impact: { pollution: -5, reefHealth: 5, protection: 3, awareness: 7 },
        note: "Cleaner packaging and responsible sourcing both help.",
      },
      {
        label: "Take everything in takeaway plastic",
        impact: { pollution: 7, reefHealth: -4, protection: -1, awareness: -1 },
        note: "More waste, less ocean safety.",
      },
      {
        label: "Ask about certification and waste reduction",
        impact: { pollution: -2, reefHealth: 2, protection: 2, awareness: 5 },
        note: "Questions change market behavior over time.",
      },
    ],
  },
  {
    title: "Sun protection",
    context: "You are about to swim near a reef and need sunscreen.",
    choices: [
      {
        label: "Use reef-safe sunscreen and swim carefully",
        impact: { pollution: -3, reefHealth: 8, protection: 2, awareness: 8 },
        note: "Directly protects coral and marine life.",
      },
      {
        label: "Use any sunscreen without checking ingredients",
        impact: { pollution: 3, reefHealth: -6, protection: 0, awareness: -1 },
        note: "Some ingredients can add to local reef stress.",
      },
      {
        label: "Skip swimming and share a fact post instead",
        impact: { pollution: 0, reefHealth: 2, protection: 1, awareness: 6 },
        note: "Awareness helps, especially when it leads to action.",
      },
    ],
  },
  {
    title: "Community action",
    context: "Your group can support one final protection move this week.",
    choices: [
      {
        label: "Join a coastal cleanup and report waste hotspots",
        impact: { pollution: -9, reefHealth: 6, protection: 4, awareness: 10 },
        note: "Local data makes protection efforts smarter.",
      },
      {
        label: "Do nothing this week",
        impact: { pollution: 5, reefHealth: -4, protection: -1, awareness: -2 },
        note: "Inaction lets the pressure continue.",
      },
      {
        label: "Invite friends to the campaign page",
        impact: { pollution: -2, reefHealth: 3, protection: 2, awareness: 9 },
        note: "Awareness scales when people share it.",
      },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [pollution, setPollution] = useState(72);
  const [reefHealth, setReefHealth] = useState(64);
  const [protection, setProtection] = useState(8.4);
  const [awareness, setAwareness] = useState(42);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [message, setMessage] = useState(
    "The ocean is absorbing the cost of daily choices. Change the choices, change the tide.",
  );

  const activeScenario = scenarios[step] ?? scenarios[scenarios.length - 1];
  const missionComplete = step >= scenarios.length;

  const outcome = useMemo(() => {
    if (!missionComplete) {
      return {
        title: "Guide the reef",
        text: "Make the next choice to improve ocean health.",
      };
    }

    if (reefHealth >= 80 && pollution <= 50) {
      return {
        title: "Reef recovery path",
        text: "Your decisions reduced pressure and created room for marine life to recover.",
      };
    }

    return {
      title: "Ocean still under pressure",
      text: "You slowed some harm, but the system still needs stronger action to meet 14.1.",
    };
  }, [missionComplete, pollution, reefHealth]);

  function applyChoice(choice: Choice) {
    setPollution((current) => clamp(current + choice.impact.pollution, 0, 100));
    setReefHealth((current) => clamp(current + choice.impact.reefHealth, 0, 100));
    setProtection((current) => clamp(current + choice.impact.protection, 0, 30));
    setAwareness((current) => clamp(current + choice.impact.awareness, 0, 100));
    setMessage(choice.note);
    setStep((current) => Math.min(current + 1, scenarios.length));
  }

  function restartMission() {
    setStep(0);
    setPollution(72);
    setReefHealth(64);
    setProtection(8.4);
    setAwareness(42);
    setMessage(
      "The ocean is absorbing the cost of daily choices. Change the choices, change the tide.",
    );
  }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.16),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(102,170,255,0.16),_transparent_18%)]" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">SDG 14.1 awareness lab</p>
            <p className="mt-1 text-sm text-slate-300">Interactive marine pollution story powered by real UN data</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2">Ocean-ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Mobile-friendly</span>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              SDG 14.1: reduce marine pollution and protect ocean health
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="font-[family-name:var(--font-fraunces)] text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                The ocean is not a dump. It is the system that keeps us alive.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                SDG 14.1 asks the world to prevent and significantly reduce marine pollution by 2025. This site turns the problem into an interactive journey through the numbers, the pressure, and the choices that can still shift the future.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#dashboard" className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">
                Explore the data
              </a>
              <a href="#game" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Play the simulation
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-[color:var(--panel)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">{stat.label}</p>
                  <p className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-white">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-[color:var(--panel-strong)] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-cyan-200/15 bg-gradient-to-br from-cyan-300/15 via-sky-400/10 to-blue-950/40 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Ocean status board</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Current pressure index</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="font-[family-name:var(--font-fraunces)] text-5xl text-white">{pollution}</p>
                    <div className="text-right text-sm text-slate-300">
                      <p>Lower is better</p>
                      <p className="text-cyan-200">for the reef</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { label: "Reef health", value: reefHealth, suffix: "/100", tone: "from-emerald-300 to-cyan-300" },
                    { label: "Protection", value: protection, suffix: "%", tone: "from-blue-300 to-sky-400" },
                    { label: "Awareness", value: awareness, suffix: "/100", tone: "from-amber-200 to-yellow-300" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                      <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                        <span>{item.label}</span>
                        <span>{item.value.toFixed(item.label === "Protection" ? 1 : 0)}{item.suffix}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                          style={{ width: `${item.label === "Protection" ? (item.value / 30) * 100 : item.value}%` }}
                        />

                  <button
                    type="button"
                    onClick={() => setIsPosterOpen(true)}
                    className="mt-5 block w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20 text-left shadow-[0_16px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/8"
                    aria-label="Open the poster image in a centered view"
                  >
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Poster preview</p>
                      <p className="mt-1 text-sm text-slate-300">Click to view larger in the center of the screen.</p>
                    </div>
                    <Image
                      src="/ocean-poster-screenshot.png"
                      alt="Poster about saving life under water"
                      width={1079}
                      height={715}
                      className="h-auto w-full object-cover"
                    />
                  </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section id="dashboard" className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Data visualization</p>
                <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-white sm:text-4xl">
                  Pressure is high. Protection is still too small.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                This dashboard turns SDG 14.1 into a quick read: the ocean is taking on pollution, warming, and weak protection faster than recovery can keep up.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {pressureBars.map((bar) => (
                <div key={bar.label} className="rounded-3xl border border-white/10 bg-[color:var(--panel)] p-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500"
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Ocean target</p>
                <p className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-white">30%</p>
                <p className="mt-2 text-sm text-slate-300">Protected by 2030 under the biodiversity framework.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Current protection</p>
                <p className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-white">8.4%</p>
                <p className="mt-2 text-sm text-slate-300">The gap is the space where policy and action still need to grow.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Heat stress</p>
                <p className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-white">84%</p>
                <p className="mt-2 text-sm text-slate-300">Bleaching-level heat stress hit reefs globally between 2023 and 2025.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-[color:var(--panel-strong)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Protection gauge</p>
                <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-white">How far are we from the 2030 target?</h2>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                live comparison
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative h-60 w-60">
                <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
                  <circle cx="110" cy="110" r="78" className="fill-none stroke-white/10" strokeWidth="18" />
                  <circle
                    cx="110"
                    cy="110"
                    r="78"
                    className="fill-none stroke-cyan-300"
                    strokeLinecap="round"
                    strokeWidth="18"
                    strokeDasharray={`${(protection / 30) * 490} 490`}
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r="52"
                    className="fill-none stroke-sky-400/70"
                    strokeWidth="10"
                    strokeDasharray={`${(reefHealth / 100) * 326} 326`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">protected now</p>
                  <p className="mt-2 font-[family-name:var(--font-fraunces)] text-6xl text-white">{protection.toFixed(1)}%</p>
                  <p className="mt-2 max-w-[11rem] text-sm leading-6 text-slate-300">
                    The target is 30%. Every policy decision moves the dial.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Message from the ocean</p>
                <p className="mt-3 text-base leading-7 text-white">{message}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">Key signal</p>
                <p className="mt-3 text-base leading-7 text-white">
                  The ocean absorbs around 23% of annual CO2 emissions and has taken on more than 90% of the excess heat in the climate system.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section id="game" className="mt-12 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Mini simulation</p>
              <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-white sm:text-4xl">
                Play the reef rescue challenge
              </h2>
            </div>
            <button
              type="button"
              onClick={restartMission}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Restart
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <article className="rounded-[1.75rem] border border-white/10 bg-[color:var(--panel)] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  {missionComplete ? "Mission complete" : `Step ${step + 1} of ${scenarios.length}`}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl text-white">
                  {missionComplete ? outcome.title : activeScenario.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-300">
                  {missionComplete ? outcome.text : activeScenario.context}
                </p>
              </article>

              {!missionComplete ? (
                <div className="grid gap-4">
                  {activeScenario.choices.map((choice) => (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => applyChoice(choice)}
                      className="group rounded-[1.75rem] border border-white/10 bg-black/15 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-white">{choice.label}</p>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{choice.note}</p>
                        </div>
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100 transition group-hover:bg-cyan-300/20">
                          choose
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/10 p-5 text-emerald-50">
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-100/80">Simulation outcome</p>
                  <p className="mt-3 text-base leading-7">
                    {outcome.text} Try the simulation again and see how different decisions change the ending.
                  </p>
                </div>
              )}
            </div>

            <aside className="grid gap-4 content-start">
              <div className="rounded-[1.75rem] border border-white/10 bg-[color:var(--panel-strong)] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Mission dashboard</p>
                <div className="mt-4 space-y-4 text-sm text-slate-200">
                  <div>
                    <div className="flex items-center justify-between">
                      <span>Pollution pressure</span>
                      <span>{pollution}/100</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300" style={{ width: `${pollution}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span>Reef vitality</span>
                      <span>{reefHealth}/100</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" style={{ width: `${reefHealth}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span>Awareness reach</span>
                      <span>{awareness}/100</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-yellow-300" style={{ width: `${awareness}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Bottom line</p>
                <p className="mt-3 text-base leading-7 text-slate-200">
                  You do not need a perfect ocean expert score to help. The goal is to make better default choices, support protection, and keep the pressure visible.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 grid gap-6 rounded-[2rem] border border-white/10 bg-[color:var(--panel)] p-6 backdrop-blur-xl lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">What you can do</p>
            <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-white sm:text-4xl">
              Awareness becomes impact when it turns into habits and policy pressure.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Reduce single-use plastics, ask brands about packaging, support marine protection, and share accurate ocean facts where people can see them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Carry reusables and avoid single-use plastic.",
              "Choose reef-safe products and responsible seafood.",
              "Support marine protected areas and climate action.",
              "Share the facts so awareness spreads beyond one screen.",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-black/15 p-4 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <footer className="mx-auto w-full max-w-7xl px-1 pb-8 pt-10 text-sm text-slate-400">
          <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Built with Copilot agentic AI in VS Code, then pushed to GitHub and deployed on Vercel.
            </p>
            <p>SDG 14.1 awareness site</p>
          </div>
        </footer>

        {isPosterOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Poster image viewer"
            onClick={() => setIsPosterOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[color:var(--panel-strong)] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsPosterOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/60"
              >
                Close
              </button>
              <Image
                src="/ocean-poster-screenshot.png"
                alt="Large poster about saving life under water"
                width={1079}
                height={715}
                className="max-h-[88vh] w-full object-contain"
              />
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}