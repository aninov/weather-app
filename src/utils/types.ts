interface Weather {
    main: string
    description: string,
    icon: string
    id?: number
}

interface Main {
  temp: number
}

export interface RawHourlyForcastData {
    dt: number
    weather: Weather[]
    main: Main
    dt_txt: string
    
}

export interface ShortHourlyForecastData extends RawHourlyForcastData {
    startOfDayIndex: number
    minTemp: number
    maxTemp: number
}

export interface WeatherApiResponse {
    list: RawHourlyForcastData[]
    weather: Weather[]
    main: Main
    dt: number
}


export interface RawHourlyForcastData {
    dt: number
    weather: Weather[]
    main: Main
}
