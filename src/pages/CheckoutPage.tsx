import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import CharacterIllustration from '@/components/CharacterIllustration';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { User, Mail, Phone, Home, CreditCard, Sparkles } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Don't be shy, tell us your name!" }),
  email: z.string().email({ message: "We need a valid email for order updates." }),
  phone: z.string().min(10, { message: "A 10-digit phone number, please." }),
  address: z.string().min(5, { message: "Where should we send the magic?" }),
  city: z.string().min(2, { message: "City name is required." }),
  zipCode: z.string().min(5, { message: "A 5-digit zip code, please." }),
  paymentMethod: z.enum(['creditCard', 'gadgetPay'], { required_error: "Please select a payment method." }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    // In a real app, you would process the payment here.
    // On success, navigate to the confirmation page.
    navigate('/order-confirmation');
  };

  const orderItems = [
    { name: "Memory Bread Slice", quantity: 2, price: 4.50 },
    { name: "Anywhere Door-itos", quantity: 1, price: 7.00 },
    { name: "Time Furoshiki Wrap", quantity: 1, price: 12.00 },
  ];
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <PageTransitionWrapper>
        <main className="flex-grow container py-8 md:py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Final Step to Magic!</h1>
            <p className="text-muted-foreground text-lg mt-2">Just a few details and your order will be on its way.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Your Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Nobita Nobi" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="nobita@doraemon.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="Your contact number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      {/* Address Info */}
                      <Separator />
                      <h3 className="font-heading text-xl font-semibold pt-4">Shipping Address</h3>
                       <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Anime Lane" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Tokyo" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="zipCode" render={({ field }) => (
                          <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      
                       {/* Payment Info */}
                       <Separator />
                       <h3 className="font-heading text-xl font-semibold pt-4">Payment Method</h3>
                       <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                          <FormItem>
                            <FormLabel>How would you like to pay?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select a payment method" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="creditCard"><div className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Credit Card</div></SelectItem>
                                <SelectItem value="gadgetPay"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-500" /> Future Gadget Pay</div></SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        {/* A fun message for non-CC payment */}
                         {form.watch('paymentMethod') === 'gadgetPay' && <p className="text-sm text-blue-600 p-3 bg-blue-50 rounded-lg">An excellent choice! A payment drone is being dispatched from the 22nd century.</p>}

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button type="submit" size="lg" className="w-full font-bold text-lg">
                          Place Order with Magic!
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <Card className="border-2 shadow-lg rounded-2xl sticky top-24">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map(item => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                      <p className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between"><p className="text-muted-foreground">Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                     <div className="flex justify-between"><p className="text-muted-foreground">Taxes & Fees</p><p>${tax.toFixed(2)}</p></div>
                  </div>
                   <Separator />
                   <div className="flex justify-between font-bold text-lg">
                     <p>Total</p>
                     <p>${total.toFixed(2)}</p>
                   </div>
                </CardContent>
                <CardFooter>
                    <CharacterIllustration
                        imageUrl="https://i.imgur.com/gkkBFtB.png"
                        alt="Doraemon cheering for your order"
                        animation="float"
                        className="w-full mt-4"
                    />
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </PageTransitionWrapper>
      <Footer />
    </div>
  );
};

export default CheckoutPage;