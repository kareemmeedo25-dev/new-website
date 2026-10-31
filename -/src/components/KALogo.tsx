import type { SVGProps } from 'react';

interface KALogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  showWordmark?: boolean;
}

/**
 * Custom geometric monogram merging 'K' and 'A' into a single architectural tech symbol.
 * - Left vertical spine: shared backbone of both letters.
 * - Upper rising diagonal: upper arm of 'K' + apex ascent of 'A'.
 * - Lower angled leg: lower leg of 'K' + right foundation leg of 'A'.
 * - Electric red crossbar: signature 'A' crossbar that locks the geometry into one mark.
 */
export default function KALogo({
  size = 36,
  className = '',
  showWordmark = false,
  ...props
}: KALogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-label="Kareem Ahmed Monogram Logo"
        {...props}
      >
        {/* Outer subtle shield / frame with crisp rounded corner */}
        <rect
          x="1"
          y="1"
          width="42"
          height="42"
          rx="10"
          className="fill-[color:var(--bg-surface)] stroke-[color:var(--glass-border)] transition-colors"
          strokeWidth="1.5"
        />

        {/* Ambient subtle corner accent */}
        <path
          d="M33 1L43 11V1H33Z"
          fill="#ff2525"
          fillOpacity="0.18"
        />

        {/* Monogram Geometry */}
        <g transform="translate(4, 4)">
          {/* 1. Left Vertical Spine (K stem & A left edge) */}
          <path
            d="M8 8 H13.5 V28 H8 Z"
            fill="currentColor"
            className="text-[color:var(--text-primary)] transition-colors"
          />

          {/* 2. Top-left bevel accent on stem */}
          <path
            d="M8 8 L13.5 8 L13.5 12 L8 8 Z"
            fill="#ff2525"
          />

          {/* 3. Upper diagonal arm of K / ascending peak of A */}
          <path
            d="M13.5 18.5 L24 8 H29.5 L17.5 20 Z"
            fill="currentColor"
            className="text-[color:var(--text-primary)] transition-colors"
          />

          {/* 4. Lower diagonal leg of K / supporting right pillar of A */}
          <path
            d="M17 19.5 L29.5 28 H23.5 L13.5 21.5 Z"
            fill="currentColor"
            className="text-[color:var(--text-primary)] transition-colors"
          />

          {/* 5. The Signature Electric Red Crossbar of 'A' (binding K & A together) */}
          <path
            d="M11 19 H23.5 L21.5 22.5 H11 Z"
            fill="#ff2525"
          />

          {/* 6. Dynamic micro-angle dot */}
          <circle
            cx="29"
            cy="8.5"
            r="1.5"
            fill="#ff2525"
          />
        </g>
      </svg>

      {showWordmark && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-display text-base font-bold tracking-tight text-[color:var(--text-primary)]">
            Kareem Ahmed
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            Web Developer
          </span>
        </div>
      )}
    </div>
  );
}
