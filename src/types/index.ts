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
  strGlass?: string
  strCategory?: string
  strAlcoholic?: string
  strTags?: string
  strVideo?: string
  strDrinkAlternate?: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string
  strIngredient11?: string
  strIngredient12?: string
  strIngredient13?: string
  strIngredient14?: string
  strIngredient15?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
  strMeasure11?: string
  strMeasure12?: string
  strMeasure13?: string
  strMeasure14?: string
  strMeasure15?: string
}

export interface CityTime {
  city: City
  currentTime: Date
  formattedTime: string
  isFiveOClock: boolean
  suggestedCocktail?: Cocktail
}

export type Theme = 'dark' | 'light' | 'system'
