import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-8">About</h1>

      <div className="prose">
        <p>
          I'm Sachi — military background, Hyrox athlete, and founder of a gut health
          coaching startup for functional fitness athletes.
        </p>

        <p>
          I started writing here to document two things happening in parallel: building
          an AI-powered sports nutrition business from zero, and learning agentic AI
          using the Kaufman 20-hour method.
        </p>

        <h2>The Gut Health Work</h2>
        <p>
          Most athletes think gut problems during races are bad luck. They're not. They're
          an untrained system. I built a 4-week protocol — evidence-based, India-specific,
          built for Hyrox — that trains your gut the same way you train your legs.
        </p>

        <p>
          The protocol is available as a PDF. If you're a Hyrox or endurance athlete who
          has experienced GI distress mid-race, it was written for you.
        </p>

        <h2>The Building in Public Work</h2>
        <p>
          I'm applying Elon Musk's insanity edge principle to learning: compress the timeline
          until it seems unreasonable, then find the completely different method that makes
          it work. Applied to learning agentic AI — 25 hours total, most of it building, not
          watching courses.
        </p>

        <p>
          I write here when I find something genuinely useful. No newsletter. No weekly cadence.
          Just posts when something is worth saying.
        </p>

        <h2>Find Me</h2>
        <p>
          I'm most reachable on Instagram (search Hyrox India community posts) or via the
          email in my bio. If you're a Hyrox athlete with gut performance questions — reach out.
          That's exactly who I'm building for.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full"
          style={{ background: '#E84C1E' }}
        >
          Read the Blog →
        </Link>
      </div>
    </div>
  )
}
