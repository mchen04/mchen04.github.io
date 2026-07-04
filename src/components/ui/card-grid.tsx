import { useState } from "react";
import { Button } from "./button";

interface CardGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  description: string;
}

const CardGrid = <T,>({ items, renderItem, title, description }: CardGridProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container px-6">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="animate-fade-up hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
        {items.length > 3 && (
          <div className="mt-12 text-center animate-fade-in">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="transition-all duration-300 hover:scale-105"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardGrid;