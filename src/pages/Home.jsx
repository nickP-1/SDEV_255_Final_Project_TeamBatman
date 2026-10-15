import Hero from '../components/Hero';
import CoursePreview from '../components/CoursePreview';

function Home({
  checkoutCourses,
  onAddToCheckout,
  onRemoveFromCheckout
}) {
  return (
    <main>
      <Hero />

      <CoursePreview
        checkoutCourses={checkoutCourses}
        onAddToCheckout={onAddToCheckout}
        onRemoveFromCheckout={onRemoveFromCheckout}
      />
    </main>
  );
}

export default Home;
