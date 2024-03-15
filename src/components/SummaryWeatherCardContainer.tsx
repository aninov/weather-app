import ErrorMessage from './ErrorMessage';
import { ShortHourlyForecastData } from '../utils/types';
import SummaryWeatherCard from './SummaryWeatherCard';
import Loader from './Loader';
import './SummaryWeatherCardContainer.css';

interface SummaryWeatherCardContainerProps {
  errorMessage?: string;
  units: string;
  shortForecastForNextFourDays: ShortHourlyForecastData[];
}

const SummaryWeatherCardContainer = (
  props: SummaryWeatherCardContainerProps
) => {
  const { errorMessage, shortForecastForNextFourDays, units } = props;
  const SummaryWeatherCardList =
    shortForecastForNextFourDays.length > 0 ? (
      shortForecastForNextFourDays.slice(0, 4).map((item) => {
        return (
          <SummaryWeatherCard
            key={item.dt}
            units={units}
            id={item.startOfDayIndex}
            date={new Date(item.dt * 1000).getDate()}
            month={new Date(item.dt * 1000).toLocaleString(
              'default',
              { month: 'long' }
            )}
            minTemp={Math.round(item.minTemp)}
            maxTemp={Math.round(item.maxTemp)}
            description={item.weather[0].description}
            icon={item.weather[0].icon}
          />
        );
      })
    ) : (
      <Loader />
    );

  return (
    <div data-testid="card-container" className="card-container">
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        SummaryWeatherCardList
      )}
    </div>
  );
};

export default SummaryWeatherCardContainer;
