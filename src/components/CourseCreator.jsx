import { useState, useEffect } from "react";

function CourseCreator({ editingCourse, onSave, onCancel }) {
    // Between state allows edits to exist in between client and database save.
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        subjectArea: "",
        credits: "",
        courseNumber: "",
        semester: "Fall"
    });

    useEffect(() => {
        if (editingCourse) {
            setFormData({ 
                courseName: editingCourse.courseName || "",
                description: editingCourse.description || "",
                subjectArea: editingCourse.subjectArea || "",
                credits: editingCourse.credits || "",
                courseNumber: editingCourse.courseNumber || "",
                semester: editingCourse.semester || "Fall"
            });
        } else {
            // Clears form if teacher is creating new course.
            setFormData({ 
                courseName: "",
                description: "",
                subjectArea: "",
                credits: "",
                courseNumber: "", 
                semester: ""
            })
        }
    }, [editingCourse]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the typed data back up to the parent component (Teacher.jsx)
        onSave(formData);
    };

    return (
        <div className="course-form">
            <h3>{editingCourse ? "Edit Course" : "Create a New Course"}</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Number (e.g. SDEV255)"
                    value={formData.courseNumber}
                    onChange={(e) => setFormData({ ...formData, courseNumber: e.target.value })}
                    required
                /> 
                <input
                    type="text"
                    placeholder="Course Name (e.g. Web Application Development)"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    required
                /> 
                <input
                    type="text"
                    placeholder="Subject Area (e.g. Software Development"
                    value={formData.subjectArea}
                    onChange={(e) => setFormData({ ...formData, subjectArea: e.target.value })}
                    required
                /> 
                <input
                    type="number"
                    placeholder="Number of Credits"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    required
                /> 
                <textarea
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    required
                /> 
                <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                >
                    <option value="Fall">Fall Semester</option>
                    <option value="Spring">Spring Semester</option>
                </select>

                <div className="form-actions"
                    style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '10px'
                    }}
                >
                    <button type="submit" className="btn">
                        {editingCourse ? "Update Course" : "Create Course"}
                    </button>
                    <button type="button" className="btn cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CourseCreator;