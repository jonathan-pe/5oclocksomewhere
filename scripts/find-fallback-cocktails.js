#!/usr/bin/env node

// Script to find popular cocktails from TheCocktailDB to use as fallbacks
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function fetchPopularCocktails() {
  const popularCocktails = []

  // Get some random cocktails to build a pool of popular ones
  console.log('Fetching random cocktails to build fallback list...\n')

  for (let i = 0; i < 50; i++) {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      const data = await response.json()
      if (data.drinks?.[0]) {
        const cocktailName = data.drinks[0].strDrink
        if (!popularCocktails.includes(cocktailName)) {
          popularCocktails.push(cocktailName)
          console.log(`Found: ${cocktailName}`)
        }
      }
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200))
    } catch (error) {
      console.error('Error fetching random cocktail:', error)
    }
  }

  console.log(`\nFound ${popularCocktails.length} unique cocktails`)

  // Also add some known classics that are likely to be in the database
  const knownClassics = [
    'Martini',
    'Daiquiri',
    'Bloody Mary',
    'Moscow Mule',
    'Piña Colada',
    'Tom Collins',
    'Gimlet',
    'Sazerac',
    'Aviation',
    'Last Word',
    'Ramos Gin Fizz',
    'Corpse Reviver #2',
    'Paper Plane',
    'Penicillin',
    'Yellow Bird',
    'Zombie',
    'Hurricane',
    'Painkiller',
    'Bahama Mama',
  ]

  console.log('\nVerifying known classics...')
  const verifiedClassics = []

  for (const cocktailName of knownClassics) {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktailName)}`
      )
      const data = await response.json()
      if (data.drinks?.[0]) {
        verifiedClassics.push(cocktailName)
        console.log(`✓ ${cocktailName}`)
      } else {
        console.log(`✗ ${cocktailName}`)
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`Error checking ${cocktailName}:`, error)
    }
  }

  // Combine all cocktails
  const allCocktails = [...new Set([...popularCocktails, ...verifiedClassics])]

  // Save to file
  fs.writeFileSync(path.join(__dirname, '../src/data/fallback-cocktails.json'), JSON.stringify(allCocktails, null, 2))

  console.log(`\nSaved ${allCocktails.length} fallback cocktails to src/data/fallback-cocktails.json`)

  return allCocktails
}

fetchPopularCocktails().catch(console.error)
