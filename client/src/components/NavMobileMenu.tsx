import { useState } from "react";
import { pushRotate as Menu, Props } from "react-burger-menu";
import {
  faMagnifyingGlass,
  faUserPlus,
  faListUl,
  faUser,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import { useLoginSpotifyMutation } from "../slices/thirdPartyApiSlice";

// Components
import NavItem from "./NavItem";

interface NavMobileMenuProps extends Props {
  isLoggedIn: boolean;
  handleLogout?: () => void;
}

const NavMobileMenu = ({ isLoggedIn, handleLogout }: NavMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
      right
      width={220}
      pageWrapId='page-wrap'
      outerContainerId='outer-container'
    >
      <NavItem linkTo='/' bodyText='Home' icon={faMagnifyingGlass} />
      <hr />
      <NavItem linkTo='/signup' bodyText='Sign-Up' icon={faUserPlus} />
      <hr />
      {isLoggedIn ? (
        <>
          <NavItem
            linkTo='/playlists'
            bodyText='My Playlists'
            icon={faListUl}
          />
          <hr />
          <NavItem linkTo='/profile' bodyText='User Profile' icon={faUser} />
          <hr />
          <NavItem
            linkTo=''
            bodyText='Connect'
            onClickHandler={handleSpotfiyConnect}
            icon={faSpotify}
          />
          <hr />
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
    </Menu>
  );
};

export default NavMobileMenu;
