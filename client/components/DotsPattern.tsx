interface DotsPatternProps {
  cols?: number;
  rows?: number;
  gap?: number;
  className?: string;
}

export function DotsPattern({
  cols = 5,
  rows = 5,
  gap = 20,
  className = "",
}: DotsPatternProps) {
  const width = (cols - 1) * gap + 4;
  const height = (rows - 1) * gap + 4;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * gap + 2}
            cy={row * gap + 2}
            r="2"
            fill="#ABB2BF"
          />
        ))
      )}
    </svg>
  );
}
