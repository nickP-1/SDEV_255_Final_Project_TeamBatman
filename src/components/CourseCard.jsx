import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={`course-card ${isExpanded ? 'expanded' : ''}`}>
            <div
                className="course-card-toggle"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((previous) => !previous)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setIsExpanded((previous) => !previous);
                    }

                    if (event.key === 'Escape') {
                        setIsExpanded(false);
                    }
                }}
            >
                <span className="course-number">{props.number}</span>
                <h3>{props.title}</h3>
                <p>{props.dept}</p>
                <span className="credits">{props.credits} Credits</span>

                <span className="expand-label">
                    {isExpanded ? 'Close details ▲' : 'View details ▼'}
                </span>
            </div>

            {isExpanded && (
                <div className="course-card-details">
                    <p className="course-description">
                        {props.description ||
                            'No description is available for this course yet.'}
                    </p>

                    <div className="course-card-actions">
                        <button
                            type="button"
                            className="add-to-checkout-btn"
                            onClick={() => navigate('/student')}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseCard;