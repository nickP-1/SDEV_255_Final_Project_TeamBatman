
import { useState } from 'react'
import './style.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CoursePreview from './components/CoursePreview'
import Teacher from './pages/Teacher'

function App() {
    const [showTeacher, setShowTeacher] = useState(false)

    const [checkoutCourses, setCheckoutCourses] = useState([])

    const [courses, setCourses] = useState([
        {
            id: 1,
            number: "CS 101",
            name: "Introduction to Programming",
            subject: "Computer Science",
            credits: 3,
            description:
                "course example 1",
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
            description:
                "course example 2",
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
            description:
                "course example 3",
            students: []
        }
    ])

    function addToCheckout(course) {
        setCheckoutCourses((currentCourses) => {
            const alreadyAdded = currentCourses.some(
                (item) => item.id === course.id
            )

            if (alreadyAdded) {
                return currentCourses
            }

            return [...currentCourses, course]
        })
    }

    function removeFromCheckout(courseId) {
        setCheckoutCourses((currentCourses) =>
            currentCourses.filter(
                (course) => course.id !== courseId
            )
        )
    }

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

                    <CoursePreview
                        courses={courses}
                        checkoutCourses={checkoutCourses}
                        onAddToCheckout={addToCheckout}
                        onRemoveFromCheckout={removeFromCheckout}
                    />
                </main>
            )}
        </>
    )
}

export default App
