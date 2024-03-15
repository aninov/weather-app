import {
  RawHourlyForcastData,
  ShortHourlyForecastData,
} from './types';

export const getIndexOfFirstHourForcastForTomorrow = function (
  hourlyForecastArray: RawHourlyForcastData[]
) {
  const timeOfFirstIndex = new Date(
    hourlyForecastArray[0].dt * 1000
  ).getHours();
  const indexOfFirstHourForcastForTomorrow =
    hourlyForecastArray
      .slice(1)
      .findIndex(
        (hour) =>
          new Date(hour.dt * 1000).getHours() <= timeOfFirstIndex
      ) + 1;
  return indexOfFirstHourForcastForTomorrow;
};

export const getShortForecastForNextFourDays = function (
  hourlyForecastArray: RawHourlyForcastData[]
) {
  const shortForecastForNextFourDaysArray = [];
  const indexOfFirstHourForcastForTomorrow =
    getIndexOfFirstHourForcastForTomorrow(hourlyForecastArray);
  for (let i = indexOfFirstHourForcastForTomorrow; i <= 39; i += 8) {
    let minTemp = hourlyForecastArray[i].main.temp;
    let maxTemp = hourlyForecastArray[i].main.temp;
    for (
      let hourlyForecast = i;
      hourlyForecast < i + 8;
      hourlyForecast++
    ) {
      if (hourlyForecastArray[hourlyForecast]?.main.temp < minTemp) {
        minTemp = hourlyForecastArray[hourlyForecast].main.temp;
      }
      if (hourlyForecastArray[hourlyForecast]?.main.temp > maxTemp) {
        maxTemp = hourlyForecastArray[hourlyForecast].main.temp;
      }
    }
    shortForecastForNextFourDaysArray.push({
      ...hourlyForecastArray[i + 4],
      startOfDayIndex: i,
      minTemp,
      maxTemp,
    });
  }
  return shortForecastForNextFourDaysArray;
};
