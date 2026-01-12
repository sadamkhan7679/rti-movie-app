import React, { SVGProps } from "react";

export const PlayIcon: React.FC = ({
  width = 24,
  height = 24,
  ...rest
}: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...rest}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
  </svg>
);
