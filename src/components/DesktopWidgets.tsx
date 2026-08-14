import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

export const DesktopWidgets: React.FC = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const currentMonth = monthNames[today.getMonth()];

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  // Live Kolkata Weather State
  const [weatherData, setWeatherData] = useState<{
    temp: number;
    condition: string;
    high: number;
    low: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
  }>({
    temp: 27,
    condition: "Mostly Clear",
    high: 31,
    low: 26,
    humidity: 92,
    windSpeed: 8,
    weatherCode: 3
  });

  useEffect(() => {
    const fetchKolkataWeather = async () => {
      try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata";
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const current = data.current;
          const daily = data.daily;

          let cond = "Clear Sky";
          const code = current.weather_code;
          if (code >= 1 && code <= 3) cond = "Partly Cloudy";
          else if (code >= 45 && code <= 48) cond = "Foggy";
          else if (code >= 51 && code <= 82) cond = "Rain Showers";
          else if (code >= 95) cond = "Thunderstorm";

          setWeatherData({
            temp: Math.round(current.temperature_2m),
            condition: cond,
            high: Math.round(daily.temperature_2m_max[0]),
            low: Math.round(daily.temperature_2m_min[0]),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            weatherCode: code
          });
        }
      } catch (err) {
        console.warn("Failed to fetch live Kolkata weather, using default Kolkata metrics:", err);
      }
    };

    fetchKolkataWeather();
    const interval = setInterval(fetchKolkataWeather, 300000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="h-8 w-8 text-amber-400 animate-pulse" />;
    if (code >= 51 && code <= 82) return <CloudRain className="h-8 w-8 text-blue-400 animate-pulse" />;
    if (code >= 95) return <CloudLightning className="h-8 w-8 text-purple-400 animate-pulse" />;
    return <CloudSun className="h-8 w-8 text-amber-400 animate-pulse" />;
  };

  return (
    <div className="absolute top-10 left-6 z-10 flex flex-wrap gap-5 select-none max-w-full">
      {/* 1. macOS Calendar Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-64 rounded-3xl macos-glass p-4 text-white shadow-2xl backdrop-blur-xl border border-white/20"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-red-400">
            {currentMonth}
          </span>
          <span className="text-xs font-mono text-white/60">{year}</span>
        </div>

        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-white/50 mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        <div className="grid grid-cols-7 text-center text-xs gap-y-1.5 font-medium">
          {days.map((day, idx) => (
            <div key={idx} className="h-6 flex items-center justify-center">
              {day ? (
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                    day === currentDay
                      ? 'bg-red-500 font-bold text-white shadow-md shadow-red-500/50 scale-110'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {day}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. macOS Live Weather Widget for Kolkata, India */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-64 rounded-3xl macos-glass p-4 text-white shadow-2xl backdrop-blur-xl border border-white/20 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Kolkata</h4>
              <span className="text-3xl font-light text-white tracking-tight">{weatherData.temp}°C</span>
            </div>
            <div className="rounded-2xl bg-amber-500/20 p-2 border border-amber-500/30">
              {getWeatherIcon(weatherData.weatherCode)}
            </div>
          </div>

          <p className="mt-1 text-xs font-medium text-white/80">{weatherData.condition}</p>

          <div className="mt-3 flex items-center justify-between text-[11px] text-white/70">
            <span>H: {weatherData.high}° L: {weatherData.low}°</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5"><Droplets className="h-3 w-3 text-blue-400" /> {weatherData.humidity}%</span>
              <span className="flex items-center gap-0.5"><Wind className="h-3 w-3 text-teal-400" /> {weatherData.windSpeed}km/h</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-2.5 py-1.5 border border-emerald-500/20 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Weather • Kolkata, India</span>
        </div>
      </motion.div>
    </div>
  );
};
