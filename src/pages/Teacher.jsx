function Teacher() {

    // Temporary course data
    const courses = [
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
        }
    ]

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

                    <button className="btn">
                        Create Course
                    </button>

                </div>


                <div className="teacher-course-list">

                    {courses.map((course) => (

                        <div className="teacher-course-card" key={course.id}>

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

                                <button className="edit-btn">
                                    Edit Course
                                </button>

                                <button className="delete-btn">
                                    Delete Course
                                </button>

                            </div>


                            <div className="students">

                                <h4>Enrolled Students</h4>

                                {course.students.map((student) => (

                                    <div className="student-row" key={student.id}>

                                        <span>
                                            {student.name}
                                        </span>

                                        <button className="remove-btn">
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