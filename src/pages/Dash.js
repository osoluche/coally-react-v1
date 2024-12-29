import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/store';
import { api_url } from '../utils/environment';
import Swal from 'sweetalert2';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt, faCheckCircle, faClock, faClose, faEdit, faPlus, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dash = () => {

    const token = useSelector((state) => state.auth.token);
    const uname = useSelector((state) => state.auth.client);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({ title: '', description: '' })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    const [filter, setFilter] = useState('all')

    useEffect(() => {

        if (!token) {
            return navigate('/');
        }
        
        fetchTasks();

    }, [token, navigate]);

    const fetchTasks = async (args = false) => {

        const response = await fetch(api_url + '/tasks?completed=' + args, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })

        const data = await response.json()

        if (Array.isArray(data)) {
            setTasks(data);
        }

        setFilter(args ? "completed" : "pending");
    }

    const addTask = async () => {

        const response = await fetch(api_url + '/tasks', {
            method: 'POST',
            body: JSON.stringify({ ...newTask, completed: false }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (response.ok) {

            setNewTask({ title: '', description: '' })

            setIsModalOpen(false)

            fetchTasks();

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.errors.map(error => error.msg).join(', ')
            });

        }
    }

    const updateTask = async (task) => {

        console.log(83, task);
        console.log(84, { title: task.title, description: task.description });

        const response = await fetch(api_url + '/tasks/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify({ title: task.title, description: task.description }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (response.ok) {

            fetchTasks();

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.msg
            });

        }
    }

    const toggleTaskStatus = async (id) => {

        const response = await fetch(api_url + '/tasks/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ completed: true }),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });

        if (response.ok) {
            fetchTasks();
        }

    }

    const openEditModal = (task) => {
        setEditingTask(task)
        setNewTask(task)
    }

    const saveEditedTask = () => {

        if (editingTask) {
            updateTask({ ...editingTask, ...newTask })
            setEditingTask(null)
            setNewTask({ title: '', description: '' })
            setIsModalOpen(false)
        }

    }

    const deleteTask = (task) => {

        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrá recuperar esta tarea una vez eliminada.",
            icon: 'warning',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarla!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (result.isConfirmed) {

                const response = await fetch(api_url + '/tasks/' + task._id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                if (response.ok) {
                    Swal.fire(
                        'Eliminada!',
                        'La tarea ha sido eliminada.',
                        'success'
                    );
                    
                    setEditingTask(null)
                    setNewTask({ title: '', description: '' })
                    setIsModalOpen(false)

                    fetchTasks();
                }
            }
        });


    }

    const formatDate = (args) => {
        return moment(args).format("YYYY-MM-DD H:mm:ss");
    }

    const closeSesion = () => {
        dispatch(logout());
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Tareas de {uname}</h1>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => fetchTasks(false)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                <FontAwesomeIcon icon={faClock} /> Pendientes
                            </button>

                            <button
                                onClick={() => fetchTasks(true)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} /> Completadas
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setEditingTask(null)
                                setNewTask({ title: '', description: '' })
                                setIsModalOpen(true)
                            }}
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Nueva Tarea

                        </button>
                    </div>

                    <ul className="space-y-4">
                        {tasks.map(task => (
                            <li key={task._id} className={`flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${task.completed ? 'opacity-50' : ''}`}>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <button
                                        onClick={() => toggleTaskStatus(task._id)}
                                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
                                    >
                                        {task.completed && (
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        )}
                                    </button>
                                    <div className="flex-grow min-w-0">
                                        <h3 className={`font-semibold text-sm sm:text-base truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 truncate">{task.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openEditModal(task)}
                                    className="text-blue-500 hover:text-blue-600 text-sm sm:text-base ml-2 sm:ml-4 flex-shrink-0">
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={closeSesion}
                            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                        >
                            Cerrar sesion
                        </button>
                    </div>

                </div>
            </div>

            {/* Sidebar para editar tarea */}
            <div className={`fixed rounded-[10px] inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${editingTask ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col p-6">

                    <div className='flex flex-row justify-between items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0'>
                        
                        <h2 className="text-2xl font-bold text-green-500">Editar Tarea</h2>

                        <button onClick={() => setEditingTask(null)} className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
                            <FontAwesomeIcon icon={faClose} /> Cerrar
                        </button>
                    </div>

                    {newTask.createdAt && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                <FontAwesomeIcon icon={faCalendar} /> Creada: {formatDate(newTask.createdAt)}
                            </p>

                            {newTask.updatedAt && (
                                <p className="text-sm text-gray-600">
                                    <FontAwesomeIcon icon={faCalendarAlt} /> Actualizada: {formatDate(newTask.updatedAt)}
                                </p>
                            )}
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Título"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full p-2 mb-4 border rounded"
                    />

                    <textarea
                        placeholder="Descripción"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full p-2 mb-4 border rounded flex-grow">
                    </textarea>

                    <div className="flex justify-around w-full mt-auto flex flex-col">

                        <button onClick={() => deleteTask(newTask)} className="mb-3 px-4 py-2 bg-blue-500 text-white rounded bg-red-500 hover:bg-gray-300">
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                        </button>

                        <button onClick={saveEditedTask}            className="mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            <FontAwesomeIcon icon={faSave} /> Guardar Cambios
                        </button>

                    </div>

                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                        <input
                            type="text"
                            placeholder="Título"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
                        />
                        <textarea
                            placeholder="Descripción"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="w-full p-2 mb-4 border rounded h-24 sm:h-32 text-sm sm:text-base"
                        ></textarea>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
                            >
                                <FontAwesomeIcon icon={faTimes} /> Cancelar
                            </button>
                            <button
                                onClick={editingTask ? saveEditedTask : addTask}
                                className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
                            >
                                <FontAwesomeIcon icon={faSave} /> {editingTask ? 'Guardar Cambios' : 'Añadir Tarea'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Dash;