import { useState, useEffect, useRef, useCallback } from 'react';

type BatState = 'flying' | 'perched' | 'gliding';

interface PerchPoint {
  x: number;
  y: number;
  targetName?: string;
}

export default function CyberBat() {
  // Safe default starting position (near top-right corner)
  const [coords, setCoords] = useState({ x: 120, y: 140 });
  const [rotation, setRotation] = useState(0);
  const [batState, setBatState] = useState<BatState>('flying');
  const [flightDuration, setFlightDuration] = useState(1.8);
  const [takeoffBurst, setTakeoffBurst] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stateRef = useRef<BatState>('flying');
  stateRef.current = batState;

  const coordsRef = useRef(coords);
  coordsRef.current = coords;

  const timerRef = useRef<number | null>(null);
  const fleeCooldownRef = useRef(false);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(rm);
    }
  }, []);

  // Find suitable perch elements in visible viewport (buttons, card rims, navbar items)
  const getPerchCandidate = useCallback((): PerchPoint | null => {
    if (typeof window === 'undefined') return null;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Look for prominent buttons and card headers currently in view
    const selectors = [
      '.btn-red',
      '.btn-ghost',
      '.surface-card',
      'nav button',
      '#terminal .rounded-2xl',
      '#projects .group',
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(',')));
    const visiblePerches: PerchPoint[] = [];

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      // Ensure element is well inside viewport and not too tiny
      if (
        rect.top >= 80 &&
        rect.bottom <= vh - 40 &&
        rect.left >= 30 &&
        rect.right <= vw - 30 &&
        rect.width > 60
      ) {
        // Place bat perched on the top-right corner/rim of the element
        // Offset so bat grips the top edge without blocking clicks
        visiblePerches.push({
          x: Math.min(vw - 60, rect.right - 25),
          y: Math.max(70, rect.top - 18),
          targetName: el.tagName,
        });
      }
    }

    if (visiblePerches.length > 0) {
      // Pick random visible perch
      return visiblePerches[Math.floor(Math.random() * visiblePerches.length)];
    }

    // Default safe aesthetic perches (near screen corners or top headers)
    const fallbackPerches: PerchPoint[] = [
      { x: Math.max(40, vw - 140), y: 90 },
      { x: 60, y: 160 },
      { x: Math.max(50, vw - 100), y: vh - 140 },
      { x: 80, y: vh - 180 },
    ];
    return fallbackPerches[Math.floor(Math.random() * fallbackPerches.length)];
  }, []);

  const scheduleFlightRef = useRef<() => void>(() => {});

  // Fly to a specific or random location
  const flyTo = useCallback(
    (targetX: number, targetY: number, willPerch = false) => {
      if (reducedMotion) return;

      const current = coordsRef.current;
      const dx = targetX - current.x;
      const dy = targetY - current.y;
      const distance = Math.hypot(dx, dy);

      // Calculate natural banking angle in direction of flight (radians to degrees)
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      setRotation(angleDeg);

      // Duration proportional to distance (0.8s to 2.4s)
      const duration = Math.max(0.8, Math.min(2.4, distance / 380));
      setFlightDuration(duration);

      // Trigger takeoff pulse burst
      if (stateRef.current === 'perched') {
        setTakeoffBurst(true);
        setTimeout(() => setTakeoffBurst(false), 500);
      }

      setBatState('flying');
      setCoords({ x: targetX, y: targetY });

      // After arrival: either perch or glide briefly
      if (timerRef.current) window.clearTimeout(timerRef.current);

      timerRef.current = window.setTimeout(() => {
        if (willPerch) {
          setBatState('perched');
          // Return to upright hanging angle when perched
          setRotation(0);

          // Schedule next flight after perching for 5-9 seconds
          const perchDuration = 5000 + Math.random() * 4000;
          timerRef.current = window.setTimeout(() => {
            scheduleFlightRef.current();
          }, perchDuration);
        } else {
          setBatState('gliding');
          // After brief glide, fly to another spot or perch
          timerRef.current = window.setTimeout(() => {
            scheduleFlightRef.current();
          }, 1500);
        }
      }, duration * 1000);
    },
    [reducedMotion],
  );

  // Schedule a random flight around the viewport
  const scheduleRandomFlight = useCallback(() => {
    if (typeof window === 'undefined' || document.hidden || reducedMotion) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 60% chance to perch on an element, 40% chance to do aerial swoop
    const shouldPerch = Math.random() > 0.4;
    const perch = getPerchCandidate();

    if (shouldPerch && perch) {
      flyTo(perch.x, perch.y, true);
    } else {
      // Pick random safe coordinates within viewport
      const padding = 60;
      const rx = padding + Math.random() * (vw - padding * 2);
      const ry = 80 + Math.random() * (vh - 180);
      flyTo(rx, ry, Math.random() > 0.5);
    }
  }, [flyTo, getPerchCandidate, reducedMotion]);

  scheduleFlightRef.current = scheduleRandomFlight;

  // Flee instantly away from a point (e.g. cursor or touch location)
  const flee = useCallback(
    (sourceX?: number, sourceY?: number) => {
      if (fleeCooldownRef.current || reducedMotion) return;
      fleeCooldownRef.current = true;
      setTimeout(() => {
        fleeCooldownRef.current = false;
      }, 700);

      setHasInteracted(true);

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const current = coordsRef.current;

      let targetX: number;
      let targetY: number;

      if (sourceX !== undefined && sourceY !== undefined) {
        // Fly away from the source coordinates
        const dx = current.x - sourceX;
        const dy = current.y - sourceY;
        const angle = Math.atan2(dy, dx);
        const distance = 250 + Math.random() * 200;

        targetX = Math.max(50, Math.min(vw - 70, current.x + Math.cos(angle) * distance));
        targetY = Math.max(90, Math.min(vh - 120, current.y + Math.sin(angle) * distance));
      } else {
        // Random flee destination
        targetX = Math.max(60, Math.random() * (vw - 120));
        targetY = Math.max(90, Math.random() * (vh - 160));
      }

      // Quick startled flight
      flyTo(targetX, targetY, Math.random() > 0.4);
    },
    [flyTo, reducedMotion],
  );

  // Proximity detection for desktop mouse
  useEffect(() => {
    if (reducedMotion) return;

    // Only enable proximity flight on fine pointer (desktop mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let lastCheck = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastCheck < 80) return; // Throttle proximity check
      lastCheck = now;

      const current = coordsRef.current;
      const dist = Math.hypot(e.clientX - current.x, e.clientY - current.y);

      // Startle radius: 85px
      if (dist < 85) {
        flee(e.clientX, e.clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [flee, reducedMotion]);

  // Initial startup cycle
  useEffect(() => {
    if (reducedMotion) return;

    // Start with a smooth first flight to a perch after page load
    const startTimer = window.setTimeout(() => {
      const perch = getPerchCandidate();
      if (perch) {
        flyTo(perch.x, perch.y, true);
      } else {
        scheduleRandomFlight();
      }
    }, 2200);

    // Pause flights when browser tab is inactive to save battery & CPU
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      } else {
        scheduleRandomFlight();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.clearTimeout(startTimer);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [flyTo, getPerchCandidate, scheduleRandomFlight, reducedMotion]);

  if (reducedMotion) return null;

  const isPerched = batState === 'perched';
  const isFlying = batState === 'flying' || batState === 'gliding';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Bat Container - Absolute Positioned with GPU Transform */}
      <div
        className="pointer-events-auto absolute cursor-pointer will-change-transform touch-none"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0) rotate(${rotation}deg)`,
          transition: isFlying
            ? `transform ${flightDuration}s cubic-bezier(0.22, 1, 0.36, 1)`
            : 'transform 0.4s ease-out',
        }}
        onClick={() => flee()}
        onPointerDown={(e) => {
          e.stopPropagation();
          flee(e.clientX, e.clientY);
        }}
        title="Cyber Bat (Interactive) • Tap or hover to interact"
      >
        {/* Takeoff Burst Ring Particle */}
        {takeoffBurst && (
          <span className="absolute -inset-2 rounded-full border border-red-500/80 animate-ping pointer-events-none" />
        )}

        {/* Soft Depth Shadow Underneath Bat */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-black/40 blur-[3px] transition-all duration-300 pointer-events-none ${
            isPerched
              ? 'top-[36px] h-2 w-7 opacity-80'
              : 'top-[42px] h-3 w-12 opacity-40 scale-90'
          }`}
        />

        {/* Cyber Bat SVG Artwork */}
        <div className="relative h-11 w-14 sm:h-13 sm:w-16 transition-transform duration-300 hover:scale-110 active:scale-95">
          <svg
            viewBox="0 0 100 70"
            className="h-full w-full filter drop-shadow-[0_2px_8px_rgba(255,37,37,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              @keyframes batFlapL {
                0% { transform: rotate(0deg) scaleY(1); }
                100% { transform: rotate(-38deg) scaleY(0.4) translateY(-3px); }
              }
              @keyframes batFlapR {
                0% { transform: rotate(0deg) scaleY(1); }
                100% { transform: rotate(38deg) scaleY(0.4) translateY(-3px); }
              }
              @keyframes eyeGlow {
                0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 2px #ff2525); }
                50% { opacity: 1; filter: drop-shadow(0 0 6px #ff2525); }
              }
              .wing-left-active {
                transform-origin: 50px 30px;
                animation: batFlapL 0.17s ease-in-out infinite alternate;
              }
              .wing-right-active {
                transform-origin: 50px 30px;
                animation: batFlapR 0.17s ease-in-out infinite alternate;
              }
              .wing-left-perched {
                transform-origin: 50px 30px;
                transform: rotate(44deg) scaleX(0.42) translateY(5px);
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .wing-right-perched {
                transform-origin: 50px 30px;
                transform: rotate(-44deg) scaleX(0.42) translateY(5px);
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .bat-eye {
                animation: eyeGlow 2.5s ease-in-out infinite;
              }
            `}</style>

            {/* Left Wing */}
            <g className={isFlying ? 'wing-left-active' : 'wing-left-perched'}>
              {/* Main Wing Membrane */}
              <path
                d="M 50 30 Q 30 8 8 14 Q 16 32 24 36 Q 32 44 38 42 Q 44 40 50 35 Z"
                fill="#0d0d14"
                stroke="#ff2525"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Internal Cyber Rib Accents */}
              <path
                d="M 50 30 L 8 14 M 40 33 L 24 36 M 46 36 L 38 42"
                stroke="#ff2525"
                strokeWidth="0.8"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              {/* Wing Tip Glow Dot */}
              <circle cx="8" cy="14" r="1.5" fill="#ff2525" opacity="0.9" />
            </g>

            {/* Right Wing */}
            <g className={isFlying ? 'wing-right-active' : 'wing-right-perched'}>
              {/* Main Wing Membrane */}
              <path
                d="M 50 30 Q 70 8 92 14 Q 84 32 76 36 Q 68 44 62 42 Q 56 40 50 35 Z"
                fill="#0d0d14"
                stroke="#ff2525"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Internal Cyber Rib Accents */}
              <path
                d="M 50 30 L 92 14 M 60 33 L 76 36 M 54 36 L 62 42"
                stroke="#ff2525"
                strokeWidth="0.8"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              {/* Wing Tip Glow Dot */}
              <circle cx="92" cy="14" r="1.5" fill="#ff2525" opacity="0.9" />
            </g>

            {/* Bat Main Body */}
            <ellipse
              cx="50"
              cy="36"
              rx="7"
              ry="13"
              fill="#08080c"
              stroke="#ff2525"
              strokeWidth="1"
            />

            {/* Cyber Reactor Core on Chest */}
            <polygon
              points="50,29 46,37 54,37"
              fill="#ff2525"
              opacity="0.85"
            />

            {/* Pointed Cyber Ears */}
            <polygon
              points="45,21 47,10 50,19"
              fill="#0d0d14"
              stroke="#ff2525"
              strokeWidth="1"
            />
            <polygon
              points="55,21 53,10 50,19"
              fill="#0d0d14"
              stroke="#ff2525"
              strokeWidth="1"
            />

            {/* Head */}
            <circle
              cx="50"
              cy="23"
              r="6.5"
              fill="#101018"
              stroke="#ff2525"
              strokeWidth="1"
            />

            {/* Glowing Crimson Eyes */}
            <circle
              cx="47.5"
              cy="23"
              r="1.4"
              fill="#ff2525"
              className="bat-eye"
            />
            <circle
              cx="52.5"
              cy="23"
              r="1.4"
              fill="#ff2525"
              className="bat-eye"
            />

            {/* Perching Grip Claws */}
            <path
              d="M 47 48 L 47 52 M 53 48 L 53 52"
              stroke="#ff2525"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Playful Interactive Hint Pill (fades away after first interaction) */}
        {!hasInteracted && isPerched && (
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 whitespace-nowrap rounded-full border border-red-500/40 bg-black/85 px-2 py-0.5 text-[9px] font-mono font-semibold text-red-300 shadow-md backdrop-blur-md pointer-events-none animate-bounce">
            🦇 Tap me
          </div>
        )}
      </div>
    </div>
  );
}
