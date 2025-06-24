import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CharacterIllustration from '@/components/CharacterIllustration';
import ThemedMenuItemCard from '@/components/ThemedMenuItemCard';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

// shadcn/ui Components
import { Button } from '@/components/ui/button';

// Placeholder data for featured items, as described in the user journey
const doraemonsFavorites = [
  {
    id: 'item-1',
    name: "Classic Dorayaki",
    price: 5.99,
    imageUrl: "https://i.pinimg.com/564x/0a/9f/31/0a9f31b817c1c57e7530c3d91771966d.jpg",
    description: "Fluffy pancakes filled with sweet red bean paste, Doraemon's absolute favorite snack!"
  },
  {
    id: 'item-2',
    name: "Genius Memory Bread",
    price: 7.50,
    imageUrl: "https://i.ytimg.com/vi/Wk9q6QqunPA/maxresdefault.jpg",
    description: "Toasted to perfection. Just press it onto your study notes and eat up for instant knowledge!"
  },
  {
    id: 'item-3',
    name: "Anywhere Door Mousse Cake",
    price: 8.00,
    imageUrl: "https://i.pinimg.com/736x/87/a7/9a/87a79a557b6d1e441315516a206c9a30.jpg",
    description: "A delightful strawberry mousse cake shaped like the famous gadget. A sweet escape in every bite."
  }
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-body">
      <Header />
      <PageTransitionWrapper>
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
              <div className="text-center md:text-left">
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 tracking-tighter">
                  Welcome to a World of<br />
                  <span className="text-primary">Magical Flavors!</span>
                </h1>
                <p className="mt-6 text-lg text-foreground/80 max-w-md mx-auto md:mx-0">
                  Step into Doraemon's kitchen where every dish is an adventure. Explore our whimsical menu filled with delicious delights and futuristic fun.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="font-bold text-lg transition-transform duration-200 active:scale-95">
                    <Link to="/menu"> {/* Path from App.tsx */}
                      Explore Full Menu
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-first md:order-last">
                <CharacterIllustration
                  imageUrl="https://pngimg.com/uploads/doraemon/doraemon_PNG2.png"
                  alt="A cheerful Doraemon character waving hello"
                  animation="float"
                />
              </div>
            </div>
          </section>

          {/* Doraemon's Favorites Section */}
          <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-blue-800">Doraemon's Favorites</h2>
                <p className="mt-2 text-lg text-muted-foreground">The most popular and magical items from our kitchen!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doraemonsFavorites.map((item) => (
                  <ThemedMenuItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransitionWrapper>
      <Footer />
    </div>
  );
};

export default Homepage;