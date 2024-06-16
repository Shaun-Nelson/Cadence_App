import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <header id='outer-container' className='bg-light-200 dark:bg-dark-600'>
        <NavBar />
        <ToastContainer position='bottom-center' />
        <main id='page-wrap' className='min-h-screen'>
          <Outlet />
        </main>
      </header>
    </>
  );
}

export default App;
