import Image from "next/image";
import { ApplicationForm } from "@/components/ApplicationForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-deep-black text-bone">
      <Nav />
      <Hero />
      <PainValidation />
      <PainPoints />
      <TheDrift />
      <Story />
      <GroundFramework />
      <OfferBreakdown />
      <NotForYou />
      <FAQ />
      <ApplySection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-deep-black/85 backdrop-blur border-b border-bone/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Whole Dad Movement"
            width={56}
            height={56}
            priority
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />
          <span className="font-display text-lg sm:text-xl tracking-widest uppercase text-bone">
            Whole Dad <span className="text-rust">Movement</span>
          </span>
        </a>
        <a
          href="#apply"
          className="btn-rust px-5 py-2 text-sm hidden sm:inline-block"
        >
          Apply
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="distress relative overflow-hidden border-b border-bone/10"
    >
      <div className="absolute inset-0 marble opacity-90" aria-hidden />
      <div
        className="absolute inset-0 rings opacity-80"
        style={{ backgroundSize: "900px 900px", backgroundPosition: "center" }}
        aria-hidden
      />
      <div className="absolute inset-0 vignette" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-40 lg:py-48">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          1:1 Coaching · Whole Dad Movement
        </div>
        <h1 className="font-display uppercase text-bone leading-[0.92] text-5xl sm:text-7xl lg:text-8xl max-w-5xl">
          You&apos;re not <span className="text-rust">burned out.</span>
          <br />
          You&apos;re <span className="text-stroke">drifting.</span>
          <br />
          And your family is noticing.
        </h1>
        <p className="mt-8 max-w-2xl font-sub uppercase tracking-wider text-bone/85 text-lg sm:text-xl leading-relaxed">
          For the high-achieving dad who&apos;s been Day&nbsp;1 for the 18th
          week. The guy with a folder of unfinished programs, a gym membership
          he hasn&apos;t touched since January, and a marriage running on
          fumes. Stop quitting in private. Build standards that hold on your
          worst day.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#apply" className="btn-rust px-8 py-4 text-base">
            Apply for 1:1 Coaching
          </a>
          <a href="#story" className="btn-ghost px-8 py-4 text-base">
            Read the Story
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-sub uppercase tracking-widest text-xs text-bone-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-rust" />
            Application only
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-rust" />
            Biweekly 1:1 calls
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-rust" />
            Text accountability
          </span>
        </div>
      </div>
    </section>
  );
}

