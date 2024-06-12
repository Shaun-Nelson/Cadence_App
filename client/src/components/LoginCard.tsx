import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials, setJwt, setRefreshToken } from "../slices/authSlice";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();

      dispatch(setCredentials(res.username));
      dispatch(setJwt(res.accessToken));
      dispatch(setRefreshToken(res.refreshToken));
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form
        className='flex flex-col justify-center items-center mt-24 p-12 w-80 shadow-md rounded border border-opacity-50'
        onSubmit={handleSubmit}
      >
        <h3 className='mb-12'>Login</h3>
        <input
          className='mb-4 w-48 p-2 border border-opacity-50 rounded'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='mb-4 w-48 p-2 border border-opacity-50 rounded'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-48 p-2 bg-gray-800 text-white rounded'
        >
          Login
        </button>

        <p className='mt-12 text-sm'>
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className='text-blue-800 cursor-pointer hover:text-blue-600 hover:underline font-semibold transition active:scale-90'
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
