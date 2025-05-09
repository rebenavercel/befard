import { LucideProps } from "lucide-react";

const Home = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 5.67476L7.24047 0.755293C7.68046 0.414902 8.31957 0.414902 8.75956 0.755293L15 5.67476"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 13.5V8H9.5V13.5"
        stroke="currentColor"
      />
      <path
        d="M13.7767 4.79126V11.3045C13.7767 12.5171 12.7211 13.5 11.4189 13.5H4.58113C3.27893 13.5 2.2233 12.5171 2.2233 11.3045V4.79126"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Home; 