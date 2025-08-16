#!/usr/bin/env node

// Script to verify which cocktails exist in TheCocktailDB
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cocktailSuggestions = {
  // North America
  USA: ['Manhattan', 'Old Fashioned', 'Margarita', 'Mojito', 'Whiskey Sour', 'Cosmopolitan', 'Mai Tai'],
  Canada: ['Caesar', 'Icewine Cocktail', 'Maple Whiskey Sour', 'Canadian Club', 'Toronto Cocktail'],
  Mexico: ['Margarita', 'Paloma', 'Michelada', 'Tequila Sunrise', 'Oaxacan Old Fashioned', 'Mezcal Negroni'],

  // South America
  Brazil: ['Caipirinha', 'Batida', 'Guarana Cocktail', 'Passion Fruit Martini', 'Brazilian Mule'],
  Argentina: ['Fernet-Branca', 'Aperol Spritz', 'Malbec Sangria', 'Tango Cocktail', 'Mate Tea Cocktail'],
  Peru: ['Pisco Sour', 'Chilcano', 'Algarrobina', 'Capitán', 'Maracuyá Sour'],
  Colombia: ['Aguardiente Sour', 'Refajo', 'Canelazo', 'Lulada', 'Colombian Coffee Cocktail'],

  // Europe
  UK: ['Gin and Tonic', 'Whiskey Sour', 'Pimms', 'Dark and Stormy', 'London Mule', 'Bramble'],
  France: ['French 75', 'Kir Royale', 'Sidecar', 'Champagne Cocktail', 'French Martini', 'Boulevardier'],
  Germany: ['Hugo', 'Feuerzangenbowle', 'Berliner Weisse', 'German Mule', 'Apfelschorle'],
  Italy: ['Negroni', 'Aperol Spritz', 'Bellini', 'Limoncello', 'Americano', 'Paper Plane'],
  Spain: ['Sangria', 'Tinto de Verano', 'Kalimotxo', 'Rebujito', 'Agua de Valencia'],
  Netherlands: ['Genever Cocktail', 'Dutch Mule', 'Advocaat', 'Orange Bitters', 'Amsterdam Sour'],
  Sweden: ['Glögg', 'Aquavit Sour', 'Lingonberry Cocktail', 'Swedish Punsch', 'Nordic Mule'],
  'Czech Republic': ['Becherovka', 'Czech Mule', 'Pilsner Cocktail', 'Absinthe Cocktail', 'Bohemian'],
  Ireland: ['Irish Coffee', 'Irish Mule', 'Whiskey Smash', 'Shamrock', 'Dublin Handshake'],
  Austria: ['Hugo', 'Austrian Spritz', 'Schnapps Cocktail', 'Vienna Coffee', 'Alpine Mule'],
  Turkey: ['Raki', 'Turkish Delight Martini', 'Istanbul Mule', 'Pomegranate Cocktail', 'Turkish Coffee'],

  // Asia
  Japan: ['Sake Martini', 'Whiskey Highball', 'Plum Wine', 'Japanese Sour', 'Yuzu Cocktail'],
  'South Korea': ['Soju Cocktail', 'Korean Mule', 'Makgeolli', 'Bokbunja', 'Seoul Sling'],
  China: ['Lychee Martini', 'Chinese Tea Cocktail', 'Baijiu Sour', 'Dragon Well', 'Shanghai Mule'],
  'Hong Kong': ['Hong Kong Sling', 'Tai Chi', 'Dragon Cocktail', 'Pearl River', 'HK Mule'],
  Singapore: ['Singapore Sling', 'Gin Sling', 'Tropical Punch', 'Lychee Martini', 'Asian Pear Cocktail'],
  Thailand: ['Thai Basil Smash', 'Lemongrass Cocktail', 'Thai Mule', 'Coconut Cocktail', 'Bangkok Sling'],
  India: ['Mango Lassi', 'Spiced Tea', 'Fruit Juice', 'Thandai', 'Indian Spice Cocktail'],
  UAE: ['Virgin Mojito', 'Fruit Punch', 'Lemonade', 'Iced Tea', 'Rose Water Cocktail'], // Non-alcoholic
  Israel: ['Arak', 'Tel Aviv Mule', 'Pomegranate Cocktail', 'Date Syrup Cocktail', 'Israeli Wine'],

  // Africa
  Egypt: ['Turkish Coffee', 'Mint Tea', 'Fresh Juice', 'Hibiscus Tea', 'Tamarind Drink'],
  'South Africa': ['Amarula Cocktail', 'Rooibos Tea', 'Cape Town Mule', 'Pinotage Sangria', 'Springbok'],
  Nigeria: ['Palm Wine', 'Zobo', 'Chapman', 'Nigerian Mule', 'Hibiscus Cocktail'],
  Morocco: ['Mint Tea', 'Moroccan Mule', 'Orange Blossom', 'Argan Oil Cocktail', 'Atlas Cocktail'],
  Kenya: ['Dawa', 'Kenyan Coffee', 'Tusker Beer', 'Safari Sunset', 'Nairobi Mule'],

  // Oceania
  Australia: ['Espresso Martini', 'Dark and Stormy', 'Australian Beer', 'Wine Spritzer', 'Aussie Mule'],
  'New Zealand': ['Sauvignon Blanc', 'Kiwi Cocktail', 'Hokey Pokey', 'NZ Mule', 'Marlborough'],
  Fiji: ['Kava', 'Tropical Punch', 'Coconut Water', 'Fiji Sunset', 'Island Breeze'],
  Samoa: ['Kava', 'Coconut Water', 'Tropical Fruit Punch', 'Samoan Sunset', 'Island Paradise', 'Ava Tea'],
  Tonga: ['Kava', 'Coconut Cocktail', 'Pacific Punch', 'Tongan Sunset', 'Island Breeze', 'Otai'],
}

async function fetchCocktailByName(name) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
    const data = await response.json()
    return data.drinks?.[0] || null
  } catch (error) {
    console.error(`Error fetching cocktail ${name}:`, error)
    return null
  }
}

async function verifyCocktails() {
  const validCocktails = {}
  const invalidCocktails = {}

  console.log('Verifying cocktails in TheCocktailDB...\n')

  for (const [country, cocktails] of Object.entries(cocktailSuggestions)) {
    console.log(`Checking ${country}...`)
    validCocktails[country] = []
    invalidCocktails[country] = []

    for (const cocktailName of cocktails) {
      const cocktail = await fetchCocktailByName(cocktailName)
      if (cocktail) {
        validCocktails[country].push(cocktailName)
        console.log(`  ✓ ${cocktailName}`)
      } else {
        invalidCocktails[country].push(cocktailName)
        console.log(`  ✗ ${cocktailName}`)
      }
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    console.log()
  }

  console.log('\n=== SUMMARY ===\n')

  for (const [country, cocktails] of Object.entries(validCocktails)) {
    console.log(`${country}: ${cocktails.length} valid cocktails`)
    if (cocktails.length === 0) {
      console.log(`  WARNING: No valid cocktails found for ${country}!`)
    }
  }

  // Save results to files
  fs.writeFileSync(path.join(__dirname, '../src/data/valid-cocktails.json'), JSON.stringify(validCocktails, null, 2))

  fs.writeFileSync(
    path.join(__dirname, '../src/data/invalid-cocktails.json'),
    JSON.stringify(invalidCocktails, null, 2)
  )

  console.log('\nResults saved to src/data/valid-cocktails.json and src/data/invalid-cocktails.json')
}

verifyCocktails().catch(console.error)
