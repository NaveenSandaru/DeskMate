import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { spaces } from '@/lib/data';

const features = [
    "High-speed Wi-Fi",
    "Spacious conference table with ergonomic chairs",
    "Large HD display screen",
    "Complimentary coffee, tea, and water",
    "On-site technical support for smooth setup",
    "Writeable glass walls with markers for brainstorming"
];

const meetingRoomSpace = spaces.find(space => space.id === 'collaborate-hub-room');

export default function MeetingRoomPage() {
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={meetingRoomSpace?.images[0] || "https://picsum.photos/1600/900?random=21"}
            alt="Meeting room"
            fill
            className="object-cover"
            data-ai-hint="blurry office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Meeting <span className="text-primary">Rooms.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / <span>Meeting Rooms</span>
          </p>
        </div>
      </section>
       <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className='mb-12'>
                <h2 className="font-headline text-3xl font-bold mb-4">
                    Spaces That Inspire Collaboration & Confidence
                </h2>
                <p className="text-muted-foreground mb-4">
                    Make the right impression with our fully equipped meeting rooms at DeskMate. Whether you’re pitching to clients, hosting a team strategy session, or conducting a virtual conference, our professional spaces are designed to elevate your meetings beyond the ordinary.
                </p>
                <p className="text-muted-foreground">
                    Created to encourage both productivity and creativity, each room combines modern technology, ergonomic comfort, and a professional atmosphere — perfect for everything from workshops to high-stakes presentations.
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
                    Our meeting rooms are the go-to choice for entrepreneurs, consultants, and corporate teams who want to collaborate effectively, showcase ideas, and leave a lasting impression.
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
