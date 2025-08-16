import type { City } from '../types'

export const CITIES: City[] = [
  // North America
  {
    name: 'New York',
    timezone: 'America/New_York',
    country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    name: 'Los Angeles',
    timezone: 'America/Los_Angeles',
    country: 'USA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    name: 'Chicago',
    timezone: 'America/Chicago',
    country: 'USA',
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    name: 'Miami',
    timezone: 'America/New_York',
    country: 'USA',
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    name: 'Toronto',
    timezone: 'America/Toronto',
    country: 'Canada',
    coordinates: { lat: 43.6532, lng: -79.3832 },
  },
  {
    name: 'Vancouver',
    timezone: 'America/Vancouver',
    country: 'Canada',
    coordinates: { lat: 49.2827, lng: -123.1207 },
  },
  {
    name: 'Mexico City',
    timezone: 'America/Mexico_City',
    country: 'Mexico',
    coordinates: { lat: 19.4326, lng: -99.1332 },
  },
  {
    name: 'Cancún',
    timezone: 'America/Cancun',
    country: 'Mexico',
    coordinates: { lat: 21.1619, lng: -86.8515 },
  },

  // South America
  {
    name: 'São Paulo',
    timezone: 'America/Sao_Paulo',
    country: 'Brazil',
    coordinates: { lat: -23.5505, lng: -46.6333 },
  },
  {
    name: 'Rio de Janeiro',
    timezone: 'America/Sao_Paulo',
    country: 'Brazil',
    coordinates: { lat: -22.9068, lng: -43.1729 },
  },
  {
    name: 'Buenos Aires',
    timezone: 'America/Argentina/Buenos_Aires',
    country: 'Argentina',
    coordinates: { lat: -34.6037, lng: -58.3816 },
  },
  {
    name: 'Lima',
    timezone: 'America/Lima',
    country: 'Peru',
    coordinates: { lat: -12.0464, lng: -77.0428 },
  },
  {
    name: 'Bogotá',
    timezone: 'America/Bogota',
    country: 'Colombia',
    coordinates: { lat: 4.711, lng: -74.0721 },
  },

  // Europe
  {
    name: 'London',
    timezone: 'Europe/London',
    country: 'UK',
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    name: 'Paris',
    timezone: 'Europe/Paris',
    country: 'France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    name: 'Berlin',
    timezone: 'Europe/Berlin',
    country: 'Germany',
    coordinates: { lat: 52.52, lng: 13.405 },
  },
  {
    name: 'Rome',
    timezone: 'Europe/Rome',
    country: 'Italy',
    coordinates: { lat: 41.9028, lng: 12.4964 },
  },
  {
    name: 'Madrid',
    timezone: 'Europe/Madrid',
    country: 'Spain',
    coordinates: { lat: 40.4168, lng: -3.7038 },
  },
  {
    name: 'Amsterdam',
    timezone: 'Europe/Amsterdam',
    country: 'Netherlands',
    coordinates: { lat: 52.3676, lng: 4.9041 },
  },
  {
    name: 'Stockholm',
    timezone: 'Europe/Stockholm',
    country: 'Sweden',
    coordinates: { lat: 59.3293, lng: 18.0686 },
  },
  {
    name: 'Prague',
    timezone: 'Europe/Prague',
    country: 'Czech Republic',
    coordinates: { lat: 50.0755, lng: 14.4378 },
  },
  {
    name: 'Dublin',
    timezone: 'Europe/Dublin',
    country: 'Ireland',
    coordinates: { lat: 53.3498, lng: -6.2603 },
  },
  {
    name: 'Vienna',
    timezone: 'Europe/Vienna',
    country: 'Austria',
    coordinates: { lat: 48.2082, lng: 16.3738 },
  },

  // Asia
  {
    name: 'Tokyo',
    timezone: 'Asia/Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    name: 'Seoul',
    timezone: 'Asia/Seoul',
    country: 'South Korea',
    coordinates: { lat: 37.5665, lng: 126.978 },
  },
  {
    name: 'Beijing',
    timezone: 'Asia/Shanghai',
    country: 'China',
    coordinates: { lat: 39.9042, lng: 116.4074 },
  },
  {
    name: 'Shanghai',
    timezone: 'Asia/Shanghai',
    country: 'China',
    coordinates: { lat: 31.2304, lng: 121.4737 },
  },
  {
    name: 'Hong Kong',
    timezone: 'Asia/Hong_Kong',
    country: 'Hong Kong',
    coordinates: { lat: 22.3193, lng: 114.1694 },
  },
  {
    name: 'Singapore',
    timezone: 'Asia/Singapore',
    country: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  {
    name: 'Bangkok',
    timezone: 'Asia/Bangkok',
    country: 'Thailand',
    coordinates: { lat: 13.7563, lng: 100.5018 },
  },
  {
    name: 'Mumbai',
    timezone: 'Asia/Kolkata',
    country: 'India',
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  {
    name: 'New Delhi',
    timezone: 'Asia/Kolkata',
    country: 'India',
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
  {
    name: 'Dubai',
    timezone: 'Asia/Dubai',
    country: 'UAE',
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    name: 'Tel Aviv',
    timezone: 'Asia/Jerusalem',
    country: 'Israel',
    coordinates: { lat: 32.0853, lng: 34.7818 },
  },
  {
    name: 'Istanbul',
    timezone: 'Europe/Istanbul',
    country: 'Turkey',
    coordinates: { lat: 41.0082, lng: 28.9784 },
  },

  // Africa
  {
    name: 'Cairo',
    timezone: 'Africa/Cairo',
    country: 'Egypt',
    coordinates: { lat: 30.0444, lng: 31.2357 },
  },
  {
    name: 'Cape Town',
    timezone: 'Africa/Johannesburg',
    country: 'South Africa',
    coordinates: { lat: -33.9249, lng: 18.4241 },
  },
  {
    name: 'Lagos',
    timezone: 'Africa/Lagos',
    country: 'Nigeria',
    coordinates: { lat: 6.5244, lng: 3.3792 },
  },
  {
    name: 'Casablanca',
    timezone: 'Africa/Casablanca',
    country: 'Morocco',
    coordinates: { lat: 33.5731, lng: -7.5898 },
  },
  {
    name: 'Nairobi',
    timezone: 'Africa/Nairobi',
    country: 'Kenya',
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },

  // Oceania
  {
    name: 'Sydney',
    timezone: 'Australia/Sydney',
    country: 'Australia',
    coordinates: { lat: -33.8688, lng: 151.2093 },
  },
  {
    name: 'Melbourne',
    timezone: 'Australia/Melbourne',
    country: 'Australia',
    coordinates: { lat: -37.8136, lng: 144.9631 },
  },
  {
    name: 'Perth',
    timezone: 'Australia/Perth',
    country: 'Australia',
    coordinates: { lat: -31.9505, lng: 115.8605 },
  },
  {
    name: 'Auckland',
    timezone: 'Pacific/Auckland',
    country: 'New Zealand',
    coordinates: { lat: -36.8485, lng: 174.7633 },
  },
  {
    name: 'Wellington',
    timezone: 'Pacific/Auckland',
    country: 'New Zealand',
    coordinates: { lat: -41.2865, lng: 174.7762 },
  },

  // Pacific Islands
  {
    name: 'Honolulu',
    timezone: 'Pacific/Honolulu',
    country: 'USA',
    coordinates: { lat: 21.3099, lng: -157.8581 },
  },
  {
    name: 'Fiji',
    timezone: 'Pacific/Fiji',
    country: 'Fiji',
    coordinates: { lat: -18.1248, lng: 178.4501 },
  },
  {
    name: 'Apia',
    timezone: 'Pacific/Apia',
    country: 'Samoa',
    coordinates: { lat: -13.8506, lng: -171.7513 },
  },
  {
    name: "Nuku'alofa",
    timezone: 'Pacific/Tongatapu',
    country: 'Tonga',
    coordinates: { lat: -21.1789, lng: -175.1982 },
  },
]
