function CourseCard(props) {
    return (
        <div className = "course-card">
            <span className="course-number">{props.number}</span>
            <h3>{props.title}</h3>
            <p>{props.dept}</p>
            <span className = "credits">{props.credits} Credits</span>
        </div>
    )
}

export default CourseCard