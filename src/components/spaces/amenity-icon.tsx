import type { Amenity } from '@/lib/types';
import { Wifi, Coffee, Printer, Refrigerator, ParkingSquare, Presentation } from 'lucide-react';

interface AmenityIconProps {
  amenity: Amenity;
  className?: string;
}

const amenityMap = {
  wifi: { icon: Wifi, label: 'Wi-Fi' },
  coffee: { icon: Coffee, label: 'Coffee' },
  printing: { icon: Printer, label: 'Printing' },
  kitchen: { icon: Refrigerator, label: 'Kitchen' },
  parking: { icon: ParkingSquare, label: 'Parking' },
  whiteboard: { icon: Presentation, label: 'Whiteboard' },
};

export default function AmenityIcon({ amenity, className }: AmenityIconProps) {
  const { icon: Icon, label } = amenityMap[amenity];
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className={className || 'h-5 w-5 text-primary'} />
      <span>{label}</span>
    </div>
  );
}
