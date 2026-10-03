import { useState } from 'react'


function Teacher({ courses, setCourses }) {

    const [showForm, setShowForm] = useState(false)

    const [editingCourseId, setEditingCourseId] = useState(null)

    const [newCourse, setNewCourse] = useState({
        number: "",
        name: "",
        subject: "",
        credits: ""
    })


    function createCourse() {

        const course = {
            id: Date.now(),
            number: newCourse.number,
            name: newCourse.name,
            subject: newCourse.subject,
            credits: Number(newCourse.credits),
            students: []
        }

        setCourses([...courses, course])

        setNewCourse({
            number: "",
            name: "",
            subject: "",
            credits: ""
        })

        setShowForm(false)
    }


    function deleteCourse(courseId) {

        setCourses(
            courses.filter((course) => course.id !== courseId)
        )
    }


    function editCourse(course) {

        setEditingCourseId(course.id)

        setNewCourse({
            number: course.number,
            name: course.name,
            subject: course.subject,
            credits: course.credits
        })

        setShowForm(true)
    }


    function updateCourse() {

        setCourses(
            courses.map((course) =>
                course.id === editingCourseId
                    ? {
                        ...course,
                        number: newCourse.number,
                        name: newCourse.name,
                        subject: newCourse.subject,
                        credits: Number(newCourse.credits)
                    }
                    : course
            )
        )

        setNewCourse({
            number: "",
            name: "",
            subject: "",
            credits: ""
        })

        setEditingCourseId(null)
        setShowForm(false)
    }


    function removeStudent(courseId, studentId) {

        setCourses(
            courses.map((course) =>
                course.id === courseId
                    ? {
                        ...course,
                        students: course.students.filter(
                            (student) => student.id !== studentId
                        )
                    }
                    : course
            )
        )
    }


    return (
        <main className="teacher-page">

            <section className="teacher-header">

                <p className="eyebrow">TEACHER PORTAL</p>

                <h1>Teacher Dashboard</h1>

                <p>
                    Manage your courses and enrolled students.
                </p>

            </section>


            <section className="teacher-courses">

                <div className="teacher-section-header">

                    <div>
                        <h2>My Courses</h2>
                        <p>Manage the courses you teach.</p>
                    </div>

                    <button
                        className="btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Create Course
                    </button>

                </div>


                {showForm && (
                    <div className="course-form">

                        <h3>
                            {editingCourseId === null
                                ? "Create a New Course"
                                : "Edit Course"
                            }
                        </h3>

                        <input
                            type="text"
                            placeholder="Course Number"
                            value={newCourse.number}
                            onChange={(event) =>
                                setNewCourse({
                                    ...newCourse,
                                    number: event.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Course Name"
                            value={newCourse.name}
                            onChange={(event) =>
                                setNewCourse({
                                    ...newCourse,
                                    name: event.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            value={newCourse.subject}
                            onChange={(event) =>
                                setNewCourse({
                                    ...newCourse,
                                    subject: event.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Credits"
                            value={newCourse.credits}
                            onChange={(event) =>
                                setNewCourse({
                                    ...newCourse,
                                    credits: event.target.value
                                })
                            }
                        />

                        <button
                            className="btn"
                            onClick={
                                editingCourseId === null
                                    ? createCourse
                                    : updateCourse
                            }
                        >
                            {editingCourseId === null
                                ? "Create Course"
                                : "Update Course"
                            }
                        </button>

                    </div>
                )}


                <div className="teacher-course-list">

                    {courses.map((course) => (

                        <div
                            className="teacher-course-card"
                            key={course.id}
                        >

                            <div className="course-info">

                                <span className="course-number">
                                    {course.number}
                                </span>

                                <h3>{course.name}</h3>

                                <p>{course.subject}</p>

                                <span className="credits">
                                    {course.credits} Credits
                                </span>

                            </div>


                            <div className="course-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => editCourse(course)}
                                >
                                    Edit Course
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteCourse(course.id)}
                                >
                                    Delete Course
                                </button>

                            </div>


                            <div className="students">

                                <h4>Enrolled Students</h4>

                                {course.students.map((student) => (

                                    <div
                                        className="student-row"
                                        key={student.id}
                                    >

                                        <span>
                                            {student.name}
                                        </span>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeStudent(
                                                    course.id,
                                                    student.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    )
}


export default Teacher