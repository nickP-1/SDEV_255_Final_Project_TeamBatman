import { useState } from 'react';

function CourseList({ catalog, onAdd }) {

    const [searchQuery, setSearchQuery] = useState("");

    // Fall back if catalog hasn't finished loading (Student.jsx)
    if (!catalog || catalog.length === 0) {
        return (
            <div className='catalog-container'>
                <h2>Available Courses</h2>
                <p className='catalog-loading-text'>Retrieving school catalog...</p>
            </div>
        );
    }

    // Dynamic search using .includes(query). Filters by course name, course number or subject area.
    const filteredCatalog = catalog.filter((course) => {
        const query = searchQuery.toLocaleLowerCase();
        const matchesName = course.name?.toLowerCase().includes(query);
        const matchesNumber = course.courseNumber?.toLowerCase().includes(query);
        const matchesSubject = course.subject?.toLowerCase().includes(query);

        return matchesName || matchesNumber || matchesSubject;
    });

    // Splits the search results into separate term blocks
    const fallCourses = filteredCatalog.filter(course => course.semester === "Fall");
    const springCourses = filteredCatalog.filter(course => course.semester === "Spring");

    return (
        <div className='catalog-container'>
            {/* Search Bar */}
            <div className='search-bar'>
                <input
                    type='text'
                    className='search-input'
                    placeholder=''
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /> 
            </div>
            {/* =========================== FALL SEMESTER SECTION ============================ */}
            <div className='semester-section'>
                <h2 className='semester-heading'>Available This Fall</h2>

                {fallCourses.length === 0 ? (
                    <p className='no-courses-fallback'>No Fall courses match your criteria.</p>
                ) : ( 
                    <div className='catalog-grid'>
                        {fallCourses.map((course) => (
                            <div key={course._id} className='schedbuild-item-card'>
                                <div className='schedbuild-item-details'>
                                    <span className='schedbuild-item-heading'>
                                        {course.courseNumber} | {course.courseName}
                                    </span>
                                    <span className='schedbuild-item-sub'>
                                        Subject: {course.subjectArea} | {course.credits} Credits
                                    </span>
                                    <p className='catalog-item-desc'>
                                        {course.description}
                                    </p>
                                </div>
                                <button
                                    className='add-course-btn'
                                    onClick={() => onAdd(course)}
                                >
                                    Add Course
                                </button>
                            </div>    
                        ))}
                    </div> 
                )}
            </div>

            {/* ============================= SPRING SEMESTER SECTION ============================= */}
            <div className='semester-section'>
                <h2 className='semester-heading'>Available This Spring</h2>

                {springCourses.length === 0 ? (
                    <p className='no-courses-fallback'>No Spring courses match your criteria.</p>
                ) : (
                    <div className='catalog-grid'>
                        {springCourses.map((course) => (
                            <div key={course._id} className='schedbuild-item-card'>
                                <div className='schedbuild-item-details'>
                                    <span className='shedbuild-item-heading'>
                                        {course.courseNumber} | {course.courseName}
                                    </span>
                                    <span className='schedbuild-item-sub'>
                                        Subject: {course.subjectArea} | {course.credits} Credits
                                    </span>
                                    <p className='catalog-item-desc'>
                                        {course.description}
                                    </p>
                                </div>
                                <button
                                    className='add-course-btn'
                                    onClick={() => onAdd(course)}
                                >
                                    Add Course
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>  
    );
}

export default CourseList;