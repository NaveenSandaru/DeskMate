'use client';

import { useRef } from 'react';
import { spaces } from '@/lib/data';
import SpaceCard from '@/components/spaces/space-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, Briefcase, Lightbulb, Users, Wifi, PersonStanding, MonitorSpeaker, Coffee, Mic, ParkingCircle, Utensils, HelpCircle, Phone, Mail, MapPin, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CallbackForm from '@/components/contact/callback-form';


const perks = [
  {
    icon: <Wifi className="h-10 w-10 text-primary" />,
    name: 'High-Speed Wi-Fi',
    description: 'Blazing fast internet to keep you productive.',
  },
  {
    icon: <PersonStanding className="h-10 w-10 text-primary" />,
    name: 'Dedicated Desks',
    description: 'Your own personal space in our vibrant community.',
  },
  {
    icon: <MonitorSpeaker className="h-10 w-10 text-primary" />,
    name: 'Meeting Room',
    description: 'Confidential, professional rooms for your meetings.',
  },
  {
    icon: <Coffee className="h-10 w-10 text-primary" />,
    name: 'Coffee Bar',
    description: 'Unlimited premium coffee to fuel your day.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    name: 'Studio Space',
    description: 'Equipped for your podcasting and recording needs.',
  },
  {
    icon: <ParkingCircle className="h-10 w-10 text-primary" />,
    name: 'Secure Parking',
    description: 'Convenient and safe parking for your vehicle.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    name: 'Outdoor desk',
    description: 'A breath of fresh air for breaks and informal meetings.',
  },
  {
    icon: <Utensils className="h-10 w-10 text-primary" />,
    name: 'Pantry',
    description: 'Fully stocked pantry with snacks and refreshments.',
  },
];

const faqs = [
    {
        question: "What types of workspaces do you offer?",
        answer: "We provide hot desks, huddle pods, fully equipped meeting rooms. Our spaces are designed to suit both individual work and team collaborations."
    },
    {
        question: "Do you provide a pantry area for members?",
        answer: "Yes, our coworking space includes a fully equipped pantry area with basic facilities such as a refrigerator, microwave, water dispenser, and tea/coffee-making options. It’s designed to give you a convenient spot to refresh and recharge during your workday."
    },
    {
        question: "Is there high-speed Wi-Fi available?",
        answer: "Absolutely. All our spaces are equipped with high-speed, reliable Wi-Fi to ensure you stay connected and productive throughout your day."
    },
    {
        question: "Is there parking available?",
        answer: "Yes, we offer secure on-site parking for our members. Availability may vary, so we recommend checking in advance if you require a parking spot."
    },
    {
        question: "Are the meeting rooms equipped with screens?",
        answer: "Yes, our meeting rooms are equipped with large, high-definition screens and other presentation tools to make your meetings seamless and professional."
    }
];

