import { useState, useEffect } from 'react'
import { OW_API_KEY } from '../utils/constants'
import { WeatherApiResponse } from '../utils/types'
import { userLocation } from './useUserLocation'

export type useWeatherApiProps = {
    userLocation: userLocation
    path: string
    units: string
}

export function useWeatherApi(props: useWeatherApiProps) {
    const { userLocation, path, units } = props
    const [apiData, setApiData] = useState({} as WeatherApiResponse)
    const [errorMessage, setErrorMessage] = useState('')

    let unitsParameter: string = ''
    if (units === 'C') {
        unitsParameter = '&units=metric'
    } else if (units === 'F') {
        unitsParameter = '&units=imperial'
    } else if (units === 'K') {
        unitsParameter = ''
    }
    useEffect(() => {
        let data = {} as WeatherApiResponse
        const getData = async () => {
            try {
                if (userLocation.latitude) {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/${path}?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${OW_API_KEY}${unitsParameter}`
                    )

                    if (!res.ok)
                        throw new Error(
                            'Something whent wrong! No data for the weather'
                        )
                    data = (await res.json()) as WeatherApiResponse
                }
                setApiData(data)
            } catch (err) {
                let message = 'Something whent wrong'
                if (err instanceof Error) {
                    message = err.message
                }
                setErrorMessage(message)
            }
        }

        void getData()
    }, [userLocation.latitude, userLocation.longitude, path, units])

    return { apiData, errorMessage }
}
