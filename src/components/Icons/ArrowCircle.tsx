import { LucideProps } from "lucide-react";

const ArrowCircle = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path
        d="M5 7.5C4.72386 7.5 4.5 7.72386 4.5 8C4.5 8.27614 4.72386 8.5 5 8.5V7.5ZM11.3536 8.35355C11.5488 8.15829 11.5488 7.84171 11.3536 7.64645L8.17157 4.46447C7.97631 4.2692 7.65973 4.2692 7.46447 4.46447C7.2692 4.65973 7.2692 4.97631 7.46447 5.17157L10.2929 8L7.46447 10.8284C7.2692 11.0237 7.2692 11.3403 7.46447 11.5355C7.65973 11.7308 7.97631 11.7308 8.17157 11.5355L11.3536 8.35355ZM5 8.5H11V7.5H5V8.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowCircle; 