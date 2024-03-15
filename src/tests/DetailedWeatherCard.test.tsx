import { render, screen } from '@testing-library/react';
import DetailedWeatherCard from '../components/DetailedWeatherCard';
import { BrowserRouter } from 'react-router-dom';

describe('DetailedWeatherCard', () => {
  test('if it renders the img source', () => {
    const props = {
      temp: 15,
      unitSymbol: 'C',
      hour: 13,
      description: 'foggy',
      icon: '10d',
    };
    render(<DetailedWeatherCard {...props} />, {
      wrapper: BrowserRouter,
    });
    expect(
      screen.getByAltText('icon describing the weather conditions')
    ).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/10d.png'
    );
  });
});
