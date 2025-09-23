import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Space } from '@/lib/types';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpaceCardProps {
  space: Space;
}

const typeLabels: Record<Space['type'], string> = {
  hot_desk: 'Hot Desk',
  private_office: 'Private Office',
  meeting_room: 'Meeting Room',
  huddle_pods: 'Huddle Pods',
  dedicated_desk: 'Dedicated Desk',
};

const typeLinks: Record<string, string> = {
    'sunlight-studio': '/private-office/sunlight-studio',
    'modern-private-office': '/private-office/the-hive',
    'urban-oasis-desk': '/hot-desk',
    'huddle-pods': '/huddle-pods',
    'collaborate-hub-room': '/meeting-room',
    'quiet-corner-desk': '/dedicated-desk',
};

export default function SpaceCard({ space }: SpaceCardProps) {
  const link = typeLinks[space.id] || `/spaces/${space.id}`;
  
  const getPrice = () => {
    if (space.pricing.monthly) {
        return `LKR ${space.pricing.monthly.toLocaleString()}/month`;
    }
    if (space.pricing.daily) {
        return `LKR ${space.pricing.daily.toLocaleString()}/day`;
    }
    if (space.pricing.hourly) {
        return `LKR ${space.pricing.hourly.toLocaleString()}/hr`;
    }
    return 'N/A';
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-56 w-full">
        <Image
          src={space.images[0]}
          alt={space.name}
          fill
          className="object-cover"
          data-ai-hint="office interior"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <CardTitle className="font-headline text-xl">{space.name}</CardTitle>
            <Badge variant="secondary">{typeLabels[space.type]}</Badge>
        </div>
        <CardDescription className="line-clamp-2 h-[3rem]">{space.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Up to {space.capacity} {space.capacity > 1 ? 'people' : 'person'}</span>
            </div>
            <p className="font-semibold text-foreground text-lg">
                {getPrice()}
            </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={link}>
            View & Book <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
