import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailedWeatherCard from '../components/DetailedWeatherCard';
import Loader from '../components/Loader';
import {
  WeatherApiResponse,
  RawHourlyForcastData,
} from '../utils/types';
import './DetailedForecast.css';
import { useEffect } from 'react';

type DetailedForecastProps = {
  forecastData: WeatherApiResponse;
  unitSymbol: string;
};
const DetailedForecast = (props: DetailedForecastProps) => {
  const { forecastData, unitSymbol } = props;
  const detailedData: RawHourlyForcastData[] = [];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number(id) || Number(id) > 39 || Number(id) < 0) {
      navigate('/');
    }
  }, [id, navigate]);

  if (forecastData.list) {
    detailedData.push(
      ...forecastData.list.slice(Number(id), Number(id) + 8)
    );
  }

  return (
    <>
      <Link className="link" to={'/'}>
        See what is the weather today
      </Link>
      {detailedData.length > 0 ? (
        detailedData.map((forecast) => {
          return (
            <DetailedWeatherCard
              key={forecast.dt}
              hour={new Date(forecast.dt * 1000).getHours()}
              temp={forecast.main.temp}
              icon={forecast.weather[0].icon}
              description={forecast.weather[0].description}
              unitSymbol={unitSymbol}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailedForecast;
