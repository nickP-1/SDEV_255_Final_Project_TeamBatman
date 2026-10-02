// import { useState } from 'react'
// import './style.css'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import CoursePreview from './components/CoursePreview'


// function App() {

//   return (
//     <>
//       <Navbar />

//       {/* -- Main Page Content -- */}
//       <main>

//           {/* -- Hero Section -- */}
//           <Hero />

//           {/* -- Course Preview -- */}
//           <CoursePreview /> 


//       </main>
//     </>
//   )
// }

// export default App
import './style.css'
import Navbar from './components/Navbar'
import Teacher from './pages/Teacher'


function App() {

    return (
        <>
            <Navbar />

            <Teacher />

        </>
    )
}

export default App