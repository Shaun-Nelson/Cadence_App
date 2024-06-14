import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  linkTo: string;
  bodyText: string;
  icon: FontAwesomeIconProps["icon"];
  onClickHandler?: () => void;
}

const NavItem = ({ linkTo, bodyText, icon, onClickHandler }: NavItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();
  const activeStyle =
    "scale-125 lg:dark:text-primaryLight active:scale-50 hover:scale-150 active:shadow-inner transition";
  const inactiveStyle =
    "scale-100 lg:dark:text-primaryLight active:scale-50 hover:scale-150 active:shadow-inner transition";

  useEffect(() => {
    if (location.pathname === linkTo && !onClickHandler) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, linkTo, onClickHandler]);

  return (
    <li className='list-none p-9 lg lg:px-6'>
      <button className={isActive ? activeStyle : inactiveStyle}>
        <FontAwesomeIcon icon={icon} className='mr-2' />
        <NavLink onClick={onClickHandler} to={linkTo}>
          {bodyText}
        </NavLink>
      </button>
    </li>
  );
};

export default NavItem;
