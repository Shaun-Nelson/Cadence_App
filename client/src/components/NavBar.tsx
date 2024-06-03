import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

// Components
import NavItem from "./NavItem";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      await dispatch(logout());
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        console.error("Failed to log out", response.statusText);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <nav>
      <ul className='navbar'>
        <NavItem linkTo='/' bodyText='Home' />
        <NavItem linkTo='/signup' bodyText='Sign-Up' />
        {isLoggedIn ? (
          <>
            <NavItem linkTo='/playlists' bodyText='My Playlists' />
            <NavItem linkTo='/profile' bodyText='User Profile' />
            <NavItem
              linkTo='/api/users/logout'
              bodyText='Logout'
              onClickHandler={handleLogout}
            />
          </>
        ) : (
          <NavItem linkTo='/login' bodyText='Login' />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
