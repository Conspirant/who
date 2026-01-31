import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizSectionProps {
  recipientName: string;
}

const QuizSection = ({ recipientName }: QuizSectionProps) => {
  const questions: Question[] = [
    {
      question: `${recipientName}, what's my favorite thing about you?`,
      options: ["Your smile", "Your laugh", "The way you exist", "All of the above"],
      correctIndex: 3,
    },
    {
      question: "What happens when I see you?",
      options: ["I panic internally", "My day gets better", "I forget how to speak", "All of the above (again)"],
      correctIndex: 3,
    },
    {
      question: "How much do I like you?",
      options: ["A lot", "More than pizza", "To infinity", "Words can't describe"],
      correctIndex: 3,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [roastMessage, setRoastMessage] = useState("");
  const [quizComplete, setQuizComplete] = useState(false);

  const roasts = [
    "Really? Try again, cutie 💕",
    "Hmm, are you sure about that? 🤔",
    "Close! But not quite~ 💖",
    "That's adorable, but wrong! 😘",
  ];

  const handleAnswer = (index: number, e: React.MouseEvent) => {
    setSelectedAnswer(index);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    
    if (index === questions[currentQuestion].correctIndex) {
      const newExplosions = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }));
      setExplosions((prev) => [...prev, ...newExplosions]);
      
      setTimeout(() => setExplosions([]), 1000);

      setShowResult(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setQuizComplete(true);
        }
      }, 1500);
    } else {
      setRoastMessage(roasts[Math.floor(Math.random() * roasts.length)]);
      setTimeout(() => {
        setSelectedAnswer(null);
        setRoastMessage("");
      }, 1500);
    }
  };

  if (quizComplete) {
    return (
      <div className="page-container">
        <div className="text-center py-12 animate-fade-up">
          <div className="text-6xl mb-4 animate-heartbeat">💖</div>
          <h3 className="text-3xl font-display text-gradient mb-4">
            You passed the vibe check!
          </h3>
          <p className="text-lg text-muted-foreground">
            Obviously you know me well, {recipientName}~ 💕
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container relative">
      {/* Heart explosions */}
      {explosions.map((explosion) => (
        <div
          key={explosion.id}
          className="fixed pointer-events-none z-50"
          style={{ left: explosion.x, top: explosion.y }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl"
              style={{
                animation: "confetti 0.8s ease-out forwards",
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
              }}
            >
              💖
            </span>
          ))}
        </div>
      ))}

      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-display text-gradient mb-2">
            How Well Do You Know Me? 🤔
          </h2>
          <p className="text-muted-foreground">
            Let's see if you've been paying attention~
          </p>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-display mb-8 text-foreground">
            {questions[currentQuestion].question}
          </h3>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => handleAnswer(index, e)}
                disabled={selectedAnswer !== null}
                className={`
                  p-4 rounded-2xl text-lg font-medium transition-all duration-300
                  ${selectedAnswer === index
                    ? index === questions[currentQuestion].correctIndex
                      ? "bg-primary text-primary-foreground shadow-love scale-105"
                      : "bg-destructive/20 text-destructive animate-shake"
                    : "bg-card border-2 border-primary/20 hover-wiggle hover:border-primary hover:shadow-love"
                  }
                  disabled:cursor-not-allowed
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {roastMessage && (
            <p className="mt-6 text-lg text-primary animate-fade-up font-medium">
              {roastMessage}
            </p>
          )}

          {showResult && (
            <p className="mt-6 text-xl text-primary animate-fade-up font-display">
              Correct! You know me so well~ 💖
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
