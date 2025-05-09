import { IVideoData } from "@/types/next.types";

const Video = ({
  file,
  className,
  poster,
}: IVideoData & { className?: string; poster?: string }) => {
  return (
    <video
      preload="none"
      playsInline
      muted={true}
      autoPlay={true}
      loop={true}
      controls={false}
      className={className}
      poster={poster}
    >
      <source src={file.src} type={file.type} />
      <track kind="captions" />
    </video>
  );
};

export default Video;
