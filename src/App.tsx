import { useState, useEffect } from 'react';
import { Clock, RefreshCw, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityCard } from './components/CityCard';
import { CITIES } from './data/cities';
import { getCityTime } from './utils/time';
import type { CityTime } from './types';

function App() {
  const [cityTimes, setCityTimes] = useState<CityTime[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateTimes = () => {
    setIsRefreshing(true);
    const times = CITIES.map(city => getCityTime(city));
    setCityTimes(times);
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500); // Small delay for UX
  };

  useEffect(() => {
    updateTimes();
    
    // Update times every minute
    const interval = setInterval(updateTimes, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const eveningCities = cityTimes.filter(ct => ct.isEvening);
  const daytimeCities = cityTimes.filter(ct => !ct.isEvening);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              5 O'Clock Somewhere
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover where it's evening around the world and get cocktail suggestions 
            to match the local time and culture.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button 
              onClick={updateTimes}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Times
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Evening Cities (5 o'clock somewhere!) */}
        {eveningCities.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-semibold text-gray-800">
                🍹 It's 5 O'Clock Here! ({eveningCities.length} cities)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eveningCities.map((cityTime) => (
                <CityCard key={cityTime.city.name} cityTime={cityTime} />
              ))}
            </div>
          </div>
        )}

        {/* Daytime Cities */}
        {daytimeCities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-800">
                ☀️ Daytime Cities ({daytimeCities.length} cities)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daytimeCities.map((cityTime) => (
                <CityCard key={cityTime.city.name} cityTime={cityTime} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Cocktail data provided by{' '}
            <a 
              href="https://www.thecocktaildb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              TheCocktailDB
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
