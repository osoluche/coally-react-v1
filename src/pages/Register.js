import React from 'react'

import { api_url } from '../utils/environment';


import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

export default function Register() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'El nombre debe tener al menos 4 caracteres').required('Ingresa un nombre'),
        email: Yup.string().email('Correo inválido').required('Correo es requerido'),
        password: Yup.string().min(3, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {

                            const response = await fetch(`${api_url}/register`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(values),
                            });

                            const data = await response.json();

                            if (response.ok) {

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registro exitoso',
                                    text: 'Te has registrado con éxito. Puedes iniciar sesión ahora.',
                                    confirmButtonText: 'Ir a Login'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleLogin();
                                    }
                                });

                            } else {

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Ocurrió un error al intentar registrarte, ' + data.message,
                                });

                            };

                            setSubmitting(false);

                        }} >

                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Nombre
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <ErrorMessage name="name" component="div" className="error text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Correo Electrónico
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="error text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Contraseña
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="error text-red-500 text-sm" />
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out" disabled={isSubmitting}>
                                        Login
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
                <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <button onClick={handleLogin} className="text-blue-600 hover:underline font-medium">
                            Iniciar sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

