import { render, screen } from '@testing-library/react'
import SummaryWeatherCard from '../components/SummaryWeatherCard';
import { BrowserRouter } from 'react-router-dom';

describe('SummaryWeatherCard', () => {
    test('if it renders the img source', () => {
        const props = {
            minTemp: 5,
            maxTemp: 15,
            units: 'C',
            date: 14,
            month: 'March',
            description: 'foggy',
            icon: '10d',
            id: 15

        }
        render(
            <SummaryWeatherCard {...props} />,
            {wrapper: BrowserRouter}
        )
        expect(screen.getByAltText('icon describing the weather conditions'))
        .toHaveAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png')
    })
})
