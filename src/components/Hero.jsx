import { Link } from 'react-router-dom';

function Hero() {
  const firstName = localStorage.getItem('firstName');
  const token = localStorage.getItem('token');

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">
          COURSEHUB
        </p>

        <h1>
          {token && firstName
            ? `Welcome back, ${firstName}`
            : 'Welcome to CourseHub'}
        </h1>

        <p>
          Navigate your course schedule smoothly
          and make your learning journey a breeze.
        </p>

        <Link to="/courses" className="btn">
          Explore Courses
        </Link>
      </div>
    </section>
  );
}

export default Hero;
