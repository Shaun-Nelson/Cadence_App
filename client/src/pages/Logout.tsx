import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const [userLogout] = useLogoutMutation();

  const logout = async () => {
    try {
      await userLogout({}).unwrap();

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
