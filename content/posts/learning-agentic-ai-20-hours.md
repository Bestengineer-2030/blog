---
title: "I'm Learning Agentic AI in 20 Hours. Here's My Plan."
date: "2026-06-06"
excerpt: "Josh Kaufman says 20 hours is enough to get good at anything. Elon Musk says compress the timeline until it seems insane. I'm applying both to learning agentic AI — and building something real by the end."
category: personal
---

Josh Kaufman wrote a book called *The First 20 Hours*.

His argument: the learning curve for any new skill is steepest in the first few hours. If you push through 20 focused hours of deliberate practice, you go from knowing nothing to being reasonably competent. Not expert — competent enough to be useful.

I'm applying this to agentic AI.

## Why Agentic AI

I'm building a personalized supplement platform for Hyrox athletes in India. The model: athlete submits their training load, race history, and health data — AI generates a personalized supplement stack, monthly box ships to their door, agent adjusts the stack every month based on their results. Netflix for supplements.

The core product is an AI agent. Not a chatbot that answers questions — an agent that takes a profile, decides which supplements are right for this specific athlete at this specific training load, generates a timing guide, flags contraindications, and loops until the recommendation is safe and sound.

To build that agent well, I need to understand how agents actually work — at the architecture level, not just "how to prompt ChatGPT."

## The 4 Design Patterns (Week 1 Mental Model)

I started with Andrew Ng's Agentic AI course on DeepLearning.AI. One week in, here's the core framework:

**Reflection** — the agent critiques its own output and improves it. Write → review → rewrite. This is why Claude Code produces better results when you ask it to review what it just built.

**Tool Use** — the agent calls external functions. A search API. A database. A calendar. The agent is not limited to what it knows — it can go out and get information.

**Planning** — before acting, the agent breaks the task into steps. Complex tasks become sequences of simpler actions. This is what makes multi-hour autonomous work possible.

**Multi-Agent** — specialised agents collaborate. A researcher, a writer, a reviewer — each doing what it is best at, passing outputs between them.

## The Insanity Edge

Elon Musk's operating principle, roughly: set a goal so unreasonable that conventional approaches become impossible. Force yourself to find a completely different method.

Applied here: instead of a 12-week course plan, I'm doing the entire learning block in 5 days — 5 hours per day — and spending the last 14 hours building something real.

Not studying. Building.

By the end of this week I will have a working agent that does something useful for my startup. That constraint — *it must work by Friday* — eliminates every low-value learning behaviour. No highlighting. No note-taking that never gets reviewed. No watching the same concept explained five different ways.

Just: understand it well enough to build, then build.

## What I'm Building

A supplement recommendation agent for Hyrox athletes:

1. **Intake Agent** — reads the athlete's health profile (training load, race history, symptoms, deficiencies, diet)
2. **Recommendation Agent** — selects each supplement, sets the dose, builds a timing guide (pre-workout, AM, PM, recovery window) using Tool Use to call structured functions
3. **Review Agent** — runs a Reflection pass: checks every dosage against published safe limits, flags contraindications, revises anything unsafe before the stack reaches the athlete

Input: athlete health profile (20-field form)
Output: a personalized supplement stack + timing guide, safety-checked, ready to fulfill

That's the core product. The platform is the delivery mechanism around it.

## What I've Learned So Far

The most surprising thing: I've been using agentic AI for months without knowing it.

Every time Claude Code built something, reviewed it, found the weak spots, and improved it — that was an agent loop. Observe, think, act, repeat. I just didn't have the vocabulary for it.

Understanding the vocabulary changes how I direct the tool. Instead of asking Claude Code to "write me a page," I'm now asking it to "plan the structure, write a draft, review it against these criteria, then rewrite." That's a deliberate reflection loop. The output quality is noticeably different.

---

Week 2 update coming once the recommendation agent is returning real supplement stacks.

*Following this journey? I post about building an AI-powered personalized supplement platform — the strategy, the tools, and what actually works.*
