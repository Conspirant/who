import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterText = ({ text, delay = 50, onComplete }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, delay, text, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block">
      {displayedText}
      <span
        className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </span>
  );
};

export default TypewriterText;
