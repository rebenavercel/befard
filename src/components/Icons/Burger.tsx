import { LucideProps } from "lucide-react";

const Burger = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="50" height="50" fill="white" />
      <line
        x1="10"
        y1="24"
        x2="40"
        y2="24"
        stroke="#D12427"
        strokeWidth="2"
      />
      <line
        x1="14"
        y1="16"
        x2="36"
        y2="16"
        stroke="#D12427"
        strokeWidth="2"
      />
      <line
        x1="14"
        y1="32"
        x2="36"
        y2="32"
        stroke="#D12427"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Burger; 