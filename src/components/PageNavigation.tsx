import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

const PageNavigation = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
}: PageNavigationProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      {showPrevious && currentPage > 0 && (
        <button
          onClick={onPrevious}
          className="btn-nav flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
      )}

      {/* Page indicators */}
      <div className="flex items-center gap-2 px-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentPage 
                ? "w-6 bg-primary" 
                : "bg-primary/30 hover:bg-primary/50"
              }
            `}
          />
        ))}
      </div>

      {showNext && currentPage < totalPages - 1 && (
        <button
          onClick={onNext}
          className="btn-nav flex items-center gap-2"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PageNavigation;
