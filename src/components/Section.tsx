import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Section = ({ id, children, className = "", title, subtitle }: SectionProps) => {
  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-16 ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto">
        {title && (
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-display text-gradient mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
