import React, { useState, useEffect } from 'react'

import { api_url } from '../utils/environment';

import { useDispatch, useSelector } from 'react-redux';

import { login, name } from '../utils/store';

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const Login = () => {

    const token = useSelector((state) => state.auth.token);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            return navigate('/dashboard');
        }
    }, [token, navigate]);

    const handleLogin = async (e) => {

        try {

            const response = await fetch(api_url + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {

                const data = await response.json();

                dispatch(login({ token: data.token }));

                dispatch(name({client: data.client}));

                navigate("/dashboard");

            } else {

                const data = await response.json();

                console.log(49, data);

                Swal.fire({
                    title: 'Error!',
                    text: 'Se produjo un error al intentar iniciar sesión. ' + data.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });

            }

        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'Se produjo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

        }

    };

    const toRegister = () => {
        navigate("/register");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <button onClick={toRegister} className="text-blue-600 hover:underline font-medium">
                            Crear una cuenta nueva
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Login;