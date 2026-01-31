import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import WelcomePage from "@/components/WelcomePage";
import LoveLetter from "@/components/LoveLetter";
import ValentineQuestion from "@/components/ValentineQuestion";

type PageType =
  | "welcome"
  | "valentine"
  | "letter";

const pageOrder: PageType[] = [
  "welcome",
  "valentine",
  "letter",
];

const imageUrls = [
  "/images/new_1_init.jpeg",
  "/images/new_2_reject.jpeg",
  "/images/new_3_goodboy.jpeg",
  "/images/new_4_ask.jpeg",
  "/images/new_5_gift.jpg",
  "/images/new_6_reveal.jpeg",
];

const preloadImages = () => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const Index = () => {
  const [recipientName, setRecipientName] = useState("Krishhh");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    preloadImages();
  }, []);

  const currentPage = pageOrder[currentPageIndex];

  const navigateTo = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= pageOrder.length) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPageIndex(pageIndex);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const goToNext = () => navigateTo(currentPageIndex + 1);
  const goToPrevious = () => navigateTo(currentPageIndex - 1);



  // Hide navigation everywhere for this flow
  const showNav = false;

  const renderPage = () => {
    const pageClass = `transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
      }`;

    switch (currentPage) {


      case "welcome":
        return (
          <div className={pageClass}>
            <WelcomePage recipientName={recipientName} onContinue={goToNext} />
          </div>
        );



      case "valentine":
        return (
          <div className={pageClass}>
            <ValentineQuestion recipientName={recipientName} onNext={goToNext} />
          </div>
        );

      case "letter":
        return (
          <div className={pageClass}>
            <LoveLetter recipientName={recipientName} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <FloatingHearts />

      {renderPage()}


    </div>
  );
};

export default Index;
