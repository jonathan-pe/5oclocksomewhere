import type { City, CityTime, Cocktail } from '../types'

export function getCurrentTimeInTimezone(timezone: string): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function isFiveOClock(date: Date): boolean {
  const hour = date.getHours()
  return hour >= 17 && hour < 18 // 5 PM to 6 PM only
}

export function getTimeUntilFiveOClock(date: Date): number {
  const currentHour = date.getHours()
  const currentMinute = date.getMinutes()

  // If it's already past 5 PM, calculate time until 5 PM next day
  if (currentHour >= 17) {
    const hoursUntilMidnight = 24 - currentHour
    const minutesUntilMidnight = 60 - currentMinute
    return (hoursUntilMidnight + 17) * 60 + (minutesUntilMidnight - 60)
  }

  // Calculate time until 5 PM today
  return (17 - currentHour) * 60 + (0 - currentMinute)
}

export function getCityTime(city: City): CityTime {
  const currentTime = getCurrentTimeInTimezone(city.timezone)
  const formattedTime = formatTime(currentTime)
  const isFiveOClockTime = isFiveOClock(currentTime)

  return {
    city,
    currentTime,
    formattedTime,
    isFiveOClock: isFiveOClockTime,
  }
}

export async function fetchRandomCocktail(): Promise<Cocktail | null> {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const data = await response.json()
    return data.drinks?.[0] || null
  } catch (error) {
    console.error('Error fetching cocktail:', error)
    return null
  }
}

export async function fetchCocktailByName(name: string): Promise<Cocktail | null> {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
    const data = await response.json()
    return data.drinks?.[0] || null
  } catch (error) {
    console.error('Error fetching cocktail by name:', error)
    return null
  }
}

export async function getSuggestedCocktail(city: City, _currentTime: Date): Promise<Cocktail | null> {
  // Define cocktails based on culture, using only verified cocktails from TheCocktailDB
  const cocktailSuggestions: Record<string, string[]> = {
    // North America
    USA: ['Manhattan', 'Old Fashioned', 'Margarita', 'Mojito', 'Whiskey Sour', 'Cosmopolitan', 'Mai Tai'],
    Canada: ['Bloody Mary', 'Moscow Mule', 'Martini', 'Daiquiri', 'Tom Collins'], // Using popular classics as fallback
    Mexico: ['Margarita', 'Paloma', 'Michelada', 'Tequila Sunrise'],

    // South America
    Brazil: ['Caipirinha', 'Passion Fruit Martini'],
    Argentina: ['Aperol Spritz'],
    Peru: ['Pisco Sour'],
    Colombia: ['Mojito', 'Daiquiri', 'Piña Colada'], // Using tropical classics as fallback

    // Europe
    UK: ['Gin and Tonic', 'Whiskey Sour', 'Dark and Stormy', 'Bramble'],
    France: ['French 75', 'Kir Royale', 'Sidecar', 'Champagne Cocktail', 'French Martini', 'Boulevardier'],
    Germany: ['Martini', 'Gin Tonic', 'Black Russian'], // Using European classics as fallback
    Italy: ['Negroni', 'Aperol Spritz', 'Bellini', 'Americano'],
    Spain: ['Sangria'],
    Netherlands: ['Martini', 'Gimlet', 'Aviation'], // Using gin-based classics as fallback
    Sweden: ['Swedish Coffee'], // From the fallback list
    'Czech Republic': ['Martini', 'Moscow Mule', 'Black Russian'], // Using Eastern European appropriate classics
    Ireland: ['Irish Coffee'],
    Austria: ['Martini', 'Aviation', 'Gimlet'], // Using European classics as fallback
    Turkey: ['Martini', 'Gin Tonic', 'Tom Collins'], // Using Mediterranean appropriate classics

    // Asia
    Japan: ['Martini', 'Whiskey Sour', 'Aviation'], // Using refined classics appropriate for Japanese culture
    'South Korea': ['Martini', 'Gimlet', 'Tom Collins'], // Using clean, sophisticated classics
    China: ['Martini', 'Daiquiri', 'Tom Collins'], // Using elegant classics
    'Hong Kong': ['Martini', 'Gimlet', 'Aviation'], // Using sophisticated classics for international city
    Singapore: ['Singapore Sling', 'Gin Sling'],
    Thailand: ['Piña Colada', 'Daiquiri', 'Hurricane'], // Using tropical classics
    India: ['Gin Tonic', 'Tom Collins', 'Gimlet'], // Using British colonial era classics
    UAE: ['Fruit Punch', 'Lemonade', 'Iced Tea'], // Non-alcoholic options
    Israel: ['Martini', 'Gin Tonic', 'Tom Collins'], // Using Mediterranean appropriate classics

    // Africa
    Egypt: ['Gin Tonic', 'Tom Collins', 'Martini'], // Using colonial era appropriate classics
    'South Africa': ['Gin Tonic', 'Martini', 'Tom Collins'], // Using British colonial era classics
    Nigeria: ['Gin Tonic', 'Martini', 'Tom Collins'], // Using British colonial era classics
    Morocco: ['Gin Tonic', 'Martini', 'Tom Collins'], // Using French colonial era classics
    Kenya: ['Gin Tonic', 'Martini', 'Tom Collins'], // Using British colonial era classics

    // Oceania
    Australia: ['Espresso Martini', 'Dark and Stormy'],
    'New Zealand': ['Martini', 'Gin Tonic', 'Dark and Stormy'], // Using British heritage classics
    Fiji: ['Piña Colada', 'Hurricane', 'Bahama Mama'], // Using tropical classics
    Samoa: ['Piña Colada', 'Hurricane', 'Bahama Mama'], // Using tropical classics
    Tonga: ['Piña Colada', 'Hurricane', 'Bahama Mama'], // Using tropical classics
  }

  // Fallback classics that are verified to exist in TheCocktailDB
  const fallbackCocktails = ['Mojito', 'Gin Tonic', 'Whiskey Sour', 'Martini', 'Daiquiri']

  const suggestions = cocktailSuggestions[city.country] || fallbackCocktails
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

  return await fetchCocktailByName(randomSuggestion)
}