export default function Home() {
  const spacesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToSpaces = () => {
    spacesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://img.freepik.com/free-photo/studio-arrangement-work_23-2151976865.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Inspiring workspace"
            fill
            className="object-cover"
            data-ai-hint="inspiring workspace"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 p-4 animate-fade-in-up">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Find Your Perfect Workspace
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
            Discover and book unique co-working spaces and meeting rooms on-demand. No subscriptions, no hassles.
          </p>
          <Button size="lg" onClick={handleScrollToSpaces}>
            Explore Spaces <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section ref={spacesRef} className="py-16 bg-secondary w-full">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-headline text-5xl font-bold tracking-tight text-left">
              Find the Perfect
              <br />
              Workspace for You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map(space => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-20 bg-background w-full">
        <div className="container mx-auto px-4 text-center max-w-4xl mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">About DeskMate</h2>
          <p className="text-lg text-muted-foreground">
            We are revolutionizing the way professionals find and book workspaces. Our mission is to provide flexible, on-demand spaces that inspire productivity and foster collaboration.
          </p>
        </div>

        <div className="relative h-96">
          <Image
            src="https://img.freepik.com/premium-photo/modern-coworking-office-interior-with-panoramic-city-view-furniture-wooden-flooring-3d-rendering_670147-81067.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Modern coworking office with city view"
            fill
            className="object-cover"
            data-ai-hint="coworking office"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h3 className="font-headline text-5xl font-bold text-white text-center p-4 max-w-4xl">Your next great idea starts here.</h3>
          </div>
        </div>

        <div className="bg-card py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 text-center mb-20">
                  <div className="flex flex-col items-center">
                    <Target className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-headline text-2xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">To empower individuals and teams by providing seamless access to inspiring and productive work environments, anywhere, anytime.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Lightbulb className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-headline text-2xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">To be the leading platform for flexible workspace solutions, fostering a global community of innovators and creators.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-headline text-2xl font-semibold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">We value flexibility, community, quality, and innovation, ensuring a premium experience for all our users.</p>
                  </div>
                </div>
            </div>
        </div>
        <div className="bg-secondary w-full py-20">
          <div className="container mx-auto px-4">
              <h2 className="font-headline text-4xl font-bold text-center mb-2">Perks of our coworking spaces</h2>
              <p className="text-primary text-center mb-12">Amenities Showcase</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {perks.map((perk, index) => (
                  <Card key={index} className="text-center p-6 flex flex-col items-center justify-center bg-background shadow-lg hover:shadow-xl transition-shadow rounded-lg">
                    {perk.icon}
                    <h4 className="font-semibold text-lg mt-4">{perk.name}</h4>
                  </Card>
                ))}
              </div>
            </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/retina-wood.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="space-y-4 text-center md:text-left max-w-md">
              <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
                Building Connections,
                <br />
                Inspiring Success.
              </h2>
            </div>
            <div className='w-full max-w-sm'>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="https://img.freepik.com/free-photo/authentic-small-youthful-marketing-agency_23-2150167428.jpg"
                      alt="A group of colleagues collaborating in an office"
                      fill
                      className="object-cover"
                      data-ai-hint="team collaboration"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-center text-lg text-gray-300">
                      Fostering a Like-Minded Community
                      <br />
                      Empowering Entrepreneurs, Freelancers & Innovators
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[550px] rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="https://img.freepik.com/premium-photo/man-thinking-virtual-assistant-networking-office-technical-support-operator-hotline-male-person-plan-telemarketing-professional-faq-insurance-call-centre-service_590464-422272.jpg"
                alt="Man thinking with a headset on in an office"
                fill
                className="object-cover"
                data-ai-hint="thinking support"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline text-4xl font-bold mb-2">
                  Still have questions?
                </h3>
                <p className="text-lg text-green-300">We're here to help, reach out to us anytime!</p>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <div className='flex items-center gap-3 mb-2'>
                    <HelpCircle className="h-8 w-8 text-primary" />
                    <p className="text-primary font-semibold">Questions Answered</p>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Everything You Need to Know</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-800 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-green-400 font-semibold">Contact Us</p>
              </div>
              <h2 className="font-headline text-5xl font-bold">Get in Touch.</h2>
              <p className="text-lg text-gray-300">Unlock smarter workdays. Book your workplace at DeskMate and discover the future of coworking today</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-gray-300">+94 77 867 3863</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <p className="text-gray-300">info@globalpearlventures.com</p>                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-300">1st Floor 541/10A Suhada Pedesa,Ruhunupura</p>
                    <p className="text-gray-300">Thalawathugoda</p>
                    <p className="text-gray-300">Sri Lanka 10116</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Opening Hours</h3>
                    <p className="text-gray-300">MON - FRI: 8.30 AM - 6PM</p>
                    <p className="text-gray-300">SAT, SUN & HOLIDAYS: CLOSED</p>
                  </div>
                </div>
              </div>
            </div>
            
            <CallbackForm />
          </div>
        </div>
      </section>

      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7922.274374079144!2d79.9291104!3d6.8741615!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTInMjguOSJOIDc5wrA1NSc1My4wIkU!5e0!3m2!1sen!2slk!4v1757057465787!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DeskMate Location"
        ></iframe>
      </section>
    </>
  );
}
