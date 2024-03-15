import { renderHook } from '@testing-library/react';
import { useUserLocation } from '../hooks/useUserLocation';
import { mockNavigatorGeolocation } from './helpers/helpers';

describe('useUserLocation hook', () => {
  test('it returns user location', () => {
    const { getCurrentPositionMock } = mockNavigatorGeolocation();
    getCurrentPositionMock.mockImplementation((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 45,
            longitude: 25,
          },
        })
      )
    );
    const { result } = renderHook(() => useUserLocation());
    expect(result.current).toStrictEqual({
      userLocation: { latitude: 45, longitude: 25 },
    });
  });
});
