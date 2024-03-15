import { render, screen } from '@testing-library/react';
import SummaryWeatherCardContainer from '../components/SummaryWeatherCardContainer';
import { BrowserRouter } from 'react-router-dom';
import { generateHourlyForecastArray } from './helpers/helpers';
import { ShortHourlyForecastData } from '../utils/types';

describe('SummaryWeatherCardContainer', () => {
  const mockedForecastArray = generateHourlyForecastArray(8);
  const props = (errorMessageContent: string) => ({
    errorMessage: 'Something whent wrong! No data for the weather',
    shortForecastForNextFourDays:
      mockedForecastArray as ShortHourlyForecastData[],
    units: 'C',
  });
  test('it renders the source link of the icon', async () => {
    render(<SummaryWeatherCardContainer {...props('')} />, {
      wrapper: BrowserRouter,
    });
    expect(await screen.findByTestId('card-container')).toBeTruthy();
  });
  test('it renders the error message if there is one passed as props', async () => {
    render(
      <SummaryWeatherCardContainer
        {...props('Something whent wrong! No data for the weather')}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(
      await screen.findByTestId('error-message')
    ).toHaveTextContent(
      'Something whent wrong! No data for the weather'
    );
  });
});
