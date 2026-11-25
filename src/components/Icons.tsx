export function Check({ className = "text-brand" }: { className?: string }) {
  return (
    <svg className={`mt-1 h-4 w-4 shrink-0 ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
