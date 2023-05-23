import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from '../src/pages/home/home.jsx';


const mockNavigate = jest.fn();
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  let originalLocalStorage;
  beforeEach(() => {
    originalLocalStorage = global.localStorage;
    global.localStorage = mockLocalStorage;
    mockNavigate.mockReset();
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.clear.mockReset();
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });
  test('debe mostrar los botones correctos para el rol de empleado', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const createAspirantButton = getByText('Crear Aspirante');
    const reviewButton = getByText('Lista Aspirantes');
    expect(createAspirantButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });

});
