import { userLocation } from '../hooks/useUserLocation';
import { useWeatherApi } from '../hooks/useWeatherApi';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import './BigWeatherCard.css';

type BigWeatherCardProps = {
  userLocation: userLocation;
  units: string;
};

const BigWeatherCard = (props: BigWeatherCardProps) => {
  const { userLocation, units } = props;
  const { apiData: currentWeatherData, errorMessage } = useWeatherApi(
    {
      userLocation,
      path: 'weather',
      units,
    }
  );

  const weather =
    Object.keys(currentWeatherData).length > 0 ? (
      <>
        <div className="item">
          <span>
            {new Date(currentWeatherData.dt * 1000).getDate()}
          </span>
          <span>
            {new Date(currentWeatherData.dt * 1000).toLocaleString(
              'default',
              { month: 'long' }
            )}
          </span>
        </div>
        <div className="item">
          <span>{`${Math.round(
            currentWeatherData.main.temp
          )}°${units}`}</span>
          <span>{currentWeatherData.weather[0].description}</span>
        </div>
        <img
          alt="icon describing the weather conditions"
          data-testid="weather-icon"
          src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
        />
      </>
    ) : (
      <Loader />
    );

  return (
    <section
      data-testid="weather-container"
      className="weather-container"
    >
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        weather
      )}
    </section>
  );
};

export default BigWeatherCard;
