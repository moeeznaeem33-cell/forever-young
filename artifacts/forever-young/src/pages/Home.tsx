import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Droplet, 
  Sparkles, 
  HeartHandshake, 
  Leaf, 
  Crown, 
  Syringe, 
  Scissors, 
  Flower2, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  ArrowUp,
  MessageCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Data
const SERVICES = [
  { name: "Hydra Facial", icon: <Droplet className="w-6 h-6" /> },
  { name: "Medi Facial", icon: <Sparkles className="w-6 h-6" /> },
  { name: "Skin Care Treatments", icon: <HeartHandshake className="w-6 h-6" /> },
  { name: "Acne Treatment", icon: <Leaf className="w-6 h-6" /> },
  { name: "Anti Aging Treatments", icon: <Crown className="w-6 h-6" /> },
  { name: "PRP Therapy", icon: <Syringe className="w-6 h-6" /> },
  { name: "Hair Treatments", icon: <Scissors className="w-6 h-6" /> },
  { name: "Bridal Makeup", icon: <Flower2 className="w-6 h-6" /> },
  { name: "Party Makeup", icon: <Star className="w-6 h-6" /> },
  { name: "Hair Styling", icon: <Scissors className="w-6 h-6" /> },
  { name: "Hair Coloring", icon: <Sparkles className="w-6 h-6" /> },
  { name: "Manicure", icon: <HeartHandshake className="w-6 h-6" /> },
  { name: "Pedicure", icon: <HeartHandshake className="w-6 h-6" /> },
  { name: "Waxing", icon: <Leaf className="w-6 h-6" /> },
  { name: "Threading", icon: <Scissors className="w-6 h-6" /> },
  { name: "Massage", icon: <HeartHandshake className="w-6 h-6" /> },
  { name: "Eyelash Extensions", icon: <Sparkles className="w-6 h-6" /> },
];

const FEATURES = [
  { title: "Experienced Beauty Experts", icon: <Award className="w-8 h-8 text-primary" /> },
  { title: "Premium Quality Products", icon: <Crown className="w-8 h-8 text-primary" /> },
  { title: "Clean & Hygienic Environment", icon: <ShieldCheck className="w-8 h-8 text-primary" /> },
  { title: "Personalized Beauty Solutions", icon: <CheckCircle2 className="w-8 h-8 text-primary" /> },
];

const TESTIMONIALS = [
  { text: "I loved my Hydra Facial. Amazing service!", author: "Sarah K." },
  { text: "Professional staff and beautiful environment.", author: "Ayesha M." },
  { text: "My favorite beauty salon in Bahria Town.", author: "Fatima R." },
];

const GALLERY = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/gallery-5.png",
  "/images/gallery-6.png",
];

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Scroll handler for nav & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Gallery", id: "gallery" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button 
            onClick={() => scrollTo("home")} 
            className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
          >
            Forever Young
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollTo(link.id)}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wide"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => window.location.href = "tel:03299055551"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6"
            >
              0329-9055551
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border overflow-hidden"
            >
              <ul className="flex flex-col py-4 px-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollTo(link.id)}
                      className="w-full text-left py-3 text-lg font-medium border-b border-border/50 text-foreground"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
                <li className="pt-4">
                  <Button 
                    onClick={() => window.location.href = "tel:03299055551"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    Call Now: 0329-9055551
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero.png" 
              alt="Luxury beauty salon interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-tight drop-shadow-md">
                Reveal Your <br/> Timeless Beauty
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light drop-shadow">
                Professional Aesthetic & Beauty Treatments in Bahria Town, Lahore.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollTo("contact")}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-8 py-6 text-lg transition-transform hover:scale-105"
                >
                  Book Appointment
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "tel:03299055551"}
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-medium rounded-full px-8 py-6 text-lg backdrop-blur-sm transition-transform hover:scale-105"
                >
                  Call Now: 0329-9055551
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-white/70 text-sm tracking-widest uppercase">Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-12 bg-primary"
            />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 bg-background overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="w-full lg:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/30 rounded-[2rem] transform -rotate-3" />
                  <img 
                    src="/images/about.png" 
                    alt="Elegant beauty studio" 
                    className="relative w-full aspect-[3/4] object-cover rounded-[2rem] shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white text-center p-4 shadow-lg">
                    <p className="font-serif font-bold leading-tight">Premium<br/>Care</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="w-full lg:w-1/2"
              >
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                  About <span className="text-primary">Forever Young</span>
                </h2>
                <div className="w-24 h-1 bg-primary mb-8 rounded-full" />
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Welcome to Forever Young Aesthetic & Beauty Studio, where beauty meets confidence. We specialize in professional aesthetic and beauty treatments designed to help you look and feel your best.
                </p>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Our experienced team uses modern techniques and high-quality products in a relaxing, luxurious environment. Whether you're preparing for a special occasion or seeking routine self-care, we provide a sanctuary for your transformation.
                </p>
                <Button 
                  onClick={() => scrollTo("services")}
                  variant="outline" 
                  className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Explore Our Services
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Our Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground text-lg">
                Discover our comprehensive range of premium beauty and aesthetic treatments tailored to your unique needs.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            >
              {SERVICES.map((service, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="group border-none bg-card hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden relative rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Why Choose Us</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="mb-6 p-4 rounded-full bg-accent/50">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-3">{feature.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Our Gallery</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {GALLERY.map((src, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => setActiveImage(src)}
                >
                  <img 
                    src={src} 
                    alt={`Gallery image ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Sparkles className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {activeImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setActiveImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
                onClick={() => setActiveImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={activeImage} 
                alt="Enlarged gallery view" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">What Our Clients Say</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  <Card className="h-full bg-accent/20 border-none rounded-[2rem] shadow-sm relative pt-8 px-6 pb-8">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <CardContent className="p-0 text-center flex flex-col h-full">
                      <div className="flex justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-lg italic mb-6 flex-grow">"{testimonial.text}"</p>
                      <p className="font-serif font-bold text-foreground">— {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Get In Touch</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-serif text-2xl mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a href="tel:03299055551" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                          0329-9055551
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Address</p>
                        <p className="text-muted-foreground text-lg">
                          959P+QM, Bahria Town,<br/>Lahore, Pakistan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md h-64 relative">
                  <iframe 
                    src="https://maps.google.com/maps?q=959P%2BQM%2C+Bahria+Town%2C+Lahore%2C+Pakistan&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Forever Young Location"
                    className="absolute inset-0"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8 md:p-10">
                    <h3 className="font-serif text-2xl mb-8">Send Us a Message</h3>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input id="name" placeholder="Enter your name" className="bg-secondary/50 border-transparent focus-visible:ring-primary h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" className="bg-secondary/50 border-transparent focus-visible:ring-primary h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message (Optional)</label>
                        <Textarea id="message" placeholder="How can we help you?" className="bg-secondary/50 border-transparent focus-visible:ring-primary min-h-[120px] rounded-xl resize-none" />
                      </div>
                      <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl mt-4">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white/80 py-16 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold text-primary mb-2">Forever Young</h2>
              <p className="text-white/60">Aesthetic & Beauty Studio</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
              <div>
                <p className="font-medium text-white mb-2">Contact</p>
                <a href="tel:03299055551" className="hover:text-primary transition-colors">0329-9055551</a>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Location</p>
                <p>959P+QM, Bahria Town, Lahore</p>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10 mb-8" />
          <div className="text-center text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Forever Young Aesthetic & Beauty Studio. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <a 
        href="https://wa.me/923299055551" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
        <Phone className="w-6 h-6 relative z-10" />
      </a>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => scrollTo("home")}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors border border-border"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}