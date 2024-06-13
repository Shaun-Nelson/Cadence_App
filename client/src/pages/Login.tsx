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
        <div className='flex justify-center items-center pt-24'>
          <div className='flex flex-col justify-center items-center mt-24 p-6 w-80 shadow-md rounded border border-opacity-50'>
            <div className='text-center'>
              <h1 className='text-xl font-semibold'>Already logged-in as:</h1>
              <span className='text-3xl'>{userInfo}</span>
              <p className='mt-12 text-sm'>
                Want to register a new account?{" "}
                <Link
                  to={"/signup"}
                  className='text-blue-800 cursor-pointer hover:text-blue-600 hover:underline font-semibold transition active:scale-90'
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
