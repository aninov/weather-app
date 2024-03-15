import BigWeatherCard from '../components/BigWeatherCard';
import { userLocation } from '../hooks/useUserLocation';

type TodaysWeatherProps = {
  userLocation: userLocation;
  units: string;
};

function TodaysWeather(props: TodaysWeatherProps) {
  const { userLocation, units } = props;

  return <BigWeatherCard userLocation={userLocation} units={units} />;
}

export default TodaysWeather;
