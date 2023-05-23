import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from '../src/pages/home/home.jsx';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  let originalLocalStorage;
  beforeEach(() => {
    mockNavigate.mockReset();
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    originalLocalStorage = window.localStorage;
    window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    window.localStorage = originalLocalStorage;
  });

  test('debe mostrar los botones correctos para el rol de empleado', () => {
    window.localStorage.setItem.mockImplementation((key, value) => {
      window.localStorage[key] = value;
    });
    window.localStorage.getItem.mockImplementation((key) => {
      return window.localStorage[key];
    });
    window.localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const createAspirantButton = getByText('Crear Aspirante');
    const reviewButton = getByText('Lista Aspirantes');
    expect(createAspirantButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });

  // Resto de pruebas...
});