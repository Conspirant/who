import { useState, useRef } from "react";
import { Plus, Image, Heart } from "lucide-react";

interface Memory {
  id: number;
  emoji: string;
  title: string;
  description: string;
  photo?: string;
}

interface PhotoMemoryCardsProps {
  recipientName: string;
}

const defaultMemories: Memory[] = [
  { id: 1, emoji: "🌙", title: "Late Night Talks", description: "Those 3am conversations where time didn't exist" },
  { id: 2, emoji: "😂", title: "The Dumb Joke", description: "That one joke we both laughed at way too hard" },
  { id: 3, emoji: "🍕", title: "Food Adventures", description: "Every meal is better with you" },
  { id: 4, emoji: "✨", title: "Random Moments", description: "The ordinary moments that became special" },
  { id: 5, emoji: "🎵", title: "Our Song", description: "Every song reminds me of you now" },
  { id: 6, emoji: "💭", title: "Inside Jokes", description: "Things only we understand" },
];

const PhotoMemoryCards = ({ recipientName }: PhotoMemoryCardsProps) => {
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleCard = (id: number) => {
    if (editingCard === id) return;
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemories((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, photo: reader.result as string } : m
          )
        );
        setEditingCard(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTitle = (id: number, newTitle: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: newTitle } : m))
    );
  };

  const handleEditDescription = (id: number, newDesc: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, description: newDesc } : m))
    );
  };

  return (
    <div className="page-container">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-display text-gradient mb-2">
            Our Memory Lane 📸
          </h2>
          <p className="text-muted-foreground mb-4">
            Hey {recipientName}, tap to flip! Click the + to add your photos~
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`card-memory ${flippedCards.includes(memory.id) ? 'flipped' : ''}`}
              onClick={() => toggleCard(memory.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="card-memory-inner"
                style={{
                  transform: flippedCards.includes(memory.id)
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div className="card-memory-face card-memory-front shadow-love">
                  {memory.photo ? (
                    <img
                      src={memory.photo}
                      alt={memory.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-5xl md:text-6xl block mb-2">{memory.emoji}</span>
                      <span className="text-sm md:text-base font-medium opacity-90">
                        Click to reveal
                      </span>
                    </div>
                  )}
                  
                  {/* Add photo button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCard(memory.id);
                      fileInputRef.current?.click();
                    }}
                    className="absolute top-2 right-2 p-2 bg-card/90 rounded-full 
                               shadow-md hover:scale-110 transition-transform z-10"
                  >
                    {memory.photo ? (
                      <Image className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </button>
                </div>
                
                {/* Back */}
                <div className="card-memory-face card-memory-back shadow-lg">
                  {memory.photo && (
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url(${memory.photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px)',
                      }}
                    />
                  )}
                  <div className="text-center relative z-10">
                    <span className="text-3xl md:text-4xl block mb-3">{memory.emoji}</span>
                    <input
                      type="text"
                      value={memory.title}
                      onChange={(e) => handleEditTitle(memory.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="font-display text-lg md:text-xl text-primary mb-2 
                                 bg-transparent text-center w-full focus:outline-none
                                 border-b border-transparent focus:border-primary/30"
                      maxLength={30}
                    />
                    <textarea
                      value={memory.description}
                      onChange={(e) => handleEditDescription(memory.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm md:text-base text-muted-foreground bg-transparent 
                                 text-center w-full resize-none focus:outline-none
                                 border border-transparent focus:border-primary/20 rounded"
                      rows={2}
                      maxLength={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => editingCard && handlePhotoUpload(editingCard, e)}
          className="hidden"
        />

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            Tip: Click the + button to add your own photos!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoMemoryCards;
