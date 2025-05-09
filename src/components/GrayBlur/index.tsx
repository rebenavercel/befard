import { cn } from "@/lib/utils";

interface IGrayBlur {
  className?: string;
}
const GrayBlur = ({ className }: IGrayBlur) => {
  return (
    <div className="hidden md:block absolute w-full h-full max-w-[1900px] left-[50%] translate-x-[-50%]">
      <div
        className={cn(
          "absolute w-[400px] h-[400px] bg-[rgba(217,217,217,0.07)] blur-[100px] rounded-full",
          className
        )}
      ></div>
    </div>
  );
};

export default GrayBlur;
