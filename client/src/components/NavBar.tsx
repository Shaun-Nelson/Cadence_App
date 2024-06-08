import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

// Components
import NavItem from "./NavItem";

// Images
import logo from "../assets/cadence_logo.svg";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [userLogout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userLogout({}).unwrap();

      if (response) {
        setIsLoggedIn(false);
        await dispatch(logout());
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
      <ul className='flex justify-center content-center items-center mtb-10px'>
        <img src={logo} alt='Cadence Logo' className='h-16' />
        <NavItem linkTo='/' bodyText='Home' />
        <NavItem linkTo='/signup' bodyText='Sign-Up' />
        {isLoggedIn ? (
          <>
            <NavItem linkTo='/playlists' bodyText='My Playlists' />
            <NavItem linkTo='/profile' bodyText='User Profile' />
            <NavItem
              linkTo='/'
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
