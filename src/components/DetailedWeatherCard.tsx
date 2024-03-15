import './DetailedWeatherCard.css';

type DetailedWeatherCardProps = {
  hour: number;
  temp: number;
  icon: string;
  description: string;
  unitSymbol: string;
};
const DetailedWeatherCard = (props: DetailedWeatherCardProps) => {
  const { hour, temp, icon, description, unitSymbol } = props;

  return (
    <div className="small_card">
      <div className="item hour">
        <span>{`${hour}:00`}</span>
      </div>
      <div className="item temp">
        <span>{`${Math.round(temp)}°${unitSymbol}`}</span>
      </div>
      <div className="item">
        <span>{description}</span>
      </div>

      <img
        alt="icon describing the weather conditions"
        src={`https://openweathermap.org/img/wn/${icon}.png`}
      />
    </div>
  );
};

export default DetailedWeatherCard;