function PainValidation() {
  const quotes = [
    "I have everything I should want… and I still feel empty.",
    "I&apos;m tired all the time and I don&apos;t know why.",
    "I&apos;ve been Day 1 for the 18th week in a row.",
    "I&apos;m physically here but mentally absent at home.",
    "I know what I should be doing. I&apos;m just not doing it.",
    "I don&apos;t even recognize myself anymore.",
  ];
  return (
    <section className="distress relative border-b border-bone/10">
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          The Quiet Quit
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          If you&apos;ve ever said any of these
          <span className="text-rust"> out loud —</span>
          <br />
          this page is for you.
        </h2>
        <div className="mt-14 grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="bg-deep-black p-8 brackets"
              style={{ minHeight: 180 }}
            >
              <div className="font-display text-rust text-3xl mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p
                className="font-sub uppercase tracking-wider text-bone text-lg leading-snug"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${q}&rdquo;` }}
              />
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl font-body text-bone-dim text-lg leading-relaxed">
          You&apos;re not lazy. You&apos;re not broken. You&apos;re drained
          from carrying things you were never meant to carry alone. The shame
          of restarting is what&apos;s keeping you stuck — the secret
          DoorDash trash in the car, the quiet quit on Tuesday, the gym bag in
          the trunk that hasn&apos;t moved. Every dad I coach has been there.
          So have I.
        </p>
      </div>
    </section>
  );
}

function PainPoints() {
  const points = [
    {
      headline: "The driveway pause.",
      body: "You sit in the car at 6pm and need ten minutes before you can walk inside. The kids hear the garage. They don&apos;t hear the door.",
    },
    {
      headline: "Snapping at your wife over nothing.",
      body: "Then lying in bed running the receipts on her — &ldquo;five things she does wrong&rdquo; — when you know full well it&apos;s not about her. It&apos;s your mental load leaking out sideways.",
    },
    {
      headline: "Hiding the relapse.",
      body: "The DoorDash bag in the trunk you slid out before she saw it. The drink count you under-report. The gym bag that hasn&apos;t moved since January. The quiet quit on Tuesday no one knows about.",
    },
    {
      headline: "Physically there. Mentally gone.",
      body: "You&apos;re at the dinner table and you couldn&apos;t tell me what your kid just said. You nod at the right beats. Your phone is glowing in your lap.",
    },
    {
      headline: "&ldquo;Day 1&rdquo; for the 18th week in a row.",
      body: "You can&apos;t say the words &ldquo;Monday I start&rdquo; out loud anymore without flinching. The folder of unfinished programs is a quiet shame archive.",
    },
    {
      headline: "Successful on paper. Hollow in the chest.",
      body: "Title&apos;s good. Comp&apos;s good. Kids are good. And you sit there at 2pm and ask, &ldquo;Is this really it?&rdquo; And you feel guilty for asking.",
    },
    {
      headline: "Guilt no matter what you pick.",
      body: "Work harder &mdash; bad dad. Pull back &mdash; falling behind. Hit the gym &mdash; selfish. Skip the gym &mdash; weak. Nothing feels clean. Everything feels owed.",
    },
    {
      headline: "You don&apos;t recognize yourself.",
      body: "Old photos. Old voicemails. The way you used to walk into a room. &ldquo;I used to be more driven. More present. More me.&rdquo; You&apos;re not sure where he went.",
    },
  ];
  return (
    <section className="distress relative bg-deep-black border-b border-bone/10">
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          The Pain You Don&apos;t Say Out Loud
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          If you&apos;ve felt
          <br />
          <span className="text-rust">any of this lately —</span>
          <br />
          it&apos;s not just you.
        </h2>
        <p className="mt-6 max-w-3xl font-body text-bone-dim text-lg leading-relaxed">
          These are the receipts I&apos;ve seen in every burned-out, high-achieving
          dad I&apos;ve coached &mdash; including the one I see in the mirror.
          Run through the list. Mark the ones that land.
        </p>

        <div className="mt-14 grid gap-px bg-bone/10 md:grid-cols-2">
          {points.map((p, i) => (
            <div key={i} className="bg-deep-black p-8 flex gap-5">
              <div className="font-display text-rust text-3xl leading-none shrink-0 w-10 pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3
                  className="font-sub uppercase tracking-wider text-bone text-lg sm:text-xl leading-snug"
                  dangerouslySetInnerHTML={{ __html: p.headline }}
                />
                <p
                  className="mt-3 font-body text-bone-dim leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-l-2 border-rust pl-6 max-w-3xl">
          <p className="font-sub uppercase tracking-wider text-bone text-lg leading-snug">
            If three or more of those landed, keep reading.
          </p>
          <p className="mt-3 font-body text-bone-dim leading-relaxed">
            You&apos;re not lazy. You&apos;re not broken. You&apos;re not
            uniquely failing. You&apos;re a high-capacity dad who&apos;s been
            carrying the weight alone for too long &mdash; and there is a way
            back. It&apos;s called <span className="text-rust">standards</span>,
            not motivation. And it&apos;s built for your worst day.
          </p>
        </div>
      </div>
    </section>
  );
}

function TheDrift() {
  const problems = [
    {
      n: "01",
      title: "You&apos;re doing all the right things… and still feel stuck.",
      body: "Career, kids, income — it looks fine on paper. Internally, it&apos;s foggy. You&apos;re achieving but not aligning. The root issue isn&apos;t output. It&apos;s clarity — purpose, priorities, personal standards.",
    },
    {
      n: "02",
      title: "You can&apos;t keep up. Nothing sticks.",
      body: "Start-and-stop with health, habits, sleep, the marriage. Chronic guilt around family or discipline. You don&apos;t need more motivation. You need a system that works on your worst day.",
    },
    {
      n: "03",
      title: "You don&apos;t feel like yourself anymore.",
      body: "&ldquo;I used to be more driven. More focused. More me.&rdquo; That&apos;s drift from values — misalignment between who you are and what you&apos;re doing. You don&apos;t need a new life. You need to come back to the one you&apos;re called to lead.",
    },
    {
      n: "04",
      title: "You can&apos;t lead at home when you feel lost yourself.",
      body: "You can&apos;t lead your wife, your kids, or your team from an empty tank. Real leadership starts in the mirror. Feet Forward — lead yourself first, then everyone else.",
    },
  ];
  return (
    <section className="distress relative bg-deep-black border-b border-bone/10">
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          The Real Problem
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          This isn&apos;t burnout.
          <br />
          <span className="text-rust">It&apos;s drift.</span>
        </h2>
        <p className="mt-6 max-w-3xl font-body text-bone-dim text-lg leading-relaxed">
          Burnout is a symptom. The real disease is drift — quiet, slow,
          invisible. It doesn&apos;t announce itself. It just shows up one
          Tuesday at 41 when you&apos;re sitting in the driveway, not ready to
          go inside.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {problems.map((p) => (
            <div key={p.n} className="brackets p-8 border border-bone/15">
              <div className="font-display text-rust text-6xl leading-none mb-4">
                {p.n}
              </div>
              <h3
                className="font-sub uppercase tracking-wider text-bone text-2xl leading-tight"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
              <p
                className="mt-4 font-body text-bone-dim leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section
      id="story"
      className="distress relative bg-deep-black border-b border-bone/10"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-24 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
            Who I Am
          </div>
          <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl">
            I&apos;m not the guru on the mountain.
            <br />
            <span className="text-rust">
              I&apos;m the guy who already climbed that hill.
            </span>
          </h2>
        </div>
        <div className="lg:col-span-7 font-body text-bone-dim text-lg leading-relaxed space-y-5">
          <p>
            I&apos;m Josh. Husband to Raechel for 20+ years. Dad to four —
            Logan, Carter, Blake, and Emma. I spent a decade looking
            successful and feeling hollow. Corporate exec roles, six-figure
            paychecks, growing family — and a body that hit 300+ pounds, a
            marriage on fumes, and a head full of fog.
          </p>
          <p>
            I lost 70+ pounds. Rebuilt my marriage. Got back to my kids. Not
            with motivation. With <span className="text-rust">standards</span>
            &nbsp;— five daily non-negotiables that I do whether I feel like
            it or not, because my boys are watching how I handle hard.
          </p>
          <p>
            Now I coach high-capacity, burned-out dads who are quietly drifting.
            I&apos;ve walked the road. I&apos;ll walk it with you.
          </p>
          <div className="pt-4 border-t border-bone/15 grid grid-cols-3 gap-6">
            <Stat n="300+ → 230" label="lbs lost" />
            <Stat n="4" label="kids at home" />
            <Stat n="20+ yrs" label="married" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-rust text-3xl sm:text-4xl">{n}</div>
      <div className="font-sub uppercase tracking-widest text-xs text-bone-dim mt-1">
        {label}
      </div>
    </div>
  );
}

function GroundFramework() {
  const pillars = [
    {
      letter: "G",
      title: "Grounded Start",
      body: "5am wake. Same breakfast. Phone in the drawer until you&apos;ve owned the first 90 minutes. Win the morning, win the man.",
    },
    {
      letter: "R",
      title: "Reps That Hold",
      body: "Move daily — not crush daily. Five non-negotiables you can run on four hours of sleep and a sick kid. Standards over hype.",
    },
    {
      letter: "O",
      title: "Open the Loop",
      body: "Stop hiding the relapse. We name it, log it, move on. Shame keeps you on Day 1 forever. Truth lets you start Day 2.",
    },
    {
      letter: "U",
      title: "Under Identity",
      body: "&ldquo;Lose 50 lbs&rdquo; is a goal. &ldquo;I&apos;m a man who shows up at 5am whether he feels like it or not&rdquo; is an identity. We anchor the second one.",
    },
    {
      letter: "N",
      title: "Next Action",
      body: "Clarity is a verb. Every call ends with one next action — owned, dated, witnessed. No more &ldquo;I need to think about it.&rdquo;",
    },
    {
      letter: "D",
      title: "Daily is Daily",
      body: "Where your feet are is where you should be. Not the highlight reel. Not the Monday reset. Daily. Quiet. Repeatable. Forever.",
    },
  ];
  return (
    <section className="distress relative bg-deep-black border-b border-bone/10">
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          The Framework
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          The way back is called
          <br />
          <span className="text-rust">G.R.O.U.N.D.</span>
        </h2>
        <p className="mt-6 max-w-3xl font-body text-bone-dim text-lg leading-relaxed">
          Six pillars. One purpose. We build the floor under your feet — the
          standards that hold whether you&apos;re inspired or exhausted, whether
          the kid slept or didn&apos;t, whether the quarter hit or missed.
        </p>

        <div className="mt-14 grid gap-px bg-bone/10 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.letter} className="bg-deep-black p-8 brackets">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-rust text-6xl leading-none">
                  {p.letter}
                </span>
                <span className="font-sub uppercase tracking-widest text-bone text-xl">
                  {p.title}
                </span>
              </div>
              <p
                className="font-body text-bone-dim leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferBreakdown() {
  const items = [
    {
      label: "Biweekly 1:1 calls",
      body: "60-minute video calls with Josh, every other week. Plan. Pressure-test. Course-correct. Every call ends with one owned next action.",
    },
    {
      label: "Access by text",
      body: "Direct text access to me between calls. Drop a check-in, a win, a stuck. I reply same-day. Real human. No bots, no AI auto-responder.",
    },
    {
      label: "Your custom GROUND plan",
      body: "We build your 5 daily non-negotiables together. Not mine. Yours. Built for your life, your worst-day version of you.",
    },
    {
      label: "Marriage + presence work",
      body: "We coach the man who walks back through the door at 6pm. The dad your kids actually need at the dinner table.",
    },
    {
      label: "Identity rebuild",
      body: "We name who you&apos;re becoming. We write it down. We measure against it. Every session.",
    },
    {
      label: "Private community",
      body: "<span class='text-rust font-sub uppercase tracking-widest text-sm'>Coming soon.</span> A small, vetted room of other Whole Dad clients. No cheerleading. No motivational poster energy. Optional access included when it opens.",
    },
    {
      label: "Curated reading list",
      body: "One book a month, assigned with discussion built into our calls. Real books that move the needle &mdash; <em>Atomic Habits</em>, <em>Essentialism</em>, <em>Boundaries</em>, <em>The Common Rule</em>, and rotating picks based on where you are. We read it. We work it. We don&apos;t just talk about it.",
    },
  ];
  return (
    <section
      id="offer"
      className="distress relative bg-deep-black border-b border-bone/10"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          The Coaching
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          Coaching plan
          <br />
          <span className="text-rust">consists of:</span>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex gap-5">
              <div className="font-display text-rust text-3xl leading-none shrink-0 w-10">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-sub uppercase tracking-wider text-bone text-xl">
                  {it.label}
                </h3>
                <p
                  className="mt-2 font-body text-bone-dim leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: it.body }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-2 border-rust p-8 lg:p-12 max-w-3xl">
          <div className="font-sub uppercase tracking-widest text-rust text-xs">
            Investment
          </div>
          <div className="font-display text-bone text-5xl sm:text-6xl mt-3">
            Application only
          </div>
          <p className="mt-5 font-body text-bone-dim leading-relaxed">
            This isn&apos;t a buy-now button. Pricing is shared on the first
            call once we&apos;ve confirmed fit. If you&apos;re a fit and ready
            to move, you&apos;ll know on the call. If you&apos;re not, I&apos;ll
            tell you that too — and point you somewhere better.
          </p>
        </div>
      </div>
    </section>
  );
}

function NotForYou() {
  const yes = [
    "You&apos;re a high-capacity dad, 30–55, with a real job, a real wife, real kids, real bills.",
    "You&apos;ve been &ldquo;Day 1&rdquo; more times than you can count and you&apos;re sick of starting over.",
    "You&apos;ll do the work between calls. You&apos;re not paying me to push for you.",
    "You&apos;re ready to invest at the level of a serious 1:1 container.",
  ];
  const no = [
    "You want a motivational hype man or a 6am cold plunge influencer.",
    "You think coaching is therapy. (It isn&apos;t. Get a therapist too if you need one.)",
    "You want a template you can download and ignore.",
    "You&apos;re looking for the cheapest option, not the right one.",
  ];
  return (
    <section className="distress relative bg-deep-black border-b border-bone/10">
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          Read This Carefully
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          This is built for one guy.
          <br />
          <span className="text-rust">You&apos;ll know if it&apos;s you.</span>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="border-l-2 border-rust pl-6">
            <div className="font-sub uppercase tracking-widest text-rust text-sm mb-4">
              This is for you if
            </div>
            <ul className="space-y-4">
              {yes.map((y, i) => (
                <li
                  key={i}
                  className="font-body text-bone leading-relaxed flex gap-3"
                >
                  <span className="text-rust font-display mt-1">→</span>
                  <span dangerouslySetInnerHTML={{ __html: y }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 border-bone/30 pl-6">
            <div className="font-sub uppercase tracking-widest text-bone-dim text-sm mb-4">
              This is not for you if
            </div>
            <ul className="space-y-4">
              {no.map((y, i) => (
                <li
                  key={i}
                  className="font-body text-bone-dim leading-relaxed flex gap-3"
                >
                  <span className="text-bone-dim font-display mt-1">×</span>
                  <span dangerouslySetInnerHTML={{ __html: y }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    {
      q: "How is this different from therapy?",
      a: "Therapy is for healing the past. Coaching is for building the next 90 days. I&apos;m not licensed to diagnose or treat — if you need that, get it. What I do is help you build the daily standards, identity, and accountability to actually lead your life again. Many of my best clients are in therapy <em>and</em> coaching at the same time. They&apos;re different tools.",
    },
    {
      q: "I&apos;ve already tried books, podcasts, and a couple of programs. Why would this be different?",
      a: "Because you&apos;ve never had a real human in your corner Monday morning when the meeting blew up and you skipped the gym again. Books don&apos;t hold you accountable. Podcasts don&apos;t answer at 6am. This is an actual human who will not let you ghost yourself.",
    },
    {
      q: "How much time will this take per month?",
      a: "Honest answer: two 60-minute biweekly 1:1 calls, 15–20 minutes a day of habit reps, plus a few texts back and forth. The standards we build are designed to <em>simplify</em> your month, not stack onto it. If anything, you&apos;ll get hours back.",
    },
    {
      q: "What if I miss a call?",
      a: "Then we run it back. Standards bend, not break. I&apos;m not going to shame you off a missed session. I will, however, get on the phone and ask what&apos;s really going on.",
    },
    {
      q: "Is this a Christian coaching thing?",
      a: "I&apos;m a man of faith and it shapes how I show up. But I coach the man, not the doctrine. Plenty of my clients don&apos;t share my faith and we get on great. If faith matters to you, we&apos;ll integrate it. If it doesn&apos;t, we won&apos;t force it.",
    },
  ];
  return (
    <section className="distress relative bg-deep-black border-b border-bone/10">
      <div className="relative mx-auto max-w-4xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          Common Questions
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl">
          Before you <span className="text-rust">apply.</span>
        </h2>

        <div className="mt-12 divide-y divide-bone/15 border-y border-bone/15">
          {qs.map((item, i) => (
            <details key={i} className="group py-6">
              <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                <span
                  className="font-sub uppercase tracking-wider text-bone text-lg sm:text-xl"
                  dangerouslySetInnerHTML={{ __html: item.q }}
                />
                <span className="text-rust font-display text-2xl shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p
                className="mt-4 font-body text-bone-dim leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
  return (
    <section
      id="apply"
      className="distress relative bg-deep-black border-b border-bone/10"
    >
      <div
        className="absolute inset-0 rings opacity-40"
        style={{ backgroundSize: "700px 700px", backgroundPosition: "center" }}
        aria-hidden
      />
      <div className="absolute inset-0 vignette" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6 py-24">
        <div className="font-sub text-xs uppercase tracking-[0.4em] text-rust wing-bars-top">
          Step One
        </div>
        <h2 className="font-display uppercase text-bone leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
          Apply for <span className="text-rust">1:1 coaching.</span>
        </h2>
        <p className="mt-6 font-body text-bone-dim text-lg leading-relaxed">
          Five questions. Five minutes. Real answers only — the whole point
          is to find out if we&apos;re a fit. If we are, I&apos;ll personally
          reply within 48 hours with a call link. If we&apos;re not, I&apos;ll
          tell you that too and point you somewhere better.
        </p>

        <div className="mt-10">
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-black">
      <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/logo.png"
              alt="Whole Dad Movement"
              width={88}
              height={88}
              className="h-20 w-20 object-contain"
            />
            <span className="font-display text-2xl uppercase tracking-widest text-bone">
              Whole Dad <span className="text-rust">Movement</span>
            </span>
          </div>
          <p className="font-sub uppercase tracking-widest text-bone-dim text-sm max-w-md">
            Daily is daily. Where your feet are is where you should be.
          </p>
        </div>
        <div className="font-sub uppercase tracking-widest text-xs text-bone-dim space-y-1">
          <div>© {new Date().getFullYear()} Whole Dad Movement</div>
          <div>Built for the dad who&apos;s ready to come home.</div>
        </div>
      </div>
    </footer>
  );
}
