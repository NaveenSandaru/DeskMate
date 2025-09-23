import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { spaces } from '@/lib/data';

const features = [
    "High-speed Wi-Fi",
    "Ergonomic desks and chairs",
    "Abundant natural light for a vibrant work atmosphere",
    "Complimentary coffee, tea, and water",
    "Dedicated parking space",
    "Private office ideal for individuals or small teams"
];

const sunlightStudioSpace = spaces.find(space => space.id === 'sunlight-studio');

export default function SunlightStudioPage() {
  if (!sunlightStudioSpace) {
    return <div>Space not found</div>;
  }
  
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={sunlightStudioSpace.images[0]}
            alt="Sunlight Studio"
            fill
            className="object-cover"
            data-ai-hint="bright office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Sunlight <span className="text-primary">Studio.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / 
            <Link href="/private-office" className="hover:underline">Private Office</Link> / 
            <span> Sunlight Studio</span>
          </p>
        </div>
      </section>

       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className='mb-12'>
                <h2 className="font-headline text-3xl font-bold mb-4">
                    Bright, Inspiring Spaces for Focused Work
                </h2>
                <p className="text-muted-foreground mb-4">
                    Step into Sunlight Studio, a private office designed to energize and inspire. Bathed in natural light, this airy workspace combines comfort and functionality, providing the perfect setting for individuals or small teams who value focus and creativity.
                </p>
                <p className="text-muted-foreground">
                    Featuring modern, ergonomic furniture and dedicated facilities, Sunlight Studio ensures you can work efficiently while enjoying a professional yet refreshing environment.
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
                    Sunlight Studio is perfect for professionals and teams looking for a bright, motivating space that supports productivity, creativity, and well-being.
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