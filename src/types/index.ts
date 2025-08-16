export interface City {
  name: string
  timezone: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strInstructions: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
}

export interface CityTime {
  city: City
  currentTime: Date
  formattedTime: string
  isFiveOClock: boolean
  suggestedCocktail?: Cocktail
}

export type Theme = 'dark' | 'light' | 'system'
