import React from 'react';

type LoopingVideoProps = {
  src: string;
  className?: string;
};

export default function LoopingVideo({ src, className = '' }: LoopingVideoProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <video
        className="w-full h-auto object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}