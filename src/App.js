import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dash from './pages/Dash';

import './App.css';

function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dash />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;
