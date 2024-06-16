import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../store";
import {
  useLoginSpotifyMutation,
  useLogoutMutation,
} from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

// Components
import NavItem from "./NavItem";
import NavMobileMenu from "./NavMobileMenu";

// Images
import logo from "../assets/cadence_logo.svg";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faListUl,
  faMagnifyingGlass,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [userLogout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginSpotify] = useLoginSpotifyMutation();

  const handleSpotfiyConnect = async () => {
    try {
      const res = await loginSpotify({}).unwrap();

      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to Spotify");
    }
  };

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
    <nav className='sticky top-0 w-full shadow bg-light-100 dark:bg-dark-500 z-50'>
      <ul className='lg:flex lg:justify-center lg:items-center'>
        <li>
          <Link to='/'>
            <img
              src={logo}
              alt='Cadence Logo'
              className='h-16 ml-2 transition lg:hover:scale-125 active:scale-50 active:shadow-inner cursor-pointer text-secondayDark hover:text-primaryDark dark:text-secondaryLight dark:hover:text-primaryLight'
            />
          </Link>
        </li>
        <li className='lg:hidden'>
          <NavMobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </li>
        <div className='hidden lg:flex items-center'>
          <NavItem linkTo='/' bodyText='Home' icon={faMagnifyingGlass} />
          <NavItem linkTo='/signup' bodyText='Sign-Up' icon={faUserPlus} />
          {isLoggedIn ? (
            <>
              <NavItem
                linkTo='/playlists'
                bodyText='My Playlists'
                icon={faListUl}
              />
              <NavItem
                linkTo='/profile'
                bodyText='User Profile'
                icon={faUser}
              />
              <NavItem
                linkTo=''
                bodyText='Connect'
                onClickHandler={handleSpotfiyConnect}
                icon={faSpotify}
              />
              <NavItem
                linkTo='/'
                bodyText='Logout'
                onClickHandler={handleLogout}
                icon={faArrowRightFromBracket}
              />
            </>
          ) : (
            <NavItem
              linkTo='/login'
              bodyText='Login'
              icon={faArrowRightToBracket}
            />
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
