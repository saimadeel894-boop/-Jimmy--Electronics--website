import MainLayout from "@/components/layout/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import faqs from "@/data/faqs.json";

const Support = () => {
  return (
    <MainLayout>
      <section className="bg-secondary py-8">
        <div className="container-jimmy text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Support Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">How can we help you today?</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding-md">
        <div className="container-jimmy max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-sm font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Warranty */}
      <section id="warranty" className="bg-secondary section-padding-md">
        <div className="container-jimmy max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-foreground">Warranty Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All JIMMY products sold through Jimmy Africa come with a 2-year manufacturer warranty.
            This covers defects in materials and workmanship under normal use conditions.
            For warranty claims, please contact our support team with your order number and proof of purchase.
          </p>
        </div>
      </section>

      {/* Shipping */}
      <section id="shipping" className="section-padding-md">
        <div className="container-jimmy max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-foreground">Shipping Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We offer FREE DHL Express shipping on all orders over R2,500 within South Africa.
            Standard delivery takes 3–5 business days. International shipping available to select African countries.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-secondary section-padding-md">
        <div className="container-jimmy max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-foreground text-center">Contact Us</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-md border bg-background p-6 text-center">
              <Mail className="mb-3 h-8 w-8 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Email</h3>
              <a href="mailto:support@jimmyafrica.com" className="mt-1 text-sm text-primary hover:underline">support@jimmyafrica.com</a>
            </div>
            <div className="flex flex-col items-center rounded-md border bg-background p-6 text-center">
              <Phone className="mb-3 h-8 w-8 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Phone</h3>
              <a href="tel:+27100001234" className="mt-1 text-sm text-primary hover:underline">+27 10 000 1234</a>
            </div>
            <div className="flex flex-col items-center rounded-md border bg-background p-6 text-center">
              <MessageCircle className="mb-3 h-8 w-8 text-primary" />
              <h3 className="text-sm font-bold text-foreground">WhatsApp</h3>
              <a
                href="https://wa.me/27100001234?text=Hi%2C%20I%20need%20help%20with%20a%20Jimmy%20Africa%20product."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-primary hover:underline"
              >
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section id="returns" className="section-padding-md">
        <div className="container-jimmy max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-foreground">Returns Policy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We offer a 14-day return policy on all products. Items must be returned in their original condition
            and packaging. Contact our support team to initiate a return. Refunds are processed within 5-7 business days.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Support;
