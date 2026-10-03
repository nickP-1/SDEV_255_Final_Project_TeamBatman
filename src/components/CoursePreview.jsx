
import CourseCard from './CourseCard'

function CoursePreview({ courses }) {
    console.log("Courses on Home:", courses)

    return (
        <section className="courses-preview">

            <div className="section-heading">

                <p className="eyebrow">EXPLORE</p>

                <h2>Available Courses</h2>

                <p>
                    Explore courses available for the upcoming semester.
                </p>

            </div>

            <div className="course-grid">

                {courses.map((course) => (

                    <CourseCard
                        key={course.id}
                        number={course.number}
                        title={course.name}
                        dept={course.subject}
                        credits={course.credits}
                    />

                ))}

            </div>

        </section>
    )
}

export default CoursePreview