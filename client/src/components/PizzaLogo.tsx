import type { SVGProps } from "react";

export function PizzaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 360 360"
      role="img"
      aria-label="The Pizza Lover's — Eat with Love"
      focusable="false"
    >
      <defs>
        <radialGradient id="pizza-logo-crust" cx="38%" cy="32%" r="72%">
          <stop offset="0" stopColor="#ffd96a" />
          <stop offset="0.65" stopColor="#f3ad31" />
          <stop offset="1" stopColor="#c9571d" />
        </radialGradient>
        <radialGradient id="pizza-logo-cheese" cx="42%" cy="30%" r="78%">
          <stop offset="0" stopColor="#fff2a8" />
          <stop offset="0.6" stopColor="#f7cc4c" />
          <stop offset="1" stopColor="#df8f27" />
        </radialGradient>
        <linearGradient id="pizza-logo-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d42d32" />
          <stop offset="0.5" stopColor="#b71925" />
          <stop offset="1" stopColor="#8e101c" />
        </linearGradient>
        <filter id="pizza-logo-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        <clipPath id="pizza-logo-pie-clip">
          <circle cx="180" cy="176" r="99" />
        </clipPath>
        <path id="pizza-logo-top-arc" d="M 57 165 A 126 126 0 0 1 303 165" />
        <path id="pizza-logo-bottom-arc" d="M 57 193 A 126 126 0 0 0 303 193" />
      </defs>

      <circle cx="180" cy="180" r="169" fill="#080808" stroke="#b21826" strokeWidth="8" />
      <circle cx="180" cy="180" r="154" fill="#15100f" stroke="#e2b63f" strokeWidth="2" />
      <circle cx="180" cy="180" r="145" fill="none" stroke="#7e1b20" strokeWidth="2" strokeDasharray="2 8" opacity="0.9" />

      <text fill="#fffdf2" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" fontWeight="800" letterSpacing="2.6" textAnchor="middle">
        <textPath href="#pizza-logo-top-arc" startOffset="50%">BEST IN TOWN</textPath>
      </text>
      <text fill="#fffdf2" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" fontWeight="800" letterSpacing="2.6" textAnchor="middle">
        <textPath href="#pizza-logo-bottom-arc" startOffset="50%">DELIVERY</textPath>
      </text>

      <g filter="url(#pizza-logo-shadow)">
        <circle cx="180" cy="176" r="103" fill="#7d241c" opacity="0.55" />
        <circle cx="180" cy="176" r="99" fill="url(#pizza-logo-crust)" stroke="#f2c34c" strokeWidth="3" />
        <circle cx="180" cy="176" r="87" fill="url(#pizza-logo-cheese)" stroke="#c75c1c" strokeWidth="4" />
        <g clipPath="url(#pizza-logo-pie-clip)">
          <path d="M 100 143 C 123 118 150 105 181 105 C 220 105 248 126 264 153" fill="none" stroke="#fff5b8" strokeWidth="7" opacity="0.55" strokeLinecap="round" />
          <path d="M 116 211 C 144 239 209 247 247 212" fill="none" stroke="#d47620" strokeWidth="6" opacity="0.45" strokeLinecap="round" />
          <g fill="#b82c28" stroke="#8c1c22" strokeWidth="2">
            <circle cx="142" cy="140" r="13" />
            <circle cx="216" cy="134" r="11" />
            <circle cx="232" cy="196" r="13" />
            <circle cx="145" cy="210" r="10" />
          </g>
          <g fill="#5f351d" stroke="#351b14" strokeWidth="3">
            <circle cx="176" cy="137" r="8" />
            <circle cx="194" cy="211" r="9" />
            <circle cx="126" cy="178" r="8" />
          </g>
          <g fill="#4e7e36" opacity="0.95">
            <ellipse cx="168" cy="176" rx="7" ry="15" transform="rotate(28 168 176)" />
            <ellipse cx="211" cy="163" rx="7" ry="15" transform="rotate(-38 211 163)" />
            <ellipse cx="167" cy="225" rx="6" ry="13" transform="rotate(64 167 225)" />
          </g>
          <g fill="#fff3a5" opacity="0.9">
            <circle cx="154" cy="161" r="3" />
            <circle cx="205" cy="188" r="3" />
            <circle cx="224" cy="153" r="3" />
            <circle cx="135" cy="194" r="3" />
          </g>
        </g>
      </g>

      <g filter="url(#pizza-logo-shadow)">
        <path d="M 34 151 L 50 141 L 45 165 Z" fill="#c81d2a" stroke="#f2c34c" strokeWidth="2" />
        <path d="M 326 151 L 310 141 L 315 165 Z" fill="#c81d2a" stroke="#f2c34c" strokeWidth="2" />
        <path d="M 42 151 H 318" stroke="#f2c34c" strokeWidth="17" />
        <path d="M 42 151 H 318" stroke="url(#pizza-logo-ribbon)" strokeWidth="12" />
        <path d="M 42 163 H 318" stroke="#f2c34c" strokeWidth="2" opacity="0.9" />
        <text x="180" y="155" fill="#fffdf2" fontFamily="Georgia, Times New Roman, serif" fontSize="19" fontWeight="700" letterSpacing="0.2" textAnchor="middle">The Pizza Lover&apos;s</text>
      </g>

      <text x="180" y="230" fill="#fffdf2" fontFamily="Arial, Helvetica, sans-serif" fontSize="12" fontWeight="800" letterSpacing="2.2" textAnchor="middle">Eat with Love</text>

      <g transform="translate(266 72) rotate(12)" filter="url(#pizza-logo-shadow)">
        <path d="M 0 27 L 30 4 L 26 39 Z" fill="#f5c443" stroke="#8f241f" strokeWidth="3" />
        <path d="M 3 28 L 27 10" stroke="#d34a1f" strokeWidth="4" strokeLinecap="round" />
        <circle cx="14" cy="23" r="4" fill="#b91f2a" />
        <path d="M 6 4 C 8 -8 25 -8 27 4 C 33 4 36 8 35 14 H 0 C -1 8 1 4 6 4 Z" fill="#fffdf2" stroke="#b21826" strokeWidth="3" />
        <circle cx="14" cy="17" r="2.4" fill="#080808" />
        <circle cx="24" cy="17" r="2.4" fill="#080808" />
        <path d="M 15 24 Q 19 28 23 24" fill="none" stroke="#8f241f" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g fill="#e33a3e" stroke="#f2c34c" strokeWidth="1.5">
        <path d="M 86 93 C 80 84 66 89 70 101 C 74 111 86 115 86 115 C 86 115 98 108 101 99 C 105 86 91 84 86 93 Z" />
        <path d="M 275 235 C 271 228 261 231 264 240 C 267 247 275 251 275 251 C 275 251 284 246 287 239 C 289 230 279 228 275 235 Z" />
      </g>

      <circle cx="180" cy="180" r="169" fill="none" stroke="#f04a43" strokeWidth="1" opacity="0.75" />
    </svg>
  );
}
