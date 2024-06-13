import { useSelector } from "react-redux";
import { RootState } from "../store";

//Components
import LoginCard from "../components/LoginCard";
import { Link } from "react-router-dom";

const Login = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {userInfo ? (
        <div className='flex justify-center items-start pt-24 h-screen'>
          <div className='flex flex-col justify-center items-center p-6 w-80 shadow-md rounded border border-opacity-50'>
            <div className='text-center'>
              <h1 className='text-xl text-primaryDark dark:text-primaryLight font-semibold'>
                Already logged-in as:
              </h1>
              <span className='text-3xl text-primaryDark dark:text-primaryLight'>
                {userInfo}
              </span>
              <p className='mt-12 text-sm text-primaryDark dark:text-primaryLight'>
                Want to register a new account?{" "}
                <Link
                  to={"/signup"}
                  className='link dark:text-blue-400 dark:hover:text-blue-600'
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoginCard />
      )}
    </>
  );
};

export default Login;
