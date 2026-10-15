import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../.config';
import CourseList from "../components/CourseList";
import ScheduleBuilder from "../components/ScheduleBuilder";
import EnrolledCourses from "../components/EnrolledCourses";
import "../student.css";

function Student() {
    const [globalCatalog, setGlobalCatalog] = useState([]);  // Master course list
    const [savedSchedule, setSavedSchedule] = useState([]);  // DB enrolled list
    const [draftSchedule, setDraftSchedule] = useState([]);  // "Shopping Cart" list
    const [loading, setLoading] = useState(true);

    // Fetch all required assets on load
    useEffect(() => {
        const loadStudentData = async () => {
            const token = localStorage.getItem("token");
            
            try {
                // Fetch global catalog for CourseList -- GET
                const catalogRes = await fetch(`${API_BASE_URL}/courses`);
                const catalogData = await catalogRes.json();

                // Fetch student's official saved schedule from userRoutes -- GET
                const scheduleRes = await fetch(`${API_BASE_URL}/users/schedule`, {
                    headers: { "x-auth": token },
                });
                const scheduleData = await scheduleRes.json();

                if (catalogRes.ok) setGlobalCatalog(catalogData);
                if (scheduleRes.ok) {
                    setSavedSchedule(scheduleData);
                    setDraftSchedule(scheduleData);  // This initializes the car with DB enrolled list
                }
            } catch (err) {
                console.error("Error while connecting to students schedule:", err);
            } finally {
                setLoading(false);
            }
        };

        loadStudentData();
    }, []);

    // SHOPPING CART LIST - Interacts with local React state
    const handleAddCourse = (course) => {
        // Prevent duplicate enrollments in the draftSchedule
        if (draftSchedule.some((item) => item._id === course._id)) {
            alert("You have already added this course to your cart.");
            return;
        }
        setDraftSchedule([...draftSchedule, course]);
    };

    // SHOPPING CART LIST - Removes a course from the local React state.
    const handleRemoveCourse = (courseId) => {
        setDraftSchedule(draftSchedule.filter((item) => item._id !== courseId));
    };


    // DATABASE COMMIT (PUT to userRoutes)
    const handleSaveSchedule = async () => {
        const token = localStorage.getItem("token");
        // Extracting only the raw hex IDs from the draft array to feed into the backend
        const courseIds = draftSchedule.map((item) => item._id);  

        try {
            const response = await fetch(`${API_BASE_URL}/users/schedule`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": token,
                },
                body: JSON.stringify({ courseIds }),
            });

            const updatedSchedule = await response.json();

            if (response.ok) {
                setSavedSchedule(updatedSchedule);
                setDraftSchedule(updatedSchedule);

                const courseListNames = updatedSchedule
                .map((course) => `${course.courseNumber} - ${course.name}`)
                .join("\n");

                alert(`You have been successfully enrolled in the following courses:\n\n ${courseListNames}`);
            } else {
                alert(`Failed to save: ${updatedSchedule.error}`);
            }
        } catch (err) {
            alert("Network exception committing schedule.");
        }
    };

    if (loading) {
        return <p className='loading-message'>Loading Campus Registry...</p>;
    }

    return (
        <main className='student-page'>
            <section className='student-header'>
                <p className='eyebrow'>STUDENT PORTAL</p>
                <h1>Welcome, {localStorage.getItem("firstName") || "Student"}.</h1>
                <p>Search courses by name, course number, discipline or term. Draft your schedule and submit for enrollment.</p>
            </section>

            <EnrolledCourses officialCourses={savedSchedule} /> 

            <div className='workspace-split'>
                <div className='student-course-list'>
                    <CourseList catalog={globalCatalog} onAdd={handleAddCourse} />
                </div>

                <div className='student-schedule-builder'>
                    <ScheduleBuilder
                        draft={draftSchedule}
                        onRemove={handleRemoveCourse}
                        onSave={handleSaveSchedule}
                    />     
                </div>                
            </div>
        </main>
    )
}

export default Student;