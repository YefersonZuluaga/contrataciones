import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { MemoryRouter } from 'react-router-dom';
import CreateEmployee from '../src/pages/createAspirant/createAspirant.jsx';

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
}));
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { },
  };
};

describe('Crear componente de empleado', () => {
  let localStorageSpy;

  beforeEach(() => {
    // Reset all mocks before each test
    getStorage.mockClear();
    ref.mockClear();
    uploadBytes.mockClear();

    // Crear un espía para localStorage
    localStorageSpy = jest.spyOn(global, 'localStorage', 'get').mockImplementation(() => ({
      getItem: jest.fn(),
      setItem: jest.fn(),
    }));
  });

  afterEach(() => {
    // Restaurar los espías a su estado original después de cada prueba
    localStorageSpy.mockRestore();
  });


  test('renderiza sin fallar', () => {
    render(<MemoryRouter><CreateEmployee /></MemoryRouter>);
  });

  test('renderiza los campos del formulario', () => {
    const { container } = render(<MemoryRouter><CreateEmployee /></MemoryRouter>);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(5);
  });

  test('muestra el botón de carga', () => {
    const { getByText } = render(<MemoryRouter><CreateEmployee /></MemoryRouter>);
    const uploadButton = getByText('Registrar');
    expect(uploadButton).toBeInTheDocument();
  });
});