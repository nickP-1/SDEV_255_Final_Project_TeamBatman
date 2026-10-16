import Hero from '../components/Hero';
import CoursePreview from '../components/CoursePreview';

function Home({ onAddToCheckout }) {
    return (
        <main>
            <Hero />

            <CoursePreview
                onAddToCheckout={onAddToCheckout}
            />
        </main>
    );
}

export default Home;