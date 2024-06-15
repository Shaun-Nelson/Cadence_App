import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div
        id='outer-container'
        className='min-h-screen bg-light-200 dark:bg-dark-600'
      >
        <NavBar />
        <ToastContainer position='bottom-center' />
        <div id='page-wrap'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
