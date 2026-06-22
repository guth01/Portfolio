interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 16 }: LogoProps) {
  const unit = size / 4;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <rect x="8" y="0" width="4" height="4" />
      <rect x="12" y="0" width="4" height="4" />
      <rect x="12" y="4" width="4" height="4" />
      <rect x="4" y="4" width="4" height="4" />
      <rect x="0" y="4" width="4" height="4" />
      <rect x="8" y="8" width="4" height="4" />
      <rect x="12" y="8" width="4" height="4" />
      <rect x="0" y="8" width="4" height="4" />
      <rect x="0" y="12" width="4" height="4" />
      <rect x="4" y="12" width="4" height="4" />
    </svg>
  );
}

export function LogoOutline({ size = 155 }: { size?: number }) {
  const unit = size / 5.57;
  const sq = size * 0.25;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 155 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="78" y="39" width="39" height="39" fill="white" />
      <rect x="117" y="0" width="38" height="39" fill="white" />
      <rect x="117" y="39" width="38" height="39" fill="white" />
      <rect x="117" y="78" width="38" height="39" fill="white" />
      <rect x="78" y="117" width="39" height="38" fill="white" />
      <rect x="0" y="0" width="39" height="39" fill="white" />
      <rect x="39" y="0" width="39" height="39" fill="white" />
      <rect x="0" y="39" width="39" height="39" fill="white" />
      <rect x="0" y="78" width="39" height="39" fill="white" />
      <rect x="39" y="117" width="39" height="38" fill="white" />
      <rect x="0" y="117" width="39" height="38" fill="white" />
      <rect x="39" y="39" width="39" height="39" fill="#C778DD" fillOpacity="0.15" stroke="#C778DD" strokeWidth="1" />
      <rect x="78" y="78" width="39" height="39" fill="#C778DD" fillOpacity="0.15" stroke="#C778DD" strokeWidth="1" />
    </svg>
  );
}
