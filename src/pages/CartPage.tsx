import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';

// Icons
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

// Define the structure for a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Mock data for demonstration purposes
const initialCartItems: CartItem[] = [
  {
    id: 'item-1',
    name: 'Memory Bread',
    price: 8.50,
    imageUrl: 'https://i.imgur.com/v1S3NfD.png', // Placeholder image for Memory Bread
    quantity: 1,
  },
  {
    id: 'item-2',
    name: 'Anywhere Door-itos',
    price: 5.00,
    imageUrl: 'https://i.imgur.com/YmKkXmY.png', // Placeholder image for Doritos
    quantity: 2,
  },
  {
    id: 'item-3',
    name: 'Dorayaki Pancake Stack',
    price: 12.00,
    imageUrl: 'https://i.imgur.com/k9b8zL3.png', // Placeholder image for Dorayaki
    quantity: 1,
  },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  const handleCheckout = () => {
    // Navigate to the checkout page, path is from App.tsx
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <PageTransitionWrapper>
          <Card className="w-full max-w-4xl mx-auto shadow-xl rounded-2xl border-2 border-border/20">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-3xl md:text-4xl text-primary-dark">
                Your 4D Pocket Order
              </CardTitle>
              <CardDescription className="text-lg">
                Review your items before they're delivered by a gadget!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-2/5">Item</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-center">Remove</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                <div className="flex items-center gap-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                </TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                    className="w-12 h-8 text-center"
                                    />
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                </TableCell>
                                <TableCell className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label={`Remove ${item.name}`}>
                                    <Trash2 className="h-5 w-5 text-destructive" />
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              ) : (
                <div className="text-center py-16 flex flex-col items-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                  <h3 className="font-heading text-2xl">Your Cart is Empty!</h3>
                  <p className="text-muted-foreground">Looks like you haven't added any magical delights yet.</p>
                  <Button asChild size="lg" className="mt-4">
                    <Link to="/menu">Explore the Menu</Link>
                  </Button>
                </div>
              )}
            </CardContent>
            {cartItems.length > 0 && (
                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/50 p-6 rounded-b-2xl">
                    <div className="text-2xl font-bold">
                        <span>Subtotal: </span>
                        <span className="text-primary">${subtotal.toFixed(2)}</span>
                    </div>
                    <Button onClick={handleCheckout} size="lg" className="w-full sm:w-auto font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform duration-200 active:scale-95">
                        Proceed to Checkout
                    </Button>
                </CardFooter>
            )}
          </Card>
        </PageTransitionWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;