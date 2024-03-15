import { useState, useEffect } from 'react'

export interface userLocation {
    latitude: number
    longitude: number
}

export function useUserLocation() {
    const [userLocation, setUserLocation] = useState({
        latitude: NaN,
        longitude: NaN,
    } as userLocation)
    function success({ coords }: any) {
        const { latitude, longitude } = coords
        setUserLocation({ latitude, longitude })
    }

    function error(err: { code: any; message: any }) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
        setUserLocation({
            latitude: Math.floor(Math.random() * (90 + 90 + 1)) - 90,
            longitude: Math.floor(Math.random() * (180 + 180 + 1)) - 180,
        })
        alert(
            'Please allow access to your location or you will see the weather for a random location on earth :)'
        )
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            success as PositionCallback,
            error
        )
    }, [])

    return { userLocation }
}
