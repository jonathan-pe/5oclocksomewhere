import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Wine } from 'lucide-react';
import type { CityTime, Cocktail } from '../types';
import { getSuggestedCocktail } from '../utils/time';

interface CityCardProps {
  cityTime: CityTime;
}

export function CityCard({ cityTime }: CityCardProps) {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loadingCocktail, setLoadingCocktail] = useState(false);

  useEffect(() => {
    const fetchCocktail = async () => {
      if (cityTime.isEvening) {
        setLoadingCocktail(true);
        try {
          const suggestedCocktail = await getSuggestedCocktail(cityTime.city, cityTime.currentTime);
          setCocktail(suggestedCocktail);
        } catch (error) {
          console.error('Error fetching cocktail:', error);
        } finally {
          setLoadingCocktail(false);
        }
      }
    };

    fetchCocktail();
  }, [cityTime.city, cityTime.currentTime, cityTime.isEvening]);

  const getIngredients = (cocktail: Cocktail): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail];
      if (ingredient) {
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
      }
    }
    return ingredients;
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      cityTime.isEvening ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50' : 'border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            {cityTime.city.name}
          </CardTitle>
          <Badge variant={cityTime.isEvening ? "destructive" : "secondary"}>
            {cityTime.city.country}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-2xl font-mono font-semibold">
            {cityTime.formattedTime}
          </span>
          {cityTime.isEvening && (
            <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">
              Evening Time 🌅
            </Badge>
          )}
        </div>

        {cityTime.isEvening && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Wine className="h-4 w-4" />
              <span className="font-semibold text-sm text-muted-foreground">
                Suggested Cocktail
              </span>
            </div>
            
            {loadingCocktail ? (
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-gray-200 h-16 w-16"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : cocktail ? (
              <div className="flex gap-3">
                <img 
                  src={cocktail.strDrinkThumb} 
                  alt={cocktail.strDrink}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{cocktail.strDrink}</h4>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div className="space-y-1">
                      {getIngredients(cocktail).slice(0, 3).map((ingredient, idx) => (
                        <div key={idx}>• {ingredient}</div>
                      ))}
                      {getIngredients(cocktail).length > 3 && (
                        <div className="text-xs italic">...and more</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No cocktail suggestion available
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
