import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 12 + Math.random() * 24,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.left}%`,
            top: "-50px",
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `rain ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
