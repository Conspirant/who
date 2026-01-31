import { useState, useEffect } from "react";
import TypewriterText from "./TypewriterText";
import FloatingHearts from "./FloatingHearts";

interface WelcomePageProps {
  recipientName: string;
  onContinue: () => void;
}

const WelcomePage = ({ recipientName, onContinue }: WelcomePageProps) => {
  const [showButton, setShowButton] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  return (
    <div className="page-container relative">
      <FloatingHearts />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display text-gradient mb-8">
          {titleComplete ? (
            `Hey ${recipientName}! 💖`
          ) : (
            <TypewriterText
              text={`Hey ${recipientName}! 💖`}
              delay={80}
              onComplete={() => setTitleComplete(true)}
            />
          )}
        </h1>

        {titleComplete && (
          <div className="animate-fade-up">
            <p className="text-xl md:text-2xl text-foreground mb-4">
              <TypewriterText
                text="I made something special for you..."
                delay={50}
                onComplete={() => setShowButton(true)}
              />
            </p>
          </div>
        )}

        <div
          className={`transition-all duration-700 mt-8 ${showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
            }`}
        >
          <button
            onClick={onContinue}
            className="btn-love text-lg md:text-2xl px-8 py-4 md:px-10 md:py-5 hover-wiggle"
          >
            👉 Open
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-4xl animate-bounce-soft">
        💕
      </div>
    </div>
  );
};

export default WelcomePage;
