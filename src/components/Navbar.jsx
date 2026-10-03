function Navbar({ onHomeClick, onTeacherClick }) {
    return (
        <nav className="navbar">

            <div className="nav-container">

                <a
                    href="#"
                    className="nav-logo"
                    onClick={(event) => {
                        event.preventDefault()
                        onHomeClick()
                    }}
                >
                    CourseHub
                </a>

                <div className="nav-links">

                    <a
                        href="#"
                        className="nav-link"
                        onClick={(event) => {
                            event.preventDefault()
                            onHomeClick()
                        }}
                    >
                        Home
                    </a>

                    <a href="courses.html" className="nav-link">
                        Courses
                    </a>

                    <a href="schedule.html" className="nav-link">
                        Schedule
                    </a>

                    <a href="login.html" className="nav-link">
                        Login
                    </a>

                    <button
                        className="nav-link teacher-nav-button"
                        onClick={onTeacherClick}
                    >
                        Teacher Portal
                    </button>

                </div>

            </div>

        </nav>
    )
}

export default Navbar
