"use client";

type Props = {
  tone?: "dark" | "light";
  label?: string;
  icon?: "coat" | "dress" | "kid" | "figure" | "shoe" | "bag" | "none";
  className?: string;
};

const icons: Record<string, JSX.Element> = {
  coat: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M35 14c3-4 8-6 15-6s12 2 15 6l9 13-8 7-3-4v56H38V30l-3 4-8-7 8-13Z" />
      <path d="M40 8c1 5 5 8 10 8s9-3 10-8" />
    </svg>
  ),
  dress: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="50" cy="20" r="11" />
      <path d="M35 90 25 46l10-12h30l10 12-10 44Z" />
    </svg>
  ),
  kid: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="50" cy="24" r="9" />
      <path d="M33 88 26 52l8-10h32l8 10-7 36Z" />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="50" cy="18" r="10" />
      <path d="M28 92V52l-9-16 11-8 20 10 20-10 11 8-9 16v40Z" />
    </svg>
  ),
  shoe: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 70c0-10 8-14 20-18l25-9c8-3 14 2 14 9v6h14c6 0 9 4 9 9v6H15Z" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="18" y="34" width="64" height="52" rx="2" />
      <path d="M34 34V24a16 16 0 0 1 32 0v10" />
    </svg>
  ),
  none: <></>,
};

export default function Placeholder({ tone = "dark", label, icon = "figure", className = "" }: Props) {
  return (
    <div className={`ph ${tone === "light" ? "light" : ""} w-full h-full ${className}`}>
      {icon !== "none" && (
        <div className={`icon ${tone === "light" ? "text-ink/60" : "text-paper/85"}`}>{icons[icon]}</div>
      )}
      {label && <span className="tag">{label}</span>}
    </div>
  );
}
