import { useState } from "react";
import { scaleRotate as Menu } from "react-burger-menu";

// Components
import NavItem from "./NavItem";

interface NavMobileMenuProps {
  isLoggedIn: boolean;
  handleLogout?: () => void;
}

const NavMobileMenu = ({ isLoggedIn, handleLogout }: NavMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //   const closeMenu = () => {
  //     if (isOpen) {
  //       setIsOpen(false);
  //     }
  //   };

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
      right
      width={200}
      pageWrapId='page-wrap'
      outerContainerId='outer-container'
      className='w-1/2'
    >
      <NavItem linkTo='/' bodyText='Home' />
      <hr />
      <NavItem linkTo='/signup' bodyText='Sign-Up' />
      <hr />
      {isLoggedIn ? (
        <>
          <NavItem linkTo='/playlists' bodyText='My Playlists' />
          <hr />
          <NavItem linkTo='/profile' bodyText='User Profile' />
          <hr />
          <NavItem linkTo='/' bodyText='Logout' onClickHandler={handleLogout} />
        </>
      ) : (
        <NavItem linkTo='/login' bodyText='Login' />
      )}
    </Menu>
  );
};

export default NavMobileMenu;
