import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials, setJwt } from "../slices/authSlice";

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

      dispatch(setCredentials({ ...res }));
      dispatch(setJwt(res.token));
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className='flex-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' style={{ marginTop: "1em" }}>
          Login
        </button>

        <p style={{ marginTop: "1em" }}>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
