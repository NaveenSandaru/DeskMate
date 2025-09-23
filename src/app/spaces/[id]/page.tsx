import Image from 'next/image';
import { notFound } from 'next/navigation';
import { spaces } from '@/lib/data';
import AmenityIcon from '@/components/spaces/amenity-icon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import BookingForm from '@/components/booking/booking-form';

interface SpaceDetailsPageProps {
    params: { id: string };
}

const typeLabels = {
    hot_desk: 'Hot Desk',
    private_office: 'Private Office',
    meeting_room: 'Meeting Room',
    huddle_pods: 'Huddle Pods',
    dedicated_desk: 'Dedicated Desk',
};

export default async function SpaceDetailsPage({ params }: SpaceDetailsPageProps) {
    const space = spaces.find(s => s.id === params.id);

    if (!space) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <div className="mb-8">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                            <h1 className="font-headline text-4xl font-bold">{space.name}</h1>
                            <Badge variant="secondary" className="text-base px-4 py-2">{typeLabels[space.type]}</Badge>
                        </div>
                        <p className="text-lg text-muted-foreground">{space.description}</p>
                    </div>

                    <Carousel className="w-full rounded-lg overflow-hidden shadow-lg border">
                        <CarouselContent>
                            {space.images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-video">
                                        <Image
                                            src={img}
                                            alt={`${space.name} image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            data-ai-hint="office workspace"
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>

                    <Separator className="my-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader><CardTitle className="font-headline">Amenities</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {space.amenities.map(amenity => (
                                    <AmenityIcon key={amenity} amenity={amenity} />
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-headline">Details & Pricing</CardTitle></CardHeader>
                            <CardContent className="space-y-2 text-muted-foreground">
                                <p><strong>Capacity:</strong> Up to {space.capacity} {space.capacity > 1 ? 'people' : 'person'}</p>
                                {Object.entries(space.pricing).map(([key, value]) => value && (
                                    <p key={key} className="capitalize"><strong>{key}:</strong> <span className="font-semibold text-foreground">${value}</span></p>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        <BookingForm space={space} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return spaces.map(space => ({
        id: space.id,
    }));
}
