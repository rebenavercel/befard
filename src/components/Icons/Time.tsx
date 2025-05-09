import { LucideProps } from "lucide-react";

const Time = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="7.5" stroke="white" />
      <line x1="7.5" y1="2.18556e-08" x2="7.5" y2="8" stroke="white" />
      <line
        x1="7.59415"
        y1="7.64645"
        x2="10.7942"
        y2="10.8464"
        stroke="white"
      />
    </svg>
  );
};

export default Time; 