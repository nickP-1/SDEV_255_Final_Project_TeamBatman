import React, { useState } from 'react';
import { API_BASE_URL } from '../../.config';

function CourseForm() {
    const [formData, setFormData] = useState({
        courseName: '',
        courseNumber: '',
        description: '',
        subjectArea: '',
        credits: '',
        semester: 'Fall',
        createdBy: 'Professor Smith'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Constant used to switch between testing and production URLS. --> .config to switch. 
            fetch(`${API_BASE_URL}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    credits: Number(formData.credits)
                })
            });
            if (response.ok) {
                alert("Course succesfully added")
                window.location.reload();
            }
            else {
                alert("Submission failed.");
            }
        } catch (err) {
            console.error("Submission pipeline failure:", err);
        }
    };

    return (
        <section className="course-form-section">
            <h2>Teacher Dashboard: Add Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Course Name (e.g. Web Application Development)" required value={formData.courseName} onChange={e => setFormData({...formData, courseName: e.target.value})} />
                <input type="text" placeholder="Course Number (e.g. SDEV 255)" required value={formData.courseNumber} onChange={e => setFormData({...formData, courseNumber: e.target.value})} />
                <input type="text" placeholder="Course Description (e.g. Learn webdev)" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input type="text" placeholder="Subject Area (e.g. Software Development)" required value={formData.subjectArea} onChange={e => setFormData({...formData, subjectArea: e.target.value})} />
                <input type="text" placeholder="Number of Credits (e.g. 3)" required value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} />

                <select value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})}>
                    <option value="Fall">Fall Semester</option>
                    <option value="Spring">Spring Semester</option>
                </select>

                <input type="text" placeholder="Created By" required value={formData.createdBy} onChange={e => setFormData({...formData, createdBy: e.target.value})}/>
                <button type="submit" className="btn">Create Class</button>
            </form>
        </section>
    )
}

export default CourseForm