import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodaysWeather from './pages/TodaysWeather';
import DetailedForecast from './pages/DetailedForecast';
import { useWeatherApi } from './hooks/useWeatherApi';
import { useUserLocation } from './hooks/useUserLocation';
import SummaryWeatherCardContainer from './components/SummaryWeatherCardContainer';
import SelectUnits from './components/SelectUnits';
import { ChangeEventHandler, useState } from 'react';
import { STRINGS } from './utils/constants';
import { getShortForecastForNextFourDays } from './utils/utils';
import './App.css';
import { ShortHourlyForecastData } from './utils/types';

const App = () => {
  const [units, setUnits] = useState(
    () => localStorage.getItem('units') || ''
  );
  const { userLocation } = useUserLocation();
  const { apiData: forecastData, errorMessage } = useWeatherApi({
    userLocation,
    path: 'forecast',
    units,
  });
  const shortForecastForNextFourDays =
    (Object.keys(forecastData).length > 0 &&
      forecastData.list.length > 0 &&
      (getShortForecastForNextFourDays(
        forecastData.list
      ) as ShortHourlyForecastData[])) ||
    [];
  const handleUnitSelect: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    localStorage.setItem('units', e.target.value);
    setUnits(e.target.value);
  };

  return (
    <>
      <section className="header">
        <div className="label">{STRINGS.PLEASE_SELECT_UNIT}</div>
        <SelectUnits
          handleOnChange={handleUnitSelect}
          selectedUnits={units}
        />
      </section>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <TodaysWeather
                userLocation={userLocation}
                units={units}
              />
            }
          />
          <Route
            path="forecast/:id"
            element={
              <DetailedForecast
                forecastData={forecastData}
                unitSymbol={units}
              />
            }
          />
        </Routes>

        <SummaryWeatherCardContainer
          errorMessage={errorMessage}
          shortForecastForNextFourDays={shortForecastForNextFourDays}
          units={units}
        />
      </BrowserRouter>
    </>
  );
};

export default App;
