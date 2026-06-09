import { useId } from "react";
import type { SVGProps } from "react";

export interface PhoneProps extends SVGProps<SVGSVGElement> {
  width?: number;
  src?: string;
  className?: string;
}

export function Phone({
  width,
  src,
  className,
  ...props
}: PhoneProps) {
  const baseClass = width ? undefined : "w-full h-auto";
  const combined = [baseClass, className].filter(Boolean).join(" ");
  const clipId = useId();

  return (
    <svg
      viewBox="0 0 412 892"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={combined || undefined}
      {...(width ? { width, height: Math.round(width / 412 * 892) } : {})}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="16" y="16" width="380" height="828" rx="32" />
        </clipPath>
      </defs>

      <path
        d="M24 0H388C401.255 0 412 10.745 412 24V868C412 881.255 401.255 892 388 892H24C10.745 892 0 881.255 0 868V24C0 10.745 10.745 0 24 0Z"
        className="fill-[#1a1a1a]"
      />

      <rect
        x="16"
        y="16"
        width="380"
        height="828"
        rx="32"
        className="fill-black"
      />

      <circle cx="206" cy="10" r="4" className="fill-[#333]" />

      {src && (
        <image
          href={src}
          x="16"
          y="16"
          width="380"
          height="828"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      )}

      <rect x="0" y="16" width="16" height="828" className="fill-[#1a1a1a]" />
      <rect x="396" y="16" width="16" height="828" className="fill-[#1a1a1a]" />
    </svg>
  );
}
