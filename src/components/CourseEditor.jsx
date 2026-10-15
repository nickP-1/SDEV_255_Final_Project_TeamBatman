function CourseEditor({ course, onEdit, onDelete }) {
    {/* Action Buttons - Delete or Toggle Course Editor Function via ternary operator */}
    return (
        <div className="course-actions">
            <button className="edit-btn" onClick={() => onEdit(course)}>
                Edit Course
            </button>
            <button className="delete-btn" onClick={() => onDelete(course._id)}>
                Delete Course
            </button>
        </div>
    );
}

export default CourseEditor;