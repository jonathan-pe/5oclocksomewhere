import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Wine } from 'lucide-react'
import type { CityTime, Cocktail } from '../types'
import { getSuggestedCocktail } from '../utils/time'

interface CityCardProps {
  cityTime: CityTime
}

export function CityCard({ cityTime }: CityCardProps) {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null)
  const [loadingCocktail, setLoadingCocktail] = useState(false)

  useEffect(() => {
    const fetchCocktail = async () => {
      setLoadingCocktail(true)
      try {
        const suggestedCocktail = await getSuggestedCocktail(cityTime.city, cityTime.currentTime)
        setCocktail(suggestedCocktail)
      } catch (error) {
        console.error('Error fetching cocktail:', error)
      } finally {
        setLoadingCocktail(false)
      }
    }

    fetchCocktail()
  }, [cityTime.city, cityTime.currentTime])

  const getIngredients = (cocktail: Cocktail): string[] => {
    const ingredients: string[] = []
    for (let i = 1; i <= 5; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail]
      if (ingredient) {
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient)
      }
    }
    return ingredients
  }

  return (
    <Card className='transition-all duration-500 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/20 shadow-accent/10'>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <MapPin className='h-5 w-5' />
          {cityTime.city.name}, {cityTime.city.country}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center gap-2 mb-3'>
          <Wine className='h-4 w-4 text-accent' />
          <span className='font-semibold text-sm text-muted-foreground'>Suggested Cocktail</span>
        </div>

        {loadingCocktail ? (
          <div className='animate-pulse flex space-x-4'>
            <div className='rounded-lg bg-muted h-16 w-16'></div>
            <div className='flex-1 space-y-2 py-1'>
              <div className='h-4 bg-muted rounded w-3/4'></div>
              <div className='h-3 bg-muted rounded w-1/2'></div>
            </div>
          </div>
        ) : cocktail ? (
          <div className='flex gap-3'>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className='h-16 w-16 rounded-lg object-cover border border-border/50 shadow-sm'
            />
            <div className='flex-1'>
              <h4 className='font-semibold text-sm'>{cocktail.strDrink}</h4>
              <div className='text-xs text-muted-foreground mt-1'>
                <div className='space-y-1'>
                  {getIngredients(cocktail)
                    .slice(0, 3)
                    .map((ingredient, idx) => (
                      <div key={idx}>• {ingredient}</div>
                    ))}
                  {getIngredients(cocktail).length > 3 && <div className='text-xs italic'>...and more</div>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-sm text-muted-foreground'>No cocktail suggestion available</div>
        )}
      </CardContent>
    </Card>
  )
}
