import { useState, useEffect } from "react";

interface LoveLetterProps {
  recipientName: string;
}

const LoveLetter = ({ recipientName }: LoveLetterProps) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const letterContent = `Dear ${recipientName},
 
 I wanted to take a moment to tell you how much I appreciate you.
 
 You bring so much light and stability into my life. Your kindness, your intelligence, and the way you handle everything is something I truly admire.
 
 Thank you for being my rock and my partner. I cherish the connection we have and look forward to building even more memories together.
 
 Happy Valentine's Day.
 
 Yours,
 💖`;

  useEffect(() => {
    if (visibleChars < letterContent.length) {
      const timer = setTimeout(() => {
        setVisibleChars((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [visibleChars, letterContent.length]);

  const displayedText = letterContent.slice(0, visibleChars);
  const lines = displayedText.split('\n');

  return (
    <div className="page-container">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-display text-gradient mb-2">
            A Letter For You 💌
          </h2>
          <p className="text-muted-foreground">
            Watch as the words appear...
          </p>
        </div>

        <div
          className="paper-texture rounded-2xl p-6 md:p-12 shadow-love-lg relative overflow-hidden"
          style={{ minHeight: '500px' }}
        >
          {/* Paper fold effect */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent" />

          <div className="font-handwriting text-xl md:text-2xl leading-relaxed text-foreground/90">
            {lines.map((line, lineIndex) => (
              <p key={lineIndex} className="min-h-[1.5em]">
                {line.split('').map((char, charIndex) => (
                  <span
                    key={`${lineIndex}-${charIndex}`}
                    className="inline-block"
                    style={{
                      animation: 'letter-reveal 0.1s ease-out forwards',
                      opacity: 1,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
            ))}

            {/* Blinking cursor */}
            {!isComplete && (
              <span className="inline-block w-0.5 h-6 bg-primary animate-pulse ml-1" />
            )}
          </div>

          {isComplete && (
            <div className="absolute bottom-4 right-4 text-4xl animate-heartbeat">
              💕
            </div>
          )}
        </div>

        {isComplete && (
          <p className="text-center mt-6 text-muted-foreground animate-fade-up">
            Every word is true~ 💖
          </p>
        )}
      </div>
    </div>
  );
};

export default LoveLetter;
