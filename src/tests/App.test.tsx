import { render, screen } from '@testing-library/react';
import App from '../App';
import { mockNavigatorGeolocation } from './helpers/helpers';

describe('App', () => {
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
  test('it renders the radio button for unit select', () => {
    jest.mock('../hooks/useUserLocation', () => ({
      useUserLocation: () => ({
        latitude: 45,
        longitude: 25,
      }),
    }));
    render(<App />);
    expect(screen.getByTestId('radio-button-C')).toHaveAttribute(
      'for',
      'celsius'
    );
  });
});
