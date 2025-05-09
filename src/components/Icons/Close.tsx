import { LucideProps } from "lucide-react";

const Close = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 7L12 12L7 17"
        stroke="currentColor"
        strokeWidth="1.5"
        stroke-strokeLinecap="square"
      />
      <path
        d="M17 7L12 12L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default Close;
