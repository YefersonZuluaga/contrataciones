import '@testing-library/jest-dom';
// import { fireEvent, render } from '@testing-library/react';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from '../src/pages/home/home.jsx';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('debe mostrar los botones correctos para el rol de empleado', () => {
    localStorage.setItem.mockImplementationOnce((key, value) => {
      expect(key).toBe('user');
      expect(value).toBe(JSON.stringify({ rol: 'empleado' }));
    });

    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const createAspirantButton = getByText('Crear Aspirante');
    const reviewButton = getByText('Lista Aspirantes');
    expect(createAspirantButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });
  // test('debe mostrar los botones correctos para el rol de empleado', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const createAspirantButton = getByText('Crear Aspirante');
  //   const reviewButton = getByText('Lista Aspirantes');
  //   expect(createAspirantButton).toBeInTheDocument();
  //   expect(reviewButton).toBeInTheDocument();
  // });

  // test('debe mostrar los botones correctos para el rol de supervisor', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'supervisor' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const pendingReviewButton = getByText('Listado Aspirantes Pendientes');
  //   expect(pendingReviewButton).toBeInTheDocument();
  // });

  // test('debe navegar a /create-aspirant cuando se hace clic en el botón Crear Aspirante', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const button = getByText('Crear Aspirante');
  //   fireEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith('/create-aspirant');
  // });

  // test('debe navegar a /review cuando se hace clic en el botón Lista Aspirantes', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const button = getByText('Lista Aspirantes');
  //   fireEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith('/review');
  // });

  // test('debe navegar a /review cuando se hace clic en el botón Listado Aspirantes Pendientes', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'supervisor' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const button = getByText('Listado Aspirantes Pendientes');
  //   fireEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith('/review');
  // });

  // test('debe navegar a / cuando se hace clic en el botón Cerrar sesión', () => {
  //   localStorage.setItem('user', JSON.stringify({ rol: 'empleado' }));
  //   const { getByText } = render(<Home />, { wrapper: MemoryRouter });
  //   const button = getByText('Cerrar sesión');
  //   fireEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith('/');
  // });

});

// describe("texto", () => {
//   test("prueba", () => {
//     const testUser = { id: 123 }
//     expect(123).toEqual(testUser.id)
//   })
// })