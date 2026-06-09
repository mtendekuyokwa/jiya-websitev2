import { useState } from "react";

interface Tweet {
  id: string;
  avatar: string;
  username: string;
  handle: string;
  text: string;
  likes: number;
  retweets: number;
  startX: number;
  startY: number;
  rotation: number;
}

interface TweetCardProps {
  tweet: Tweet;
  scrollProgress: number;
  index: number;
  targetX: number;
  targetY: number;
}

export function TweetCard({
  tweet,
  scrollProgress,
  index,
  targetX,
  targetY,
}: TweetCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const flyStart = 0.02 + index * 0.04;
  const flyEnd = flyStart + 0.5;

  let opacity: number;
  let scale: number;
  let currentX: number;
  let currentY: number;
  let rotation: number;

  if (scrollProgress < flyStart) {
    opacity = 1;
    scale = 1;
    currentX = tweet.startX;
    currentY = tweet.startY;
    rotation = tweet.rotation;
  } else if (scrollProgress < flyEnd) {
    const t = (scrollProgress - flyStart) / (flyEnd - flyStart);
    const eased = 1 - Math.pow(1 - t, 3);
    opacity = 1 - eased;
    scale = 1 - 0.8 * eased;
    currentX = tweet.startX + (targetX - tweet.startX) * eased;
    currentY = tweet.startY + (targetY - tweet.startY) * eased;
    rotation = tweet.rotation * (1 - eased);
  } else {
    opacity = 0;
    scale = 0.2;
    currentX = targetX;
    currentY = targetY;
    rotation = 0;
  }

  return (
    <div
      className="fixed left-0 top-8 w-48 sm:w-64 bg-[var(--color-tweet-bg)] rounded-xl shadow-lg overflow-hidden pointer-events-none"
      style={{
        transform: `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
      }}
    >
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            {!isLoaded && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-full" />
            )}
            <img
              src={tweet.avatar}
              alt={tweet.username}
              className={`w-full h-full object-cover ${isLoaded ? "" : "opacity-0"}`}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="ml-3 min-w-0">
            <div className="font-bold text-[var(--color-tweet-text)] truncate">
              {tweet.username}
            </div>
            <div className="text-sm text-gray-400 truncate">{tweet.handle}</div>
          </div>
        </div>
        <p className="text-[var(--color-tweet-text)] text-sm leading-relaxed mb-3">
          {tweet.text}
        </p>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>❤️ {tweet.likes}</span>
          <span>🔄 {tweet.retweets}</span>
        </div>
      </div>
    </div>
  );
}
