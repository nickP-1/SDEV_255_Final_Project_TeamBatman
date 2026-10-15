import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './style.css';

import Navbar from './components/Navbar';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';

function App() {
  const [checkoutCourses, setCheckoutCourses] = useState([]);

  function addToCheckout(course) {
    setCheckoutCourses((currentCourses) => {
      const courseId = course._id ?? course.id;

      const alreadyAdded = currentCourses.some(
        (item) => (item._id ?? item.id) === courseId
      );

      if (alreadyAdded) {
        return currentCourses;
      }

      return [...currentCourses, course];
    });
  }

  function removeFromCheckout(courseId) {
    setCheckoutCourses((currentCourses) =>
      currentCourses.filter(
        (course) => (course._id ?? course.id) !== courseId
      )
    );
  }

  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              checkoutCourses={checkoutCourses}
              onAddToCheckout={addToCheckout}
              onRemoveFromCheckout={removeFromCheckout}
            />
          }
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
