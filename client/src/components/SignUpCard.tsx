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
    <div className='flex justify-center items-center'>
      <form
        className='flex flex-col justify-center items-center mt-24 p-12 w-80 shadow-md rounded border border-opacity-50'
        onSubmit={handleSubmit}
      >
        <h3 className='mb-12'>Sign Up</h3>
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
        <input
          className='mb-4 w-48 p-2 border border-opacity-50 rounded'
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='w-48 p-2 bg-gray-800 text-white rounded'
        >
          Sign Up
        </button>

        <p className='mt-12 text-sm'>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className='text-blue-800 cursor-pointer hover:text-blue-600 hover:underline font-semibold transition active:scale-90'
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
