import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import Login from '../src/pages/Login';

import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

describe('Login Component', () => {

    const mockStore = configureMockStore();

    const store = mockStore({
        auth: {
            token: 'mocked_token',
        }
    });
    
    test('Usuario inexistente', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        // Simula el ingreso de credenciales inválidas
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
            target: { value: 'test@ejemplo.com' },
        });

        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: 'contraseña123' },
        });

        fireEvent.click(screen.getByText('Iniciar Sesión'));

        // Espera a que se procese la solicitud real
        await waitFor(() => {
            // Verifica que swal.fire haya sido llamado para mostrar un error
            expect(Swal.fire).toHaveBeenCalledWith({
                title: 'Error!',
                text: 'Se produjo un error al intentar ingresar. Usuario no encontrado',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        });
    });

    test('Usuario real con password mal', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        // Simula el ingreso de credenciales inválidas
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
            target: { value: 'test@user.com' },
        });

        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: '12340' },
        });

        fireEvent.click(screen.getByText('Iniciar Sesión'));

        // Espera a que se procese la solicitud real
        await waitFor(() => {
            // Verifica que swal.fire haya sido llamado para mostrar un error
            expect(Swal.fire).toHaveBeenCalledWith({
                title: 'Error!',
                text: 'Se produjo un error al intentar ingresar. Contraseña incorrecta',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        });
    });

});