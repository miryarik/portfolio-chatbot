export default function Ridgeline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 200"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M0 160 L60 100 L110 140 L170 60 L230 130 L290 40 L350 120 L410 80 L470 150 L540 90 L600 160"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
