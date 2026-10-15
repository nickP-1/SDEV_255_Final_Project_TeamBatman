function StudentRegistry({ course, onRemoveStudent }) {
    return (
        <div className="students">
            <h4>Enrolled Students</h4>
            {course.students && course.students.length > 0 ? (
                course.students.map((student) => (
                    <div className="student-row" key={student._id || student.id}>
                        <span>{student.name || student.username}</span>
                        <button
                            className="remove-btn"
                            onClick={() => onRemoveStudent(course._id, student._id || student.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p style={{ fontSize: "0.9rem", color: "#a0aec0", margin: "5px 0 0 0" }}>
                    No students registered yet.
                </p>
            )}
        </div>
    );
}

export default StudentRegistry;