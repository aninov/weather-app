import { RawHourlyForcastData } from "../../utils/types" 

export const generateHourlyForecastArray = (startingHour: number) => {
    const mockArray = [] as RawHourlyForcastData[]
    let timeStamp = new Date(`Wed Mar 13 2024 ${startingHour}:00:00 GMT+0200 (Eastern European Standard Time)`).getTime()
    const templateHourObject = (timeStamp: number) => ({
        dt: timeStamp/1000,
        main: {
            temp: 12.56
        },
        weather: [
            {
                id: timeStamp,
                main: 'Clouds',
                description: 'broken clouds',
                icon: '04d'
            }
        ],
        dt_txt: new Date(timeStamp).toString()
    })
    for (let i = 0; i <= 39; i++) {
        const item: RawHourlyForcastData = templateHourObject(timeStamp)
        mockArray.push(item)
        timeStamp += 3*60*60*1000
    }

    return mockArray
}

export const mockNavigatorGeolocation = () => {
    const clearWatchMock = jest.fn();
    const getCurrentPositionMock = jest.fn();
    const watchPositionMock = jest.fn();
  
    const geolocation = {
      clearWatch: clearWatchMock,
      getCurrentPosition: getCurrentPositionMock,
      watchPosition: watchPositionMock,
    };
  
    Object.defineProperty(global.navigator, 'geolocation', {
      value: geolocation,
    });
  
    return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
  };
