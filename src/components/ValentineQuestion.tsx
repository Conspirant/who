import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FlowState = "INIT" | "REJECT" | "GOODBOY" | "ASK" | "GIFT" | "REVEAL";

interface RainingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface ValentineQuestionProps {
  recipientName: string;
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: -20 },
};

const ValentineQuestion = ({ recipientName, onNext }: { recipientName: string; onNext: () => void }) => {
  const [flowState, setFlowState] = useState<FlowState>("INIT");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [giftClicked, setGiftClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const maxX = Math.min(container.width - 150, 200);
    const maxY = Math.min(container.height - 60, 150);

    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;

    setNoButtonPosition({ x: newX, y: newY });
    setNoHoverCount((prev) => prev + 1);
  };

  const runawayMessages = [
    "",
    "Where are you going? 👀",
    "You can't escape! 😏",
    "Just say yes already~ 💕",
    "This button has trust issues now 😢",
    "It's getting tired of running! 😤",
  ];

  // --- INIT STATE ---
  const renderInit = () => (
    <motion.div
      key="init"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.img
        src="/images/new_1_init.jpeg"
        alt="Cute cat waving"
        className="w-48 h-auto md:w-64 mb-8 drop-shadow-xl border-4 border-white rounded-3xl shadow-2xl"
        initial={{ y: -20 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <h2 className="text-2xl md:text-5xl font-display text-primary mb-3 animate-fade-up leading-relaxed pb-2">
        Hey {recipientName}!
      </h2>
      <p className="text-xl md:text-2xl text-foreground mb-2 font-medium">
        I made something for you
      </p>
      <p className="text-lg text-muted-foreground mb-8">Do you want to see?</p>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFlowState("GOODBOY")}
          className="btn-love text-lg md:text-xl px-8 py-3 md:px-10 md:py-4"
        >
          YES
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFlowState("REJECT")}
          className="px-8 py-3 md:px-10 md:py-4 rounded-full bg-muted text-muted-foreground font-semibold text-lg md:text-xl border-2 border-border"
        >
          NO
        </motion.button>
      </div>
    </motion.div>
  );

  // --- REJECT STATE ---
  const renderReject = () => (
    <motion.div
      key="reject"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.img
        src="/images/new_2_reject.jpeg"
        alt="Angry cat"
        className="w-56 h-auto md:w-72 mb-8 drop-shadow-xl border-4 border-white rounded-3xl shadow-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 0.3 }}
      />
      <h2 className="text-4xl md:text-6xl font-display text-primary mb-8 leading-relaxed pb-2">
        HOW DARE YOU!?
      </h2>
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#ff6b9d" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFlowState("INIT")}
        className="btn-love text-xl px-10 py-4"
      >
        GO BACK!!
      </motion.button>
    </motion.div>
  );

  // --- GOODBOY STATE ---
  const renderGoodboy = () => (
    <motion.div
      key="goodboy"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.img
        src="/images/new_3_goodboy.jpeg"
        alt="Good boy cat"
        className="w-56 h-auto md:w-72 mb-8 drop-shadow-xl border-4 border-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <h2 className="text-4xl md:text-6xl font-display text-primary mb-8 leading-relaxed pb-2">
        That's a Goodboy!
      </h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFlowState("ASK")}
        className="btn-love text-xl px-10 py-4"
      >
        CLICK!!
      </motion.button>
    </motion.div>
  );

  // --- ASK STATE ---
  const renderAsk = () => (
    <motion.div
      key="ask"
      ref={containerRef}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center relative min-h-[400px]"
    >
      <motion.img
        src="/images/new_4_ask.jpeg"
        alt="Cat with flowers"
        className="w-48 h-auto md:w-64 mb-8 drop-shadow-xl border-4 border-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <p className="text-xl text-muted-foreground mb-1">Umm..</p>
      <h2 className="text-3xl md:text-5xl font-display text-primary mb-8 leading-relaxed pb-2">
        Will you be my Valentine?
      </h2>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 min-h-[120px]">
        <motion.button
          whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(255,107,157,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFlowState("GIFT")}
          className="btn-love text-xl px-10 py-4 font-handwriting"
        >
          Ofcourse!
        </motion.button>
        <motion.button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-10 py-4 rounded-full bg-muted text-muted-foreground font-semibold text-xl border-2 border-border"
        >
          NOPE
        </motion.button>
      </div>
      {noHoverCount > 0 && noHoverCount < 6 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-lg text-primary font-medium"
        >
          {runawayMessages[Math.min(noHoverCount, runawayMessages.length - 1)]}
        </motion.p>
      )}
    </motion.div>
  );

  // --- GIFT STATE ---
  const renderGift = () => (
    <motion.div
      key="gift"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.img
        src="/images/new_5_gift.jpg"
        alt="Cat with gift"
        className="w-56 h-auto md:w-72 mb-8 drop-shadow-xl cursor-pointer border-4 border-white rounded-3xl shadow-2xl"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setGiftClicked(true);
          setTimeout(() => setFlowState("REVEAL"), 800);
        }}
        animate={
          giftClicked
            ? { scale: [1, 1.3, 0], rotate: [0, 10, -10, 0], opacity: [1, 1, 0] }
            : { y: [0, -5, 0] }
        }
        transition={
          giftClicked
            ? { duration: 0.8 }
            : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }
      />
      <h2 className="text-3xl md:text-5xl font-display text-primary mb-3 leading-relaxed pb-2">
        Happy valentine's day my love!
      </h2>
      <motion.p
        className="text-lg text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        ↑ Click on the gift box!
      </motion.p>
    </motion.div>
  );

  // --- REVEAL STATE ---
  const renderReveal = () => (
    <motion.div
      key="reveal"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.div
        className="relative mb-8"
        initial={{ rotate: -10 }}
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <motion.img
          src="/images/new_6_reveal.jpeg"
          alt="Photo of us"
          className="w-64 h-auto md:w-80 rounded-3xl shadow-2xl border-4 border-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        />
        <motion.div
          className="absolute -top-4 -right-4 text-4xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          🎀
        </motion.div>
      </motion.div>
      <h2 className="text-3xl md:text-5xl font-display text-primary mb-3 leading-relaxed pb-2">
        Cheers to our LOVE!
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        Wait! There is more {"<3"}
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="btn-love text-xl px-10 py-4"
      >
        Next!
      </motion.button>
    </motion.div>
  );

  return (
    <div className="page-container relative overflow-hidden min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {flowState === "INIT" && renderInit()}
        {flowState === "REJECT" && renderReject()}
        {flowState === "GOODBOY" && renderGoodboy()}
        {flowState === "ASK" && renderAsk()}
        {flowState === "GIFT" && renderGift()}
        {flowState === "REVEAL" && renderReveal()}
      </AnimatePresence>
    </div>
  );
};

export default ValentineQuestion;


