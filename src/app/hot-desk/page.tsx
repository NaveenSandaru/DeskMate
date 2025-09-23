import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { spaces } from '@/lib/data';

const features = [
    "Reliable high-speed Wi-Fi",
    "Complimentary tea, coffee, and water",
    "Comfortable desks and chairs built for productivity",
    "A professional setting in the heart of Thalawathugoda, Colombo"
];

const hotDeskSpace = spaces.find(space => space.id === 'urban-oasis-desk');

export default function HotDeskPage() {
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={hotDeskSpace?.images[0] || "https://picsum.photos/1600/900?random=14"}
            alt="Hot desk area"
            fill
            className="object-cover"
            data-ai-hint="blurry office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Hot <span className="text-primary">Desk.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / <span>Hot Desk</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className='mb-12'>
                <h2 className="font-headline text-3xl font-bold mb-4">
                Perfect Spaces for Productive Meetings Flexible, Modern Workspaces for Digital Nomads and Solo Professionals
                </h2>
                <p className="text-muted-foreground mb-4">
                Step into a flexible, modern environment designed for independent professionals at DeskMate. Our hot desk options are perfect for freelancers, consultants, digital nomads, or anyone who needs a productive place to work without long-term commitments.
                </p>
                <p className="text-muted-foreground mb-4">
                Enjoy plug-and-play convenience with fast internet, ergonomic workstations, and a welcoming community that encourages both focus and collaboration.
                </p>
                <p className="text-muted-foreground">
                Whether you need a few hours or a full day of focused work, our vibrant coworking environment in Colombo, Sri Lanka empowers your productivity and fosters valuable networking opportunities.
                </p>
            </div>
            
            <div className="mb-12">
                <h3 className="font-headline text-2xl font-bold mb-6">Why Choose Our Hot Desks?</h3>
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
                Our hot desks are ideally suited for solo professionals who value a dynamic, community-driven environment. Choose from flexible access options, including day passes, monthly subscriptions, and tailored flex packages to suit your business needs.
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
