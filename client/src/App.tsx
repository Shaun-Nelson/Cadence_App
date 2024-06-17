import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <main id='outer-container' className='bg-light-200 dark:bg-dark-600'>
        <NavBar />
        <ToastContainer position='bottom-center' />
        <section
          id='page-wrap'
          className='container mx-auto px-4 min-h-screen lg:w-3/5'
        >
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;
