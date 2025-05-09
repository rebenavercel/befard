import { LucideProps } from "lucide-react";

const Blog = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_118_260)">
        <path
          d="M11.4227 2.22104L2 11.4963L2.00097 14L4.57789 13.999L14 4.74399L10.5305 1.3477C10.0569 0.8841 9.28907 0.8841 8.81547 1.3477L5.69698 4.4004"
          stroke="currentColor"
          strokeMiterlimit="10"
        />
        <path
          d="M13.3584 4L14.7161 2.64258C15.0922 2.26925 15.095 1.66485 14.7223 1.2881C14.3448 0.906439 13.7261 0.903617 13.345 1.28181L12 2.62675"
          stroke="currentColor"
          strokeMiterlimit="10"
        />
        <path
          d="M1 15L2 14"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        <path
          d="M7 7L9 9"
          stroke="currentColor"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_118_260">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Blog; 