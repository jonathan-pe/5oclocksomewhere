import { useState, useEffect } from 'react'
import { Clock, RefreshCw, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { CityCard } from './components/CityCard'
import { CITIES } from './data/cities'
import { getCityTime } from './utils/time'
import type { CityTime } from './types'

function App() {
  const [cityTimes, setCityTimes] = useState<CityTime[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  const updateTimes = () => {
    setIsRefreshing(true)
    const times = CITIES.map((city) => getCityTime(city))
    setCityTimes(times)
    setLastUpdated(new Date())
    setTimeout(() => setIsRefreshing(false), 500) // Small delay for UX
  }

  useEffect(() => {
    updateTimes()

    // Update times every minute
    const interval = setInterval(updateTimes, 60000)

    return () => clearInterval(interval)
  }, [])

  // Update current time every second
  useEffect(() => {
    const secondInterval = setInterval(() => {
      const now = new Date()
      // Create a 5 PM time with current seconds and minutes
      const fiveOClock = new Date(now)
      fiveOClock.setHours(17, now.getMinutes(), now.getSeconds(), now.getMilliseconds())

      // Reset minutes and seconds when reaching 6 PM
      if (now.getMinutes() >= 60) {
        fiveOClock.setHours(17, 0, 0, 0)
      }

      setCurrentTime(fiveOClock)
    }, 1000)

    return () => clearInterval(secondInterval)
  }, [])

  const fiveOClockCities = cityTimes.filter((ct) => ct.isFiveOClock)

  // Format current time to show 5 o'clock with seconds
  const formatFiveOClockTime = (date: Date) => {
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `5:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} PM`
  }

  return (
    <div className='min-h-screen bg-background transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8 relative'>
          <div className='absolute top-0 right-0'>
            <ThemeToggle />
          </div>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <Globe className='h-8 w-8' />
            <h1 className='text-4xl font-bold bg-clip-text'>5 O'Clock Somewhere</h1>
          </div>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto transition-colors duration-300'>
            Discover cities around the world where it's currently 5 O'Clock, and get cocktail suggestions to match the
            local culture.
          </p>

          <div className='flex items-center justify-center gap-4 mt-6'>
            <Button
              onClick={updateTimes}
              disabled={isRefreshing}
              className='flex items-center gap-2 transition-all duration-300'
            >
              <RefreshCw
                className={`h-4 w-4 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh Times
            </Button>
            <div className='flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300'>
              <Clock className='h-4 w-4' />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>

          {/* Live 5 O'Clock Time Display */}
          <div className='flex items-center justify-center mt-8'>
            <div className='flex items-center gap-3 bg-accent/20 px-6 py-3 rounded-lg border border-accent/30'>
              <Clock className='h-6 w-6 text-accent' />
              <div className='text-center'>
                <div className='text-sm text-muted-foreground mb-1'>It's 5 O'Clock!</div>
                <div className='text-3xl font-mono font-bold text-foreground'>{formatFiveOClockTime(currentTime)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cities in the 5-6 PM window */}
        {fiveOClockCities.length > 0 ? (
          <div className='mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {fiveOClockCities.map((cityTime) => (
                <CityCard key={cityTime.city.name} cityTime={cityTime} />
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🌍</div>
            <h2 className='text-2xl font-semibold text-muted-foreground mb-2'>
              It's not 5 O'Clock in cities we support right now ☹️
            </h2>
            <p className='text-muted-foreground/70'>Check back in a few minutes to see where it's cocktail time!</p>
          </div>
        )}

        {/* Footer */}
        <div className='text-center mt-12 pt-8 border-t border-border'>
          <p className='text-muted-foreground text-sm'>
            Cocktail data provided by{' '}
            <a
              href='https://www.thecocktaildb.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:text-primary/80 underline'
            >
              TheCocktailDB
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
