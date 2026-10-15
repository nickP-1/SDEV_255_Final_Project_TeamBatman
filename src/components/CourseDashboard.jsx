import CourseEditor from "./CourseEditor";
import StudentRegistry from "./StudentRegistry";

function CourseDashboard ({ courses, onEdit, onDelete, onRemoveStudent }) {
    if (!courses || courses.length === 0) {
        return (
            <p style= {{ color: "#718096", textAlign: "center", padding: "20px" }}>
                You haven't created any courses yet.
            </p>
        );
    }

    return (
        <div className="teacher-course-list">
            {courses.map((course) => (
                <div className="teacher-course-card" key={course._id}>
                    {/* Main Course Details Group */}
                    <div className="course-info">
                        <span className="course-number">{course.courseNumber}</span>
                        <h3>{course.name}</h3>
                        <p><strong>Subject:</strong> {course.subject} | <strong>Term:</strong> {course.semester}</p>
                        <p className="course-desc-preview">{course.description}</p>
                        <span className="credits">{course.credits} Credits</span>
                    </div>

                    {/* Delete or Toggle Course Editor function via 
                        ternary operator logic in CourseCreator Component */}
                    <CourseEditor 
                        course={course}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />

                    {/* Enrolled Students Tracker */}
                    <StudentRegistry
                    course={course}
                    onRemoveStudent={onRemoveStudent}
                    />
                </div>
            ))}
        </div>
    );
}

export default CourseDashboard;