import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className='outer-container'>
      <NavBar />
      <ToastContainer />
      <div id='page-wrap'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
