function EnrolledCourses({ officialCourses }) {
    // Calculate total registered credit hours
    const totalEnrolledCredits = officialCourses 
        ? officialCourses.reduce((sum, course) => sum + (course.credits) || 0, 0)
        : 0; 

    return (
        <div className="enrolled-courses-container">
            <div className="enrolled-header-row">
                <div>
                    <h2>My Schedule</h2>
                    <p className="enrolled-sub">
                        To the Batmobile!
                    </p>
                </div>
                <div className="enrolled-credit-total">
                    Registerd: <span>{totalEnrolledCredits} Credit Hours</span>
                </div>
            </div>

            {/* Validate fetch enrolled courses */}
            {!officialCourses || officialCourses.length === 0 ? (
                <div className="unregistered-fallback">
                    <p>You are not currently enrolled in any courses for the upcoming term.</p>
                    <span>Add courses and submit for enrollment.</span>
                </div>
                ) : (
                    <div className="enrolled-schedule-grid">
                        {officialCourses.map((course) => (
                            <div key={course._id} className="enrolled-course-card">
                                <div className="enrolled-card-header">
                                    <span className="enrolled-course-number">{course.courseNumber}</span>
                                    <span className="enrolled-course-term">{course.semester} Term</span>
                                </div>

                                <h3 className="enrolled-course-title">{course.name}</h3>
                                <p className="enrolled-course-subject">{course.subject}</p>
                                <p className="enrolled-course-desc">{course.description}</p>

                                <div className="enrolled-card-footer">
                                    <span className="enrolled-course-credits">{course.credits} Credits</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default EnrolledCourses;