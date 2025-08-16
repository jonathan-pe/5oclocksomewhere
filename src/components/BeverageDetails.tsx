import { ArrowLeft, Wine, ChefHat, Tag, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Cocktail } from '../types'

interface BeverageDetailsProps {
  cocktail: Cocktail
  onBack: () => void
}

export function BeverageDetails({ cocktail, onBack }: BeverageDetailsProps) {
  const getIngredients = (cocktail: Cocktail): { ingredient: string; measure?: string }[] => {
    const ingredients: { ingredient: string; measure?: string }[] = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail]
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim(),
        })
      }
    }
    return ingredients
  }

  const getTags = (cocktail: Cocktail): string[] => {
    if (!cocktail.strTags) return []
    return cocktail.strTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  }

  const ingredients = getIngredients(cocktail)
  const tags = getTags(cocktail)

  // Debug logging to see what tags data we have
  console.log('Cocktail tags data:', {
    strTags: cocktail.strTags,
    parsedTags: tags,
    cocktailName: cocktail.strDrink,
  })

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header with back button */}
        <div className='flex items-center gap-4 mb-8'>
          <Button variant='outline' size='sm' onClick={onBack} className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back
          </Button>
          <div className='h-6 w-px bg-border' />
          <h1 className='text-3xl font-bold'>{cocktail.strDrink}</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {/* Left column - Image with tags */}
          <div className='space-y-6'>
            {/* Main image with tags */}
            <Card>
              <CardContent className='p-6'>
                <div className='aspect-[4/3] relative overflow-hidden rounded-lg bg-muted mb-4'>
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className='w-full h-full object-cover' />
                </div>

                {/* Tags in the same card */}
                <div>
                  <div className='flex items-center gap-2 mb-3'>
                    <Tag className='h-4 w-4' />
                    <span className='font-medium text-sm text-muted-foreground'>Tags</span>
                  </div>
                  {tags.length > 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag, index) => (
                        <Badge key={index} variant='secondary'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className='text-xs text-muted-foreground italic'>No tags available for this cocktail</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Details, Ingredients and instructions */}
          <div className='space-y-4'>
            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Wine className='h-4 w-4' />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3 pt-0'>
                {cocktail.strCategory && (
                  <div>
                    <span className='font-medium text-xs text-muted-foreground'>Category:</span>
                    <p className='mt-0.5 text-sm'>{cocktail.strCategory}</p>
                  </div>
                )}

                {cocktail.strAlcoholic && (
                  <div>
                    <span className='font-medium text-xs text-muted-foreground'>Type:</span>
                    <p className='mt-0.5 text-sm'>{cocktail.strAlcoholic}</p>
                  </div>
                )}

                {cocktail.strGlass && (
                  <div>
                    <span className='font-medium text-xs text-muted-foreground'>Served in:</span>
                    <p className='mt-0.5 text-sm'>{cocktail.strGlass}</p>
                  </div>
                )}

                {cocktail.strVideo && (
                  <div>
                    <span className='font-medium text-xs text-muted-foreground block mb-1'>Video:</span>
                    <a
                      href={cocktail.strVideo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 underline'
                    >
                      <Play className='h-3 w-3' />
                      Watch tutorial
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Ingredients</CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='space-y-2'>
                  {ingredients.map((item, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center py-1.5 border-b border-border/50 last:border-b-0'
                    >
                      <span className='font-medium'>{item.ingredient}</span>
                      {item.measure && <span className='text-muted-foreground text-sm'>{item.measure}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <ChefHat className='h-4 w-4' />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='prose prose-sm max-w-none dark:prose-invert'>
                  <p className='whitespace-pre-line leading-relaxed text-sm'>{cocktail.strInstructions}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
