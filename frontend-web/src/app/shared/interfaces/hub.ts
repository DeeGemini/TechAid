export interface Hub {
    id: string;
    name?: string;
    location: string;
    latitude: number;
    longitude: number;
    type: 'hotspot' | 'device_hub';
    cost?: number; // For hotspots
    // Add other relevant properties
  }