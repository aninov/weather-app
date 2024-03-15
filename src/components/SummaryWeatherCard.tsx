import { NavLink } from 'react-router-dom';
import './SummaryWeatherCard.css';

interface SummaryWeatherCardProps {
  date: number;
  month: string;
  description: string;
  icon: string;
  id: number;
  minTemp: number;
  maxTemp: number;
  units: string;
}

const SummaryWeatherCard = (props: SummaryWeatherCardProps) => {
  const {
    date,
    description,
    icon,
    month,
    id,
    minTemp,
    maxTemp,
    units,
  } = props;

  return (
    <>
      <NavLink to={`/forecast/${id}`} className="card">
        <div className="date item">
          <span>{date}</span>
          <span>{month}</span>
        </div>
        <div className="temp item">
          <span>{`${minTemp}/${maxTemp}°${units}`}</span>
          <span>{description}</span>
        </div>
        <img
          alt="icon describing the weather conditions"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      </NavLink>
    </>
  );
};

export default SummaryWeatherCard;
