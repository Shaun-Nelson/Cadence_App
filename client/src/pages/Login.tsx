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
          <div className='flex flex-col my-4 p-6 bg-light-100 dark:bg-primaryDark border shadow-md rounded-3xl hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition w-80 items-center'>
            <div className='text-center'>
              <h1 className='text-lg font-semibold text-slate-400 dark:text-slate-400'>
                Already logged-in as:
              </h1>
              <span className='text-xl text-slate-600 dark:text-slate-300'>
                {userInfo}
              </span>
              <p className='mt-12 text-sm text-slate-400'>
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
