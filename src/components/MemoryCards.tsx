import { useState } from "react";

interface Memory {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

const memories: Memory[] = [
  {
    id: 1,
    emoji: "🌙",
    title: "Late Night Talks",
    description: "Those 3am conversations where time didn't exist",
  },
  {
    id: 2,
    emoji: "😂",
    title: "The Dumb Joke",
    description: "That one joke we both laughed at way too hard",
  },
  {
    id: 3,
    emoji: "🍕",
    title: "Food Adventures",
    description: "Every meal is better with you",
  },
  {
    id: 4,
    emoji: "✨",
    title: "Random Moments",
    description: "The ordinary moments that became special",
  },
  {
    id: 5,
    emoji: "🎵",
    title: "Our Song",
    description: "Every song reminds me of you now",
  },
  {
    id: 6,
    emoji: "💭",
    title: "Inside Jokes",
    description: "Things only we understand",
  },
];

const MemoryCards = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {memories.map((memory, index) => (
        <div
          key={memory.id}
          className="card-memory"
          onClick={() => toggleCard(memory.id)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className={`card-memory-inner ${
              flippedCards.includes(memory.id) ? "flipped" : ""
            }`}
            style={{
              transform: flippedCards.includes(memory.id)
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div className="card-memory-face card-memory-front shadow-love">
              <div className="text-center">
                <span className="text-5xl md:text-6xl block mb-2">{memory.emoji}</span>
                <span className="text-sm md:text-base font-medium opacity-90">
                  Click to reveal
                </span>
              </div>
            </div>
            
            {/* Back */}
            <div className="card-memory-face card-memory-back shadow-lg">
              <div className="text-center">
                <span className="text-3xl md:text-4xl block mb-3">{memory.emoji}</span>
                <h4 className="font-display text-lg md:text-xl text-primary mb-2">
                  {memory.title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  {memory.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoryCards;
