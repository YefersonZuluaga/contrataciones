import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import Home from '../src/pages/home/home.jsx'


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('debe mostrar los botones correctos para el rol de empleado', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const createAspirantButton = getByText('Crear Aspirante');
    const reviewButton = getByText('Lista Aspirantes');
    expect(createAspirantButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });

  test('debe mostrar los botones correctos para el rol de supervisor', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'supervisor' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const pendingReviewButton = getByText('Listado Aspirantes Pendientes');
    expect(pendingReviewButton).toBeInTheDocument();
  });

  test('debe navegar a /create-aspirant cuando se hace clic en el botón Crear Aspirante', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Crear Aspirante');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/create-aspirant');
  });

  test('debe navegar a /review cuando se hace clic en el botón Lista Aspirantes', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Lista Aspirantes');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/review');
  });

  test('debe navegar a /review cuando se hace clic en el botón Listado Aspirantes Pendientes', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'supervisor' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Listado Aspirantes Pendientes');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/review');
  });

  test('debe navegar a / cuando se hace clic en el botón Cerrar sesión', () => {
    localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const button = getByText('Cerrar sesión');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  
});
