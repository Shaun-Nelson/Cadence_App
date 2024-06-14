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
        className='min-h-screen bg-primaryLight dark:bg-primaryDark'
      >
        <NavBar />
        <ToastContainer position='bottom-center' />
        <div id='page-wrap' className='bg-primaryLight dark:bg-primaryDark'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
