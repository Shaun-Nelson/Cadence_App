import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div id='outer-container'>
        <ToastContainer position='bottom-center' />
        <div id='page-wrap'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
