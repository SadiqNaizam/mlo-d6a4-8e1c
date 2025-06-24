import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";

interface ThemedMenuItemCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const ThemedMenuItemCard: React.FC<ThemedMenuItemCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description
}) => {
  console.log(`ThemedMenuItemCard loaded for: ${name}`);

  const handleAddToOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the hover animation from re-triggering on click
    event.preventDefault();
    
    toast.success(`${name} added to your order!`, {
      description: "We're packing it with fun and magic.",
      duration: 3000,
    });
    console.log(`Added item ${id} to order.`);
    // In a real app, you would also call a state management function here
    // e.g., addToCart({ id, name, price, imageUrl });
  };

  return (
    <Card className="group w-full overflow-hidden rounded-3xl border-2 border-border/10 shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:animate-bounce-gentle flex flex-col">
      <div className="overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col justify-between bg-card">
        <div className="mb-4">
          <h3 className="font-heading text-2xl font-bold text-foreground truncate" title={name}>
            {name}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="font-heading text-2xl font-extrabold text-primary">
            ${price.toFixed(2)}
          </p>
          <Button 
            onClick={handleAddToOrder} 
            className="font-bold transition-transform duration-200 active:scale-95"
            size="lg"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add to Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemedMenuItemCard;