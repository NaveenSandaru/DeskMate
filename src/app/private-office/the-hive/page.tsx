import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { spaces } from '@/lib/data';

const features = [
    "High-speed Wi-Fi",
    "Ergonomic desks and chairs",
    "Natural-light interiors with modern décor",
    "Complimentary coffee, tea, and water",
    "Dedicated parking space",
    "Professional setting ideal for small teams"
];

const theHiveSpace = spaces.find(space => space.id === 'modern-private-office');

export default function TheHivePage() {
  if (!theHiveSpace) {
    return <div>Space not found</div>;
  }
  
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={theHiveSpace.images[0]}
            alt="The Hive"
            fill
            className="object-cover"
            data-ai-hint="vibrant office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            The <span className="text-primary">Hive.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / 
            <Link href="/private-office" className="hover:underline">Private Office</Link> / 
            <span> The Hive</span>
          </p>
        </div>
      </section>

       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className='mb-12'>
                <h2 className="font-headline text-3xl font-bold mb-4">
                    Workspaces That Spark Creativity & Growth
                </h2>
                <p className="text-muted-foreground mb-4">
                    Step into The Hive, a vibrant private office designed for teams that thrive on energy and inspiration. Whether you’re a small startup, a creative duo, or a growing business, this dedicated office space combines privacy with a dynamic atmosphere that fuels both focus and collaboration.
                </p>
                <p className="text-muted-foreground">
                    With bright interiors, ergonomic design, and a professional yet modern vibe, The Hive offers the perfect balance of comfort and productivity — an office you’ll look forward to working in every day.
                </p>
            </div>
            
            <div className="mb-12">
                <h3 className="font-headline text-2xl font-bold mb-6">Features & Amenities</h3>
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-12">
                <p className="text-muted-foreground mb-6">
                    The Hive is the ideal choice for entrepreneurs and small teams who want a private office that inspires creativity, drives productivity, and reflects a forward-thinking work culture.
                </p>
                <Button size="lg">
                    Get Quote
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
