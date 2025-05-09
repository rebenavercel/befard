import { LucideProps } from "lucide-react";

const Message = (props: LucideProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.3072 9.63559H11.9216M4.75 9.63559H9.09323M4.75 5.88559H12.25M16 3.40678V12.1091C16 13.1622 15.1463 14.0159 14.0932 14.0159H7.47981C7.3225 14.0159 7.17161 14.0784 7.06035 14.1897L5.00888 16.2411C4.84315 16.4069 4.61831 16.5 4.38387 16.5C3.89573 16.5 3.50001 16.1043 3.50001 15.6161V14.6091C3.50001 14.2815 3.23443 14.0159 2.90678 14.0159C1.8537 14.0159 1 13.1622 1 12.1091V3.40678C1 2.3537 1.8537 1.5 2.90678 1.5H14.0932C15.1463 1.5 16 2.3537 16 3.40678Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Message;
