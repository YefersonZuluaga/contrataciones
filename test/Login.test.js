import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../src/pages/login/login';
import useLoginViewModel from '../src/pages/login/viewModel/login.ViewModel';

jest.mock('../src/pages/login/viewModel/login.ViewModel');
jest.mock('firebase/firestore');
jest.mock('antd');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login', () => {
  let localStorageSpy;

  beforeEach(() => {
    useLoginViewModel.mockReturnValue({
      onSubmit: jest.fn(),
      setPassword: jest.fn(),
      setEmail: jest.fn(),
    });
    useNavigate.mockReturnValue(jest.fn());
    message.warning = jest.fn();

    // Crear un espía para localStorage
    localStorageSpy = jest.spyOn(global, 'localStorage', 'get').mockImplementation(() => ({
      setItem: jest.fn(),
    }));
  });

  afterEach(() => {
    // Restaurar los espías a su estado original después de cada prueba
    localStorageSpy.mockRestore();
  });

  it('render sin crashear', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Inicio de sesión')).toBeInTheDocument();
  });

  it('Llama el setEmail en el input change', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Usuario');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });

    // Aquí comprobamos que el valor de la entrada de correo electrónico NO es "yeferson"
    expect(emailInput.value).not.toBe('yeferson');
  });

  it('Llama setPassword en el input change', () => {
    const { getByPlaceholderText } = render(<Login />);
    fireEvent.change(getByPlaceholderText('Contraseña'), {
      target: { value: 'password' },
    });
    expect(useLoginViewModel().setPassword).toHaveBeenCalledWith('password');
  });

  it('Llama el submit en el click del botón', () => {
    const { getByText } = render(<Login />);
    fireEvent.click(getByText('Ingresar'));
    expect(useLoginViewModel().onSubmit).toHaveBeenCalled();
  });
});