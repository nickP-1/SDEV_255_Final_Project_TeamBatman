import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { API_BASE_URL } from '../../.config';

function CoursePreview() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadCourses() {
            try {
                const response = await fetch(`${API_BASE_URL}/courses`);

                if (!response.ok) {
                    throw new Error('Could not load courses.');
                }

                const data = await response.json();
                setCourses(data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Unable to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, []);

    if (loading) {
        return <div className="courses-preview">Loading courses...</div>;
    }

    if (error) {
        return (
            <div className="courses-preview" role="alert">
                {error}
            </div>
        );
    }

    return (
        <section className="courses-preview">
            <div className="section-heading">
                <p className="eyebrow">EXPLORE</p>
                <h2>Available Courses</h2>
                <p>Explore courses available for the upcoming semester.</p>
            </div>

            {courses.length === 0 ? (
                <p>No courses are currently available.</p>
            ) : (
                <div className="course-grid">
                    {courses.map((course) => (
                        <CourseCard
                            key={course._id ?? course.id}
                            number={course.courseNumber ?? course.number}
                            title={course.courseName ?? course.name}
                            dept={course.subjectArea ?? course.subject}
                            credits={String(course.credits ?? 0)}
                            description={course.description}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default CoursePreview;