import { useState } from "react";

interface FakeExitButtonProps {
  recipientName: string;
}

const FakeExitButton = ({ recipientName }: FakeExitButtonProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const messages = [
    `Nice try, ${recipientName}. You're not leaving. 💕`,
    "Did you really think that would work? 😏",
    "Nope! You're stuck with me~ 💖",
    "The exit is closed. Forever. 🚫❤️",
    "You're not going anywhere, cutie! 🥰",
  ];

  const handleClick = () => {
    setIsShaking(true);
    setShowMessage(true);
    setClickCount((prev) => (prev + 1) % messages.length);

    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setShowMessage(false), 2500);
  };

  return (
    <div className="page-container">
      <div className={`text-center ${isShaking ? "animate-shake" : ""}`}>
        <h2 className="text-3xl md:text-4xl font-display text-gradient mb-6 animate-fade-up">
          Had Enough? 🙈
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 animate-fade-up">
          If you must leave... (just kidding, you can't)
        </p>

        <button
          onClick={handleClick}
          className="px-8 py-4 rounded-full bg-muted text-muted-foreground font-semibold text-lg
                     border-2 border-border transition-all duration-300
                     hover:bg-muted/80 hover:border-primary/30"
        >
          ❌ Close Website
        </button>

        {showMessage && (
          <div className="mt-8 animate-fade-up">
            <p className="text-xl md:text-2xl font-display text-primary">
              {messages[clickCount]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeExitButton;
