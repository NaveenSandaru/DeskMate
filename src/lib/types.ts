export type Amenity =
  | 'wifi'
  | 'coffee'
  | 'printing'
  | 'kitchen'
  | 'parking'
  | 'whiteboard';

export type SpaceType = 'hot_desk' | 'private_office' | 'meeting_room' | 'huddle_pods' | 'dedicated_desk';

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  amenities: Amenity[];
  images: string[];
  pricing: {
    hourly: number;
    daily: number;
    weekly?: number;
    monthly?: number;
  };
  type: SpaceType;
}
