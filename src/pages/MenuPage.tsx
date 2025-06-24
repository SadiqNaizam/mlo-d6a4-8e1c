import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import ThemedMenuItemCard from '@/components/ThemedMenuItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterIllustration from '@/components/CharacterIllustration';

const menuItems = {
  mains: [
    {
      id: 'm01',
      name: "Time-Traveling Ramen",
      price: 15.50,
      imageUrl: 'https://jw-webmagazine.com/wp-content/uploads/2021/01/Doraemon-Cafe-Osaka-Doraemon-Pasta.jpg',
      description: "A rich and savory broth that takes your taste buds on a journey through time. Topped with narutomaki and a gadget-shaped garnish."
    },
    {
      id: 'm02',
      name: "Gian's Hearty Stew",
      price: 18.00,
      imageUrl: 'https://i.ytimg.com/vi/qV1tCq1jFq4/maxresdefault.jpg',
      description: "A powerful and fulfilling stew, just like Gian's singing! Packed with tender meat, chunky vegetables, and a whole lot of flavor."
    },
  ],
  desserts: [
    {
      id: 'd01',
      name: "Classic Dorayaki Stack",
      price: 8.00,
      imageUrl: 'https://i.pinimg.com/originals/c7/42/fd/c742fd82e0d165682859187e1634b1c7.jpg',
      description: "Doraemon's absolute favorite! A fluffy stack of sweet red bean-filled pancakes, served warm with a side of honey."
    },
    {
      id: 'd02',
      name: "Memory Bread French Toast",
      price: 9.50,
      imageUrl: 'https://i.ytimg.com/vi/u4_s4M9wTjA/maxresdefault.jpg',
      description: "Need to remember something important? This delicious french toast might just do the trick! Dusted with powdered sugar and served with fruit."
    },
    {
        id: 'd03',
        name: "Small Light Soufflé",
        price: 11.00,
        imageUrl: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/3/2019/08/doraemon-cafe-fujiko-fujio-museum-1024x600.jpg',
        description: "An incredibly light and airy soufflé that almost floats off the plate. A delicately sweet and magical experience."
    }
  ],
  drinks: [
    {
      id: 'dr01',
      name: "Anywhere Door Soda",
      price: 6.50,
      imageUrl: 'https://jw-webmagazine.com/wp-content/uploads/2021/01/Doraemon-Cafe-Osaka-Doraemon-drink.jpg',
      description: "A bubbly, color-changing soda that will transport your senses to a tropical paradise. Who knows where the next sip will take you?"
    },
    {
      id: 'dr02',
      name: "Time-Kerchief Tea",
      price: 5.00,
      imageUrl: 'https://i.pinimg.com/736x/88/54/a7/8854a72d627c28f32230006e8b43828c.jpg',
      description: "A calming and aromatic herbal tea blend that makes you feel refreshed and new. Served hot or iced."
    }
  ]
};

const MenuPage = () => {
  console.log('MenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <PageTransitionWrapper>
          <div className="container py-12">
            <section className="text-center mb-12 relative">
                <div className="absolute -top-20 -left-20 opacity-10 hidden lg:block">
                    <CharacterIllustration 
                        imageUrl="https://i.pinimg.com/originals/60/7a/12/607a12a5a543666d3a82e9db07931a2c.png"
                        alt="Doraemon floating happily"
                        className="max-w-[200px]"
                    />
                </div>
              <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-dark tracking-tight">
                Explore Our Magical Menu
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Every dish is a gadget, every bite is an adventure! Find your new favorite today.
              </p>
            </section>

            <Tabs defaultValue="mains" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-12">
                <TabsTrigger value="mains" className="text-lg font-heading font-semibold">Mains</TabsTrigger>
                <TabsTrigger value="desserts" className="text-lg font-heading font-semibold">Desserts</TabsTrigger>
                <TabsTrigger value="drinks" className="text-lg font-heading font-semibold">Drinks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mains" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {menuItems.mains.map(item => (
                    <ThemedMenuItemCard key={item.id} {...item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="desserts" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {menuItems.desserts.map(item => (
                    <ThemedMenuItemCard key={item.id} {...item} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drinks" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {menuItems.drinks.map(item => (
                    <ThemedMenuItemCard key={item.id} {...item} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageTransitionWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;