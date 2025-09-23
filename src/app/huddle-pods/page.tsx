import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { spaces } from '@/lib/data';

const features = [
    "High-speed internet for seamless collaboration",
    "Complimentary coffee, tea, and water",
    "Ergonomic desks and chairs for comfort",
    "A professional setting in the heart of Thalawathugoda, Colombo"
];

const huddlePodsSpace = spaces.find(space => space.id === 'huddle-pods');

export default function HuddlePodsPage() {
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={huddlePodsSpace?.images[0] || "https://picsum.photos/1600/900?random=22"}
            alt="Huddle pods"
            fill
            className="object-cover"
            data-ai-hint="blurry office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Huddle <span className="text-primary">Pods.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / <span>Huddle Pods</span>
          </p>
        </div>
      </section>
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className='mb-12'>
              <h2 className="font-headline text-3xl font-bold mb-4">
                Compact Collaboration Spaces for Agile Teams
              </h2>
              <p className="text-muted-foreground mb-4">
                Bring your team together in style with our Huddle Pods — thoughtfully designed micro-workspaces for small groups, startups, and consultants. Whether you’re brainstorming fresh ideas, aligning on strategy, or holding a quick private discussion, these semi-enclosed pods provide the right balance of focus and connection within our dynamic coworking space.
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
                Positioned in one of Colombo’s most prestigious business hubs, our huddle pods are the perfect solution for teams that need flexibility, privacy, and a productive setting without the overhead of a full office.
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
