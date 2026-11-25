// QuoteBench mark: burgundy "Q" ring with a green gem. Redrawn as SVG from the approved logo.
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 160) / 170} viewBox="0 0 170 160" fill="none" aria-hidden>
      <path
        d="M112 126H50A36 36 0 0 1 14 90V50A36 36 0 0 1 50 14H92A36 36 0 0 1 128 50V86"
        stroke="#7a1f3d"
        strokeWidth="26"
        strokeLinejoin="round"
      />
      <path d="M118 108L154 146" stroke="#7a1f3d" strokeWidth="24" />
      <path d="M70 36L90 48V78L70 98L50 78V48Z" fill="#19c37d" />
    </svg>
  );
}
