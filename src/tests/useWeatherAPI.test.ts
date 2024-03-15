// import { render } from "react-dom"
import { renderHook, waitFor } from "@testing-library/react";
import { useWeatherApi, useWeatherApiProps } from "../hooks/useWeatherApi"
//import fetch from 'node-fetch'
import weatherDataResponseMock from "./mocks/mocks";

describe('useWeatherApi hook', () => {
    const mockFetch = (okValue: Boolean) => (
        jest.fn(() =>
            Promise.resolve({
                ok: okValue,
                json: () => Promise.resolve({ ...weatherDataResponseMock }),
            }),
        ) as jest.Mock
    )
    test('it returns response data if response.ok is true', async () => {
        global.fetch = mockFetch(true)
        const props: useWeatherApiProps = {
            userLocation: {
                latitude: 25,
                longitude: 25
            },
            path: 'weather',
            units: 'F'
        }
        const { result } = renderHook(() => useWeatherApi({ ...props }))
        await waitFor(() => expect(result.current.apiData).toStrictEqual({...weatherDataResponseMock}))
        await waitFor(() => expect(result.current.errorMessage).toStrictEqual(''))

    })
    test('it returns error message if response.ok is false', async () => {
        global.fetch = mockFetch(false)
        const props: useWeatherApiProps = {
            userLocation: {
                latitude: 25,
                longitude: 25
            },
            path: 'weather',
            units: 'F'
        }
        const { result } = renderHook(() => useWeatherApi({ ...props }))
        await waitFor(() => expect(result.current.apiData).toStrictEqual({}))
        await waitFor(() => expect(result.current.errorMessage).toStrictEqual('Something whent wrong! No data for the weather'))
    })
})

