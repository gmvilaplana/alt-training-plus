// Bruno Souza — "An Unexpected Journey", minimalist poster.
// A vintage movie-poster treatment (ref: The Hobbit minimalist posters):
// muted olive-green ground, aged gold/cream silhouettes — Smaug in flight
// (wings flapping), the Lonely Mountain, and the company marching right —
// with grain, stains and a vignette. Elegant Cinzel caps; type in cqi units.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const cinzel: React.CSSProperties = { fontFamily: "'Cinzel', 'Georgia', serif" }
// seamless, tileable crowd (16px bumps × 30 = 480, so tiles align at the seam)
const crowd = 'M0 292 ' + 'q8 -12 16 0 '.repeat(30) + 'L480 300 L0 300 Z'

export default function BrunoSouzaCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.bs-wing-near', { rotation: 8 }, { rotation: -16, transformOrigin: '0% 100%', duration: 0.55, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.fromTo('.bs-wing-far', { rotation: -8 }, { rotation: 16, transformOrigin: '100% 100%', duration: 0.55, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.fromTo('.bs-army', { x: -480 }, { x: 0, duration: 14, ease: 'none', repeat: -1 })
    },
    { scope: root },
  )

  return (
    <article ref={root} className="@container relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#5f6024]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap" />

      <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="bs-olive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#727232" /><stop offset="0.7" stopColor="#565620" /><stop offset="1" stopColor="#484a1a" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="url(#bs-olive)" />

        {/* distant range */}
        <path d="M0 196 L70 156 L120 180 L180 128 L240 170 L300 124 L360 165 L420 136 L480 168 L480 300 0 300Z" fill="#cabf85" opacity="0.55" />
        {/* the Lonely Mountain range */}
        <path d="M0 300 L0 244 L52 216 L104 236 L156 200 L200 128 L250 202 L306 232 L360 216 L420 236 L480 214 L480 300Z" fill="#e6dbaf" />
        <path d="M200 128 L182 168 L200 160 L216 172Z" fill="#f2ead0" opacity="0.7" />

        {/* Smaug, in flight — wings flap */}
        <g fill="#e9dfb6" transform="translate(250 24) scale(0.8)">
          <path d="M12 92 C8 90 8 84 14 84 C22 84 28 88 36 90 C30 82 34 76 42 78 C46 80 46 86 44 90 C70 100 100 108 132 114 C170 122 220 126 264 120 C278 118 292 122 298 112 C290 116 282 114 276 118 C238 132 176 140 138 130 C104 122 74 112 48 104 C34 100 20 96 12 92 Z" />
          <path d="M150 126 l-5 16 4 -2 2 7 3 -7 4 3 Z M188 128 l-5 15 4 -2 2 7 3 -7 4 3 Z" />
          <g className="bs-wing-far"><path d="M120 110 C112 82 96 58 66 46 C74 56 70 64 82 66 C74 72 74 78 86 82 C104 92 114 102 120 110 Z" /></g>
          <g className="bs-wing-near"><path d="M120 110 C118 74 140 44 210 30 C204 42 210 48 222 48 C212 56 210 62 220 66 C204 72 176 90 120 110 Z" /></g>
        </g>

        {/* the marching company — two tiles scrolling right, seamlessly */}
        <g className="bs-army">
          {[0, 480].map((tx) => (
            <g key={tx} transform={`translate(${tx} 0)`} fill="#2b2c14">
              <path d={crowd} />
              <rect x="150" y="264" width="2" height="30" /><path d="M152 264 l14 5 -14 5Z" />
              <rect x="300" y="268" width="2" height="26" /><path d="M302 268 l12 4 -12 4Z" />
              <rect x="420" y="256" width="2.4" height="38" /><circle cx="421" cy="256" r="3" />
            </g>
          ))}
        </g>
      </svg>

      {/* stains + vignette */}
      <div aria-hidden className="absolute inset-0 mix-blend-multiply [background:radial-gradient(28%_36%_at_16%_28%,rgba(18,18,4,0.30),transparent_60%),radial-gradient(22%_28%_at_84%_74%,rgba(18,18,4,0.24),transparent_60%),radial-gradient(120%_120%_at_50%_45%,transparent_54%,rgba(16,14,3,0.55))]" />
      {/* paper grain */}
      <svg aria-hidden className="absolute inset-0 size-full opacity-[0.12] mix-blend-multiply">
        <filter id="bs-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#bs-grain)" />
      </svg>

      {/* text — set in the open olive field, left */}
      <div className="relative z-10 flex h-full max-w-[58%] flex-col justify-center gap-[1.6cqi] p-[6cqi]" style={cinzel}>
        <span className="text-[2.9cqi] font-semibold uppercase tracking-[0.42em] text-[#efe7c6]">
          An Unexpected Journey
        </span>
        <h1 className="text-[9.5cqi] leading-[0.95] text-[#f3ead0] [text-shadow:0_0.3cqi_0.9cqi_rgba(20,18,4,0.5)]">
          Bruno Souza
        </h1>
        <span className="w-fit text-[3cqi] font-semibold uppercase tracking-[0.3em] text-[#f4cf7e] [text-shadow:0_0.15cqi_0.5cqi_rgba(18,14,2,0.85)]">
          Scribe of the Fellowship
        </span>
      </div>
    </article>
  )
}
