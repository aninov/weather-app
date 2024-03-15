import {
  getIndexOfFirstHourForcastForTomorrow,
  getShortForecastForNextFourDays,
} from '../utils/utils';
import { generateHourlyForecastArray } from './helpers/helpers';

describe('test if we get correct index of first hourly forecast for tomorrow', () => {
  test("if it's 00:00 local time", () => {
    const testArray = generateHourlyForecastArray(0);
    const indexOfFirstHourForcastForTomorrow =
      getIndexOfFirstHourForcastForTomorrow(testArray);
    expect(indexOfFirstHourForcastForTomorrow).toBe(8);
  });
  test("if it's 05:00 local time", () => {
    const testArray = generateHourlyForecastArray(5);
    const indexOfFirstHourForcastForTomorrow =
      getIndexOfFirstHourForcastForTomorrow(testArray);
    expect(indexOfFirstHourForcastForTomorrow).toBe(7);
  });
  test("if it's 10:00 local time", () => {
    const testArray = generateHourlyForecastArray(10);
    const indexOfFirstHourForcastForTomorrow =
      getIndexOfFirstHourForcastForTomorrow(testArray);
    expect(indexOfFirstHourForcastForTomorrow).toBe(5);
  });
  test("if it's 15:00 local time", () => {
    const testArray = generateHourlyForecastArray(15);
    const indexOfFirstHourForcastForTomorrow =
      getIndexOfFirstHourForcastForTomorrow(testArray);
    expect(indexOfFirstHourForcastForTomorrow).toBe(3);
  });
  test("if it's 20:00 local time", () => {
    const testArray = generateHourlyForecastArray(20);
    const indexOfFirstHourForcastForTomorrow =
      getIndexOfFirstHourForcastForTomorrow(testArray);
    expect(indexOfFirstHourForcastForTomorrow).toBe(2);
  });
});

describe('getShortForecastForNextFourDays', () => {
  test('it creates correct array with summary forecast for the next 4 days', () => {
    const testArray = generateHourlyForecastArray(20);
    const shortForecastForNextFourDays =
      getShortForecastForNextFourDays(testArray);
    expect(shortForecastForNextFourDays[0].dt_txt).toBe(
      'Thu Mar 14 2024 14:00:00 GMT+0200 (Eastern European Standard Time)'
    );
  });
});
