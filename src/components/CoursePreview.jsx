
import CourseCard from './CourseCard'

function CoursePreview({
    courses,
    checkoutCourses,
    onAddToCheckout,
    onRemoveFromCheckout
}) {
    console.log("Courses on Home:", courses)

    return (
        <section className="courses-preview">
            <div className="section-heading">
                <p className="eyebrow">EXPLORE</p>
                <h2>Available Courses</h2>
                <p>
                    Explore courses available for the upcoming semester.
                </p>
            </div>

            <div className="course-preview-layout">
                <div className="course-grid">
                    {courses.map((course) => {
                        const isInCheckout = checkoutCourses.some(
                            (item) => item.id === course.id
                        )

                        return (
                            <CourseCard
                                key={course.id}
                                number={course.number}
                                title={course.name}
                                dept={course.subject}
                                credits={course.credits}
                                description={course.description}
                                isInCheckout={isInCheckout}
                                onAddToCheckout={() =>
                                    onAddToCheckout(course)
                                }
                            />
                        )
                    })}
                </div>

                <aside className="checkout-sidebar">
                    <div className="checkout-header">
                        <h2>My Checkout</h2>
                        <span className="checkout-count">
                            {checkoutCourses.length}
                        </span>
                    </div>

                    {checkoutCourses.length === 0 ? (
                        <p className="empty-checkout">
                            No courses selected yet. Expand a course card
                            and click Add to Checkout to get started.
                        </p>
                    ) : (
                        <div className="checkout-list">
                            {checkoutCourses.map((course) => (
                                <div
                                    className="checkout-item"
                                    key={course.id}
                                >
                                    <div className="checkout-item-info">
                                        <span className="course-number">
                                            {course.number}
                                        </span>
                                        <h3>{course.name}</h3>
                                        <p>{course.credits} Credits</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="checkout-remove-btn"
                                        onClick={() =>
                                            onRemoveFromCheckout(course.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="checkout-footer">
                        <p>
                            Total selected: {checkoutCourses.length}{' '}
                            {checkoutCourses.length === 1
                                ? 'course'
                                : 'courses'}
                        </p>

                        <button
                            type="button"
                            className="checkout-submit-btn"
                            disabled={checkoutCourses.length === 0}
                            onClick={() =>
                                alert(
                                    'Database enrollment is not connected yet.'
                                )
                            }
                        >
                            Submit Enrollment
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default CoursePreview
