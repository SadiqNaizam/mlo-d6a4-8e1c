import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import CharacterIllustration from '@/components/CharacterIllustration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  console.log('OrderConfirmationPage loaded');

  // Generate a whimsical, fake order ID for display
  const orderId = `DORA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <Header />
      <PageTransitionWrapper>
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl w-full">
            {/* Left side: Confirmation Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="w-full shadow-xl rounded-3xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="flex justify-center items-center gap-3 mb-2">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                    <CardTitle className="font-heading text-4xl font-bold text-primary-dark">
                      Order Confirmed!
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg text-muted-foreground">
                    Thank you! We're packing it with fun and magic.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 pt-4">
                  <div className="text-center p-4 bg-secondary rounded-xl w-full">
                    <p className="text-sm text-muted-foreground">Your Order ID is:</p>
                    <p className="font-bold font-mono text-xl text-foreground tracking-wider">{orderId}</p>
                  </div>
                  <div className="text-center">
                     <p className="font-semibold text-lg">Estimated Arrival Time:</p>
                     <p className="text-3xl font-heading font-bold text-primary">20-30 minutes</p>
                  </div>
                  <div className="mt-4 w-full flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="font-bold w-full sm:w-auto">
                      <Link to="/menu">Browse More Delights</Link>
                    </Button>
                     <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                      <Link to="/">
                        <Home className="mr-2 h-5 w-5" />
                        Go to Homepage
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right side: Cheerful Illustration */}
            <CharacterIllustration
              imageUrl="https://i.imgur.com/O6qJ4hA.png" // A happy, waving Doraemon
              alt="A cheerful Doraemon celebrating your order"
              animation="float"
              className="row-start-1 md:row-start-auto"
            />
          </div>
        </main>
      </PageTransitionWrapper>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;