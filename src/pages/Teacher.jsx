import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../.config';
import CourseDashboard from '../components/CourseDashboard';
import CourseCreator from '../components/CourseCreator';

function Teacher() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeacherCourses();
    }, []);

    const fetchTeacherCourses = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE_URL}/courses/teacher`, {
               headers: { "x-auth": token } 
            });
            if (!response.ok) throw new Error("Failed to load catalog entries.");
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCourse = async (formData) => {
        const token = localStorage.getItem("token");
        const method = editingCourse ? "PUT" : "POST";
        const urlPath = editingCourse ? `/courses/${editingCourse._id}` : "/courses";

        try {
            const response = await fetch(`${API_BASE_URL}${urlPath}`, {
                method: method,
                headers: { "Content-Type": "application/json", "x-auth": token },
                body: JSON.stringify({ ...formData, credits: Number(formData.credits) })
            });

            if (!response.ok) throw new Error("Failed to save data to database.");

            alert(editingCourse ? "Course edits saved" : "Course created successfully");
            handleCloseForm();
            fetchTeacherCourses();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Permanently drop this course from the school catalog?")) return;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                method: "DELETE",
                headers: { "x-auth": token }
            });
            
            if (!response.ok) throw new Error("Failed to delete course.");
            fetchTeacherCourses();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEditClick = (course) => {
        setEditingCourse(course);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setEditingCourse(null);
        setShowForm(false);
    };

    if (loading) return <p>Loading Teacher Workspace...</p>;

    return (
        <main className='teacher-page'>
            <section className='teacher-header'>
                <p className='eyebrow'>FACULTY INTERFACE</p>
                <h1>Welcome, Professor {localStorage.getItem("lastName")}.</h1>
            </section>
            
            <section className='teacher-courses'>
                <div className='teacher-section-header'>
                    <h2>My Active Course Templates</h2>
                    {!showForm && <button className='btn' onClick={() => setShowForm(true)}>Create Course</button>}
                </div>

                {showForm && (
                    <CourseCreator
                        editingCourse={editingCourse}
                        onSave={handleSaveCourse}
                        onCancel={handleCloseForm}
                    />
                )}

                <CourseDashboard
                    courses={courses}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteCourse}
                />
            </section>
        </main>
    );
}

export default Teacher;




// import { useState } from 'react'

// function Teacher({ courses, setCourses }) {

//     const [showForm, setShowForm] = useState(false)

//     const [editingCourseId, setEditingCourseId] = useState(null)

//     const [cart, setCart] = useState([])

//     const [newCourse, setNewCourse] = useState({
//         number: "",
//         name: "",
//         subject: "",
//         credits: "",
//         description: ""
//     })


//     function createCourse() {

//         const course = {
//             id: Date.now(),
//             number: newCourse.number,
//             name: newCourse.name,
//             subject: newCourse.subject,
//             credits: Number(newCourse.credits),
//             description: newCourse.description,
//             students: []
//         }

//         console.log("Creating course:", course)

//         setCourses([...courses, course])

//         setNewCourse({
//             number: "",
//             name: "",
//             subject: "",
//             credits: "",
//             description: ""
//         })

//         setShowForm(false)
//     }


//     function deleteCourse(courseId) {

//         setCourses(
//             courses.filter((course) => course.id !== courseId)
//         )

//         // Also remove the course from the cart if it was there
//         setCart(
//             cart.filter((course) => course.id !== courseId)
//         )
//     }


//     function editCourse(course) {

//         setEditingCourseId(course.id)

//         setNewCourse({
//             number: course.number,
//             name: course.name,
//             subject: course.subject,
//             credits: course.credits,
//             description: course.description || ""
//         })

//         setShowForm(true)
//     }


//     function updateCourse() {

//         setCourses(
//             courses.map((course) =>
//                 course.id === editingCourseId
//                     ? {
//                         ...course,
//                         number: newCourse.number,
//                         name: newCourse.name,
//                         subject: newCourse.subject,
//                         credits: Number(newCourse.credits),
//                         description: newCourse.description
//                     }
//                     : course
//             )
//         )

//         // Update the course in the cart if it is already there
//         setCart(
//             cart.map((course) =>
//                 course.id === editingCourseId
//                     ? {
//                         ...course,
//                         number: newCourse.number,
//                         name: newCourse.name,
//                         subject: newCourse.subject,
//                         credits: Number(newCourse.credits),
//                         description: newCourse.description
//                     }
//                     : course
//             )
//         )

//         setNewCourse({
//             number: "",
//             name: "",
//             subject: "",
//             credits: "",
//             description: ""
//         })

//         setEditingCourseId(null)
//         setShowForm(false)
//     }


//     function removeStudent(courseId, studentId) {

//         setCourses(
//             courses.map((course) =>
//                 course.id === courseId
//                     ? {
//                         ...course,
//                         students: course.students.filter(
//                             (student) => student.id !== studentId
//                         )
//                     }
//                     : course
//             )
//         )
//     }


//     function addToCart(course) {

//         // Prevent the same course from being added twice
//         const alreadyInCart = cart.some(
//             (cartCourse) => cartCourse.id === course.id
//         )

//         if (alreadyInCart) {
//             return
//         }

//         setCart([...cart, course])
//     }


//     function removeFromCart(courseId) {

//         setCart(
//             cart.filter((course) => course.id !== courseId)
//         )
//     }


//     return (
//         <main className="teacher-page">

//             <section className="teacher-header">

//                 <p className="eyebrow">TEACHER PORTAL</p>

//                 <h1>Teacher Dashboard</h1>

//                 <p>
//                     Manage your courses and enrolled students.
//                 </p>

//             </section>


//             <div className="teacher-layout">

//                 {/* COURSE SECTION */}

//                 <section className="teacher-courses">

//                     <div className="teacher-section-header">

//                         <div>
//                             <h2>My Courses</h2>

//                             <p>
//                                 Manage the courses you teach.
//                             </p>
//                         </div>

//                         <button
//                             className="btn"
//                             onClick={() => setShowForm(!showForm)}
//                         >
//                             Create Course
//                         </button>

//                     </div>


//                     {/* CREATE / EDIT COURSE FORM */}

//                     {showForm && (

//                         <div className="course-form">

//                             <h3>
//                                 {editingCourseId === null
//                                     ? "Create a New Course"
//                                     : "Edit Course"
//                                 }
//                             </h3>


//                             <input
//                                 type="text"
//                                 placeholder="Course Number"
//                                 value={newCourse.number}
//                                 onChange={(event) =>
//                                     setNewCourse({
//                                         ...newCourse,
//                                         number: event.target.value
//                                     })
//                                 }
//                             />


//                             <input
//                                 type="text"
//                                 placeholder="Course Name"
//                                 value={newCourse.name}
//                                 onChange={(event) =>
//                                     setNewCourse({
//                                         ...newCourse,
//                                         name: event.target.value
//                                     })
//                                 }
//                             />


//                             <input
//                                 type="text"
//                                 placeholder="Subject"
//                                 value={newCourse.subject}
//                                 onChange={(event) =>
//                                     setNewCourse({
//                                         ...newCourse,
//                                         subject: event.target.value
//                                     })
//                                 }
//                             />


//                             <input
//                                 type="number"
//                                 placeholder="Credits"
//                                 value={newCourse.credits}
//                                 onChange={(event) =>
//                                     setNewCourse({
//                                         ...newCourse,
//                                         credits: event.target.value
//                                     })
//                                 }
//                             />


//                             <textarea
//                                 placeholder="Course Description"
//                                 value={newCourse.description}
//                                 onChange={(event) =>
//                                     setNewCourse({
//                                         ...newCourse,
//                                         description: event.target.value
//                                     })
//                                 }
//                             />


//                             <button
//                                 className="btn"
//                                 onClick={
//                                     editingCourseId === null
//                                         ? createCourse
//                                         : updateCourse
//                                 }
//                             >
//                                 {editingCourseId === null
//                                     ? "Create Course"
//                                     : "Update Course"
//                                 }
//                             </button>

//                         </div>
//                     )}


//                     {/* COURSE CARDS */}

//                     <div className="teacher-course-list">

//                         {courses.map((course) => (

//                             <div
//                                 className="teacher-course-card"
//                                 key={course.id}
//                             >

//                                 <div className="course-info">

//                                     <span className="course-number">
//                                         {course.number}
//                                     </span>

//                                     <h3>
//                                         {course.name}
//                                     </h3>

//                                     <p>
//                                         {course.subject}
//                                     </p>

//                                     <span className="credits">
//                                         {course.credits} Credits
//                                     </span>

//                                     {course.description && (
//                                         <p className="course-description">
//                                             {course.description}
//                                         </p>
//                                     )}

//                                 </div>


//                                 <div className="course-actions">

//                                     <button
//                                         className="edit-btn"
//                                         onClick={() => editCourse(course)}
//                                     >
//                                         Edit Course
//                                     </button>


//                                     <button
//                                         className="delete-btn"
//                                         onClick={() =>
//                                             deleteCourse(course.id)
//                                         }
//                                     >
//                                         Delete Course
//                                     </button>

//                                 </div>


//                                 <div className="students">

//                                     <h4>Enrolled Students</h4>

//                                     {course.students.map((student) => (

//                                         <div
//                                             className="student-row"
//                                             key={student.id}
//                                         >

//                                             <span>
//                                                 {student.name}
//                                             </span>

//                                             <button
//                                                 className="remove-btn"
//                                                 onClick={() =>
//                                                     removeStudent(
//                                                         course.id,
//                                                         student.id
//                                                     )
//                                                 }
//                                             >
//                                                 Remove
//                                             </button>

//                                         </div>

//                                     ))}

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </section>


//                 {/* CHECKOUT SIDEBAR */}

//                 <aside className="checkout-sidebar">

//                     <div className="checkout-header">

//                         <h2>Checkout</h2>

//                         <span>
//                             {cart.length} course
//                             {cart.length !== 1 ? "s" : ""}
//                         </span>

//                     </div>


//                     {cart.length === 0 ? (

//                         <div className="empty-cart">

//                             <p>
//                                 Your cart is empty.
//                             </p>

//                             <p>
//                                 Add a course to get started.
//                             </p>

//                         </div>

//                     ) : (

//                         <div className="checkout-courses">

//                             {cart.map((course) => (

//                                 <div
//                                     className="checkout-course"
//                                     key={course.id}
//                                 >

//                                     <div>

//                                         <span className="course-number">
//                                             {course.number}
//                                         </span>

//                                         <h3>
//                                             {course.name}
//                                         </h3>

//                                         <p>
//                                             {course.credits} Credits
//                                         </p>

//                                     </div>


//                                     <button
//                                         className="remove-btn"
//                                         onClick={() =>
//                                             removeFromCart(course.id)
//                                         }
//                                     >
//                                         Remove
//                                     </button>

//                                 </div>

//                             ))}

//                         </div>

//                     )}


//                     {cart.length > 0 && (

//                         <div className="checkout-footer">

//                             <button className="btn checkout-btn">
//                                 Checkout
//                             </button>

//                         </div>

//                     )}

//                 </aside>

//             </div>

//         </main>
//     )
// }


// export default Teacher