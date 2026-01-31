import { useState, useEffect } from "react";

interface EnvelopeRevealProps {
  recipientName: string;
  onComplete: () => void;
}

const EnvelopeReveal = ({ recipientName, onComplete }: EnvelopeRevealProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setLetterVisible(true), 800);
      setTimeout(() => setShowContent(true), 1200);
    }
  };

  const feelings = [
    `${recipientName}, you're the notification I never want to mute 📱`,
    "Every moment with you feels like a dream I don't want to wake up from 🌙",
    "You're not just my favorite person, you're my favorite everything ✨",
    "My heart chose you before my brain could even process it 💕",
    "You make me believe in fairy tales again 🦋",
  ];

  return (
    <div className="page-container">
      <div className="text-center max-w-lg mx-auto">
        {!showContent ? (
          <>
            <h2 className="text-3xl md:text-4xl font-display text-gradient mb-6 animate-fade-up">
              One Last Thing... 💌
            </h2>
            <p className="text-lg text-muted-foreground mb-12 animate-fade-up">
              Tap the envelope to open your surprise~
            </p>

            {/* Envelope */}
            <div
              className={`envelope mx-auto cursor-pointer transition-transform duration-300 
                         hover:scale-105 ${isOpen ? 'open' : ''}`}
              onClick={handleClick}
            >
              {/* Envelope body */}
              <div className="envelope-body">
                {/* Heart seal */}
                <div
                  className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 
                             z-20 text-4xl transition-all duration-500
                             ${isOpen ? 'opacity-0 scale-0' : 'animate-heartbeat'}`}
                >
                  💖
                </div>
              </div>

              {/* Envelope flap */}
              <div className="envelope-flap" />

              {/* Letter inside */}
              <div
                className={`envelope-letter p-6 ${letterVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transition: 'opacity 0.4s ease-out 0.8s, height 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                }}
              >
                <div className="paper-texture h-full rounded-lg p-4 flex items-center justify-center">
                  <p className="font-handwriting text-xl text-center text-foreground/80">
                    Click to read my heart...
                  </p>
                </div>
              </div>
            </div>

            {!isOpen && (
              <p className="mt-8 text-sm text-muted-foreground animate-bounce-soft">
                👆 Tap me!
              </p>
            )}
          </>
        ) : (
          <div className="animate-fade-up">
            <div className="text-6xl mb-6 animate-heartbeat">💖</div>

            <h2 className="text-3xl md:text-4xl font-display text-gradient mb-8">
              My Feelings For You
            </h2>

            <div className="space-y-4 mb-10">
              {feelings.map((feeling, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-2xl shadow-md border border-primary/10
                             font-handwriting text-xl text-foreground/90"
                  style={{
                    animation: `fade-up 0.5s ease-out ${index * 0.15}s backwards`,
                  }}
                >
                  {feeling}
                </div>
              ))}
            </div>

            <p
              className="text-lg text-muted-foreground mb-8"
              style={{ animation: 'fade-up 0.5s ease-out 0.8s backwards' }}
            >
              And there's so much more I want to say...
            </p>

            <button
              onClick={onComplete}
              className="btn-love text-xl hover-wiggle"
              style={{ animation: 'fade-up 0.5s ease-out 1s backwards' }}
            >
              Forever Yours 💖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvelopeReveal;
