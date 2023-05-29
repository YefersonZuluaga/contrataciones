import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from '../src/pages/home/home.jsx';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  let localStorageSpy;

  beforeEach(() => {
    mockNavigate.mockReset();

    // Crear un espía para localStorage
    localStorageSpy = jest.spyOn(global, 'localStorage', 'get').mockImplementation(() => ({
      getItem: jest.fn().mockReturnValue(JSON.stringify({ rol: 'empleado' })),
      setItem: jest.fn(),
      removeItem: jest.fn().mockReturnValue({})
    }));
  });

  afterEach(() => {
    // Restaurar los espías a su estado original después de cada prueba
    localStorageSpy.mockRestore();
  });

  test('debe mostrar los botones correctos para el rol de empleado', () => {
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const createAspirantButton = getByText('Crear Aspirante');
    const reviewButton = getByText('Lista Aspirantes');
    expect(createAspirantButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });

  test('debe mostrar los botones correctos para el rol de supervisor', () => {
    localStorageSpy.mockImplementation(() => ({
      getItem: jest.fn().mockReturnValue(JSON.stringify({ rol: 'supervisor' })),
      setItem: jest.fn(),
    }));

    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const pendingReviewButton = getByText('Listado Aspirantes Pendientes');
    expect(pendingReviewButton).toBeInTheDocument();
  });

  test('debe navegar a /create-aspirant cuando se hace clic en el botón Crear Aspirante', () => {
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Crear Aspirante');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/create-aspirant');
  });

  test('debe navegar a /review cuando se hace clic en el botón Lista Aspirantes', () => {
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Lista Aspirantes');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/review');
  });

  test('debe navegar a /review cuando se hace clic en el botón Listado Aspirantes Pendientes', () => {
    localStorageSpy.mockImplementation(() => ({
      getItem: jest.fn().mockReturnValue(JSON.stringify({ rol: 'supervisor' })),
      setItem: jest.fn(),
    }));

    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Listado Aspirantes Pendientes');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/review');
  });

  // test('debe navegar a / cuando se hace clic en el botón Cerrar sesión', () => {
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const button = getByText('Cerrar sesión');
  //   fireEvent.click(button);

  //   expect(mockNavigate).toHaveBeenCalledWith('/');
  // });
});