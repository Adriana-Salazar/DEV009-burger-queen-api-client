import { render } from '@testing-library/react';
import { BackgroundImage, TextLogo } from '../components/common';

describe('common.tsx', () => {
  it('debe renderizar BackgroundImage correctamente', () => {
    const { getByAltText } = render(<BackgroundImage />);
    expect(getByAltText('imagendefondo')).toBeTruthy();
  });

  it('debe renderizar TextLogo correctamente', () => {
    const { getByText } = render(<TextLogo />);
    expect(getByText('Burger')).toBeTruthy();
    expect(getByText('Queen')).toBeTruthy();
  });
});
