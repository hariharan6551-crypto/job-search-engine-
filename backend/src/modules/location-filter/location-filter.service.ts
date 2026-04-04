import { Injectable } from '@nestjs/common';

interface CityInfo {
  name: string;
  state: string;
  lat: number;
  lng: number;
  priority: number;
}

@Injectable()
export class LocationFilterService {
  private readonly priorityCities: CityInfo[] = [
    { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, priority: 1 },
    { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, priority: 1 },
    { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946, priority: 1 },
    { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673, priority: 1 },
    { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lng: 76.9366, priority: 2 },
    { name: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867, priority: 2 },
    { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, priority: 2 },
    { name: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.146, priority: 3 },
    { name: 'Trichy', state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047, priority: 3 },
    { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lng: 76.6394, priority: 3 },
  ];

  async findNearbyJobs(lat: number, lng: number, radiusKm: number) {
    // Calculate distance using Haversine formula
    const nearbyCities = this.priorityCities
      .map((city) => ({
        ...city,
        distance: this.calculateDistance(lat, lng, city.lat, city.lng),
      }))
      .filter((city) => city.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    return {
      searchLocation: { lat, lng },
      radiusKm,
      nearbyCities,
      message: `Found ${nearbyCities.length} cities within ${radiusKm}km`,
    };
  }

  async getSupportedCities() {
    return {
      cities: this.priorityCities.sort((a, b) => a.priority - b.priority),
      total: this.priorityCities.length,
    };
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  calculateLocationScore(userLat: number, userLng: number, jobLat: number, jobLng: number): number {
    const distance = this.calculateDistance(userLat, userLng, jobLat, jobLng);
    if (distance <= 10) return 100;
    if (distance <= 25) return 90;
    if (distance <= 50) return 75;
    if (distance <= 100) return 60;
    if (distance <= 200) return 40;
    return 20;
  }
}
