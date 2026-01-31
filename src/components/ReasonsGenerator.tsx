import { useState } from "react";

interface ReasonsGeneratorProps {
  recipientName: string;
}

const ReasonsGenerator = ({ recipientName }: ReasonsGeneratorProps) => {
  const reasons = [
    `You make bad days less illegal, ${recipientName} ⚖️`,
    "You tolerate my nonsense 🙃",
    "You're my favorite notification 📱",
    "You laugh at my jokes (even the bad ones) 😂",
    "Your smile could power a city 💡",
    "You're basically a walking serotonin boost 🧪",
    "You make existing more fun 🎉",
    "Your vibe is immaculate ✨",
    "You're the reason I check my phone 📲",
    "You're my favorite distraction 🦋",
    "You make me want to be a better person 💪",
    "You're proof that angels exist 👼",
    "Your presence is a gift 🎁",
    "You're my comfort person 🧸",
    "You make chaos feel like peace 🕊️",
  ];

  const [currentReason, setCurrentReason] = useState(reasons[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const colors = ["#ff6b8a", "#ff8fab", "#ffc2d1", "#ffb3c6", "#ffa5ba"];

  const generateReason = () => {
    setIsAnimating(true);
    
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);

    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setCurrentReason(reasons[Math.floor(Math.random() * reasons.length)]);
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsAnimating(false);
        setConfetti([]);
      }
    }, 80);
  };

  return (
    <div className="page-container">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-display text-gradient mb-2">
            Reasons I Like You 💕
          </h2>
          <p className="text-muted-foreground">
            Click for infinite validation, {recipientName}~
          </p>
        </div>

        <div className="relative text-center py-8">
          {/* Confetti */}
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute pointer-events-none animate-confetti"
              style={{ left: `${piece.x}%`, top: `${piece.y}%`, color: piece.color }}
            >
              💖
            </div>
          ))}

          <div
            className={`
              bg-card rounded-3xl p-8 md:p-12 shadow-love-lg border-2 border-primary/10
              transition-all duration-300
              ${isAnimating ? "animate-pulse-soft" : ""}
            `}
          >
            <p
              className={`
                text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-8
                min-h-[80px] flex items-center justify-center
                ${isAnimating ? "blur-sm" : ""}
                transition-all duration-200
              `}
            >
              "{currentReason}"
            </p>

            <button
              onClick={generateReason}
              disabled={isAnimating}
              className="btn-love hover-wiggle disabled:opacity-50"
            >
              {isAnimating ? "✨ Thinking..." : "💖 Show me another reason"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsGenerator;
