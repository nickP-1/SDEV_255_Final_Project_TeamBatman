import { useState } from 'react'
import './style.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CoursePreview from './components/CoursePreview'
import Teacher from './pages/Teacher'


function App() {

    const [showTeacher, setShowTeacher] = useState(false)

    const [courses, setCourses] = useState([
        {
            id: 1,
            number: "CS 101",
            name: "Introduction to Programming",
            subject: "Computer Science",
            credits: 3,
            students: [
                { id: 1, name: "John Smith" },
                { id: 2, name: "Sarah Johnson" }
            ]
        },
        {
            id: 2,
            number: "MATH 101",
            name: "College Mathematics",
            subject: "Mathematics",
            credits: 3,
            students: [
                { id: 3, name: "Mike Brown" }
            ]
        },
        {
            id: 3,
            number: "ENG 101",
            name: "English Composition",
            subject: "English",
            credits: 3,
            students: []
        }
    ])


    return (
        <>
            <Navbar
                onHomeClick={() => setShowTeacher(false)}
                onTeacherClick={() => setShowTeacher(true)}
            />

            {showTeacher ? (

                <Teacher
                    courses={courses}
                    setCourses={setCourses}
                />

            ) : (

                <main>

                    <Hero />

                    <CoursePreview courses={courses} />

                </main>

            )}
        </>
    )
}

export default App