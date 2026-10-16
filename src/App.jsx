import { HashRouter, Routes, Route } from 'react-router-dom';
import './style.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;