import type { SVGProps } from 'react';

export const ReactIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
  </svg>
);

export const TypeScriptIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 3h18v18H3V3zm9.1 14.8V9.3h-2.1V7.7h6.2v1.6H14v8.5h-1.9zm4.7-.2c.8.6 1.7.9 2.7.9 1 0 1.6-.4 1.6-1.1 0-.7-.5-1-1.6-1.5l-.6-.2c-1.6-.7-2.6-1.5-2.6-3.2 0-1.8 1.4-3.1 3.5-3.1 1.3 0 2.2.3 2.9.8l-.8 1.5c-.6-.4-1.3-.7-2.1-.7-1 0-1.6.5-1.6 1.1 0 .6.4.9 1.5 1.4l.6.3c1.8.8 2.8 1.6 2.8 3.3 0 1.9-1.4 3.2-3.8 3.2-1.4 0-2.6-.4-3.3-1l.8-1.5z" />
  </svg>
);

export const JavaScriptIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 3h18v18H3V3zm9.6 15.4c0 1.6-.9 2.3-2.3 2.3-1.2 0-2-.7-2.4-1.5l1.3-.8c.2.4.4.7.9.7.4 0 .7-.2.7-.9V12h1.8v6.4zm3.6 2.3c-1.6 0-2.6-.8-3.1-1.8l1.3-.8c.3.6.8 1 1.7 1 .7 0 1.1-.3 1.1-.8 0-.6-.4-.8-1.2-1.1l-.4-.2c-1.3-.5-2.1-1.2-2.1-2.6 0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.3.9c-.3-.5-.6-.7-1.2-.7s-.9.3-.9.7c0 .5.3.7 1.1 1l.4.2c1.5.6 2.3 1.3 2.3 2.7 0 1.6-1.3 2.5-2.9 2.5z" />
  </svg>
);

export const TailwindIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 4c-2.7 0-4.4 1.3-5 4 1-1 2.1-1.4 3.4-1 1 .3 1.7 1.1 2.4 1.8.9.9 1.9 1.7 3.4 1.7 2.7 0 4.4-1.3 5-4-1 1-2.1 1.4-3.4 1-1-.3-1.7-1.1-2.4-1.8C15.5 4.8 14.5 4 12 4zM7 12c-2.7 0-4.4 1.3-5 4 1-1 2.1-1.4 3.4-1 1 .3 1.7 1.1 2.4 1.8.9.9 1.9 1.7 3.4 1.7 2.7 0 4.4-1.3 5-4-1 1-2.1 1.4-3.4 1-1-.3-1.7-1.1-2.4-1.8C10.5 12.8 9.5 12 7 12z" />
  </svg>
);

export const Html5Icon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3zm14.4 6H8.2l.2 2.5h8.6l-.6 6.7-4.4 1.2-4.4-1.2-.3-3.4h2.3l.1 1.7 2.3.6 2.3-.6.3-2.8H7.4L6.9 5.5h10.8l-.3 2.5z" />
  </svg>
);

export const Css3Icon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3zm14.7 6.1H8.7l.2 2.4h8.6l-.6 6.8-4.5 1.2-4.5-1.2-.3-3.4h2.4l.1 1.6 2.3.7 2.3-.7.3-2.9H7.4l-.6-6.8h10.6l-.4 2.6z" />
  </svg>
);

export const PythonIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M11.9 2C9.8 2 8.1 3.7 8.1 5.8v1.5h3.8c.3 0 .5.2.5.5s-.2.5-.5.5H7.6C5.5 8.3 3.8 10 3.8 12.1v3.6c0 .3.1.6.2.8 1 .8 2.5 1.2 4.2 1.2h.8v-1.9c0-2.1 1.7-3.8 3.8-3.8h3.8c1.6 0 2.9-1.3 2.9-2.9V5.8C19.3 3.7 17.6 2 15.5 2h-3.6zm-1.2 2.5c.6 0 1 .5 1 1 0 .6-.4 1-1 1-.5 0-1-.4-1-1 0-.5.5-1 1-1z" />
    <path d="M19.9 11c-.2.9-.7 1.7-1.5 2.3-1 .8-2.5 1.2-4.2 1.2h-.8v1.9c0 2.1-1.7 3.8-3.8 3.8H5.8c-.3 0-.6-.1-.8-.2.3 1.9 1.9 3.2 3.8 3.2h3.6c2.1 0 3.8-1.7 3.8-3.8v-1.5h-3.8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4.3c2.1 0 3.8-1.7 3.8-3.8V11zm-7.5 6.5c.6 0 1 .4 1 1 0 .5-.5 1-1 1-.6 0-1-.5-1-1 0-.6.4-1 1-1z" />
  </svg>
);

export const GitIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 11l-10.4-10.4c-.6-.6-1.6-.6-2.2 0L8.8 2.7l2.8 2.8c.7-.2 1.4.1 1.7.7.3.7 0 1.5-.6 1.8l2.7 2.7c.7-.3 1.5 0 1.8.7.3.7 0 1.5-.7 1.8-.7.3-1.5 0-1.8-.7l-2.7-2.7v6.5c.2.1.4.2.5.4.5.5.5 1.4 0 2-.5.5-1.4.5-2 0-.5-.5-.5-1.4 0-2 .2-.2.4-.3.6-.4V8.2c-.2-.1-.4-.2-.6-.4-.4-.4-.5-1-.3-1.5L7.9 3.6 1 10.5c-.6.6-.6 1.6 0 2.2l10.4 10.4c.6.6 1.6.6 2.2 0L23.5 13c.6-.6.6-1.6 0-2.2z" />
  </svg>
);

export const SupabaseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M11.9 1.5c-.6 0-1.1.4-1.3 1L6.1 14.1c-.2.6.2 1.2.8 1.2h5.8l-1.9 6.8c-.3.9.8 1.5 1.4.8l8.5-10.7c.4-.6 0-1.4-.7-1.4h-5.4l2.1-8.2c.2-.6-.2-1.1-.8-1.1z" />
  </svg>
);

export const ViteIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M21.5 3.5L12.7 21a.8.8 0 01-1.4 0L2.5 3.5a.8.8 0 01.9-1.1l8.6 1.9 8.6-1.9a.8.8 0 01.9 1.1zm-8.8 2.7l-4.2-.9 4.9 9.8 3.5-7-4.2-1.9z" />
  </svg>
);

export const ResponsiveIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M2 17h20" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <rect x="6.5" y="6.5" width="11" height="7.5" rx="1" fill="currentColor" stroke="none" opacity="0.1" />
  </svg>
);
