import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const SignUpCard = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
      } else {
        await signup({ username, password }).unwrap();

        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up");
    }
  };

  return (
    <div className='flex justify-center items-center pt-24 bg-light-200 dark:bg-dark-600'>
      <form
        className='flex flex-col w-full lg:w-1/3 p-8 bg-light-100 dark:bg-primaryDark border shadow-md rounded-3xl hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition items-center'
        onSubmit={handleSubmit}
      >
        <h3 className='mb-8 text-xl font-semibold text-slate-600 dark:text-slate-300'>
          Sign Up
        </h3>
        <input
          className='mb-4 w-full p-2 border border-opacity-50 rounded-xl'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className='mb-4 w-full p-2 border border-opacity-50 rounded-xl'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className='mb-4 w-full p-2 border border-opacity-50 rounded-xl'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type='submit' className='btn-submit'>
          Sign Up
        </button>

        <p className='mt-8 text-sm text-slate-400'>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className='link dark:text-blue-400 dark:hover:text-blue-600'
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
