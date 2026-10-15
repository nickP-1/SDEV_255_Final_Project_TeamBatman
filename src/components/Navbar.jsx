
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem('firstName');

  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error('Invalid session token:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
    }
  }

  function handleLogout() {
    if (!window.confirm('Are you sure you want to sign out?')) {
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('firstName');

    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span style={{ color: 'var(--white)' }}>Course</span>Hub
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/courses" className="nav-link">
            Courses
          </Link>

          <Link to="/schedule" className="nav-link">
            Schedule
          </Link>

          {!token && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}

          {token && userRole === 'student' && (
            <Link to="/student" className="nav-link">
              Student Portal
            </Link>
          )}

          {token && userRole === 'teacher' && (
            <Link to="/teacher" className="nav-link">
              Teacher Portal
            </Link>
          )}

          {token && (
            <div className="session-controls">
              <span className="nav-accents">
                {firstName || 'User'}
              </span>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
