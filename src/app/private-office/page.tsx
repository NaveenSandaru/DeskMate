import Image from 'next/image';
import Link from 'next/link';
import { spaces } from '@/lib/data';
import SpaceCard from '@/components/spaces/space-card';

const privateOffices = spaces.filter(space => space.type === 'private_office');

export default function PrivateOfficePage() {
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/free-photo/3d-rendering-business-meeting-working-room-office-building_105762-1992.jpg"
            alt="Modern private offices"
            fill
            className="object-cover"
            data-ai-hint="modern office"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold">
            Private <span className="text-primary">Offices.</span>
          </h1>
          <p className="mt-4 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / <span>Private Offices</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className='mb-12 text-center'>
                <h2 className="font-headline text-3xl font-bold mb-4">
                    Secure, Professional, and Ready for Your Team
                </h2>
                <p className="text-muted-foreground mx-auto max-w-3xl">
                  Our private offices offer the perfect blend of privacy and community. Designed for teams of all sizes, these spaces provide a secure, dedicated environment where you can focus and collaborate effectively. Enjoy all the amenities of our coworking space while having a place to call your own.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {privateOffices.map(space => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
