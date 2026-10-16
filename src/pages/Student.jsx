import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../.config';
import CourseList from '../components/CourseList';
import ScheduleBuilder from '../components/ScheduleBuilder';
import EnrolledCourses from '../components/EnrolledCourses';
import '../student.css';

function Student({
    checkoutCourses = [],
    onRemoveFromCheckout,
}) {
    const [globalCatalog, setGlobalCatalog] = useState([]);
    const [savedSchedule, setSavedSchedule] = useState([]);
    const [draftSchedule, setDraftSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load the course catalog and the student's saved schedule.
    useEffect(() => {
        const loadStudentData = async () => {
            const token = localStorage.getItem('token');

            try {
                const catalogRes = await fetch(`${API_BASE_URL}/courses`);
                const catalogData = await catalogRes.json();

                if (catalogRes.ok) {
                    setGlobalCatalog(catalogData);
                }

                if (token) {
                    const scheduleRes = await fetch(
                        `${API_BASE_URL}/users/schedule`,
                        {
                            headers: { 'x-auth': token },
                        }
                    );

                    const scheduleData = await scheduleRes.json();

                    if (scheduleRes.ok) {
                        setSavedSchedule(scheduleData);
                        setDraftSchedule(scheduleData);
                    }
                }
            } catch (err) {
                console.error(
                    'Error while loading student schedule:',
                    err
                );
            } finally {
                setLoading(false);
            }
        };

        loadStudentData();
    }, []);

    // Add courses selected from the Home page to the draft schedule.
    useEffect(() => {
        if (checkoutCourses.length === 0) {
            return;
        }

        setDraftSchedule((currentCourses) => {
            const updatedCourses = [...currentCourses];

            checkoutCourses.forEach((course) => {
                const courseId = course._id ?? course.id;

                const alreadyAdded = updatedCourses.some(
                    (item) => (item._id ?? item.id) === courseId
                );

                if (!alreadyAdded) {
                    updatedCourses.push(course);
                }
            });

            return updatedCourses;
        });
    }, [checkoutCourses]);

    // Remove a course from the draft schedule.
    const handleRemoveCourse = (courseId) => {
        setDraftSchedule((currentCourses) =>
            currentCourses.filter(
                (course) => (course._id ?? course.id) !== courseId
            )
        );

        // Also clear it from the shared Home-page checkout state.
        onRemoveFromCheckout?.(courseId);
    };

    // Save the draft schedule to the backend.
    const handleSaveSchedule = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please log in before submitting your schedule.');
            return;
        }

        const courseIds = draftSchedule
            .map((course) => course._id ?? course.id)
            .filter(Boolean);

        try {
            const response = await fetch(
                `${API_BASE_URL}/users/schedule`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth': token,
                    },
                    body: JSON.stringify({ courseIds }),
                }
            );

            const updatedSchedule = await response.json();

            if (!response.ok) {
                alert(
                    `Failed to save: ${
                        updatedSchedule.error || 'Unknown server error.'
                    }`
                );
                return;
            }

            setSavedSchedule(updatedSchedule);
            setDraftSchedule(updatedSchedule);

            // Clear the Home-page checkout after a successful save.
            updatedSchedule.forEach((course) => {
                onRemoveFromCheckout?.(course._id ?? course.id);
            });

            const courseListNames = updatedSchedule
                .map(
                    (course) =>
                        `${course.courseNumber ?? course.number ?? ''} - ${
                            course.name ?? course.courseName ?? 'Course'
                        }`
                )
                .join('\n');

            alert(
                `Your schedule was saved successfully:\n\n${
                    courseListNames || 'No courses selected.'
                }`
            );
        } catch (err) {
            console.error('Error saving schedule:', err);
            alert('Network error while submitting your schedule.');
        }
    };

    if (loading) {
        return <p className="loading-message">Loading Campus Registry...</p>;
    }

    return (
        <main className="student-page">
            <section className="student-header">
                <p className="eyebrow">STUDENT PORTAL</p>
                <h1>
                    Welcome, {localStorage.getItem('firstName') || 'Student'}.
                </h1>
                <p>
                    Search courses by name, course number, discipline or term.
                    Draft your schedule and submit for enrollment.
                </p>
            </section>

           <EnrolledCourses officialCourses={savedSchedule} />

<div className="workspace-split">
    <div className="student-course-list">
        <CourseList
            catalog={globalCatalog}
            onAdd={(course) => {
                setDraftSchedule((currentCourses) => {
                    const courseId = course._id ?? course.id;

                    if (
                        currentCourses.some(
                            (item) =>
                                (item._id ?? item.id) === courseId
                        )
                    ) {
                        return currentCourses;
                    }

                    return [...currentCourses, course];
                });
            }}
        />
    </div>

                <div className="student-schedule-builder">
                    <ScheduleBuilder
                        draft={draftSchedule}
                        onRemove={handleRemoveCourse}
                        onSave={handleSaveSchedule}
                    />
                </div>
            </div>
        </main>
    );
}

export default Student;