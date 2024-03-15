import { render, screen } from '@testing-library/react';
import BigWeatherCard from '../components/BigWeatherCard';
import { BrowserRouter } from 'react-router-dom';
import weatherDataResponseMock from './mocks/mocks';

describe('BigWeatherCard', () => {
  const mockFetch = (okValue: Boolean) =>
    jest.fn(() =>
      Promise.resolve({
        ok: okValue,
        json: () => Promise.resolve({ ...weatherDataResponseMock }),
      })
    ) as jest.Mock;
  test('it renders the source link of the image', async () => {
    global.fetch = mockFetch(true);
    const props = {
      userLocation: {
        latitude: 45,
        longitude: 25,
      },
      units: 'C',
    };
    render(<BigWeatherCard {...props} />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId('weather-icon')).toHaveAttribute(
      'alt',
      'icon describing the weather conditions'
    );
  });
  test('it renders the error message if there is one passed', async () => {
    global.fetch = mockFetch(false);
    const props = {
      errorMesssage: 'Something whent wrong! No data for the weather',
      userLocation: {
        latitude: 45,
        longitude: 25,
      },
      units: 'C',
    };
    render(<BigWeatherCard {...props} />, { wrapper: BrowserRouter });
    expect(
      await screen.findByTestId('error-message')
    ).toHaveTextContent(
      'Something whent wrong! No data for the weather'
    );
  });
});
