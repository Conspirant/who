import { useState } from "react";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="page-container relative">
      <div className="text-center max-w-md mx-auto animate-fade-up">
        <div className="text-6xl mb-6 animate-heartbeat">💕</div>
        
        <h2 className="text-3xl md:text-4xl font-display text-gradient mb-4">
          Before we begin...
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          What should I call you, cutie?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your name..."
              maxLength={20}
              className={`
                w-full px-6 py-4 text-xl text-center rounded-full
                bg-card border-2 transition-all duration-300
                placeholder:text-muted-foreground/50
                focus:outline-none
                ${isFocused 
                  ? "border-primary shadow-love" 
                  : "border-primary/20 hover:border-primary/40"
                }
              `}
            />
            <div 
              className={`
                absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 
                bg-primary rounded-full transition-all duration-300
                ${isFocused ? "w-1/2" : ""}
              `}
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              btn-love w-full transition-all duration-300
              ${!name.trim() ? "opacity-50 cursor-not-allowed" : "hover-wiggle"}
            `}
          >
            That's me! 💖
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
