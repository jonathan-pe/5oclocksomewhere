import type { City, CityTime, Cocktail } from '../types';

export function getCurrentTimeInTimezone(timezone: string): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function isEvening(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 17 || hour < 6; // 5 PM to 6 AM
}

export function getTimeUntilFiveOClock(date: Date): number {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  
  // If it's already past 5 PM, calculate time until 5 PM next day
  if (currentHour >= 17) {
    const hoursUntilMidnight = 24 - currentHour;
    const minutesUntilMidnight = 60 - currentMinute;
    return (hoursUntilMidnight + 17) * 60 + (minutesUntilMidnight - 60);
  }
  
  // Calculate time until 5 PM today
  return (17 - currentHour) * 60 + (0 - currentMinute);
}

export function getCityTime(city: City): CityTime {
  const currentTime = getCurrentTimeInTimezone(city.timezone);
  const formattedTime = formatTime(currentTime);
  const evening = isEvening(currentTime);
  
  return {
    city,
    currentTime,
    formattedTime,
    isEvening: evening
  };
}

export async function fetchRandomCocktail(): Promise<Cocktail | null> {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.drinks?.[0] || null;
  } catch (error) {
    console.error('Error fetching cocktail:', error);
    return null;
  }
}

export async function fetchCocktailByName(name: string): Promise<Cocktail | null> {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`);
    const data = await response.json();
    return data.drinks?.[0] || null;
  } catch (error) {
    console.error('Error fetching cocktail by name:', error);
    return null;
  }
}

export async function getSuggestedCocktail(city: City, _currentTime: Date): Promise<Cocktail | null> {
  // Define cocktails based on culture and time of day
  const cocktailSuggestions: Record<string, string[]> = {
    'USA': ['Manhattan', 'Old Fashioned', 'Margarita', 'Mojito'],
    'UK': ['Gin and Tonic', 'Whiskey Sour', 'Pimms', 'Dark and Stormy'],
    'Japan': ['Sake Martini', 'Whiskey Highball', 'Plum Wine', 'Sake'],
    'Australia': ['Espresso Martini', 'Dark and Stormy', 'Australian Beer', 'Wine Spritzer'],
    'France': ['French 75', 'Kir Royale', 'Sidecar', 'Champagne Cocktail'],
    'UAE': ['Virgin Mojito', 'Fruit Punch', 'Lemonade', 'Iced Tea'], // Non-alcoholic options
    'Brazil': ['Caipirinha', 'Batida', 'Guarana', 'Passion Fruit Martini'],
    'India': ['Mango Lassi', 'Spiced Tea', 'Fruit Juice', 'Thandai'],
    'Singapore': ['Singapore Sling', 'Gin Sling', 'Tropical Punch', 'Lychee Martini'],
    'Mexico': ['Margarita', 'Paloma', 'Michelada', 'Tequila Sunrise'],
    'Egypt': ['Turkish Coffee', 'Mint Tea', 'Fresh Juice', 'Hibiscus Tea']
  };
  
  const suggestions = cocktailSuggestions[city.country] || ['Mojito', 'Gin and Tonic'];
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  
  return await fetchCocktailByName(randomSuggestion);
}
