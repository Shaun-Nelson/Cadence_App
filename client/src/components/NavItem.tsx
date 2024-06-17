import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  linkTo?: string;
  bodyText: string;
  icon: FontAwesomeIconProps["icon"];
  onClickHandler?: () => void;
}

const NavItem = ({ linkTo, bodyText, icon, onClickHandler }: NavItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();

  const btnActiveStyle =
    "scale-125 active:scale-50 hover:scale-150 active:shadow-inner transition lg:text-slate-800 lg:dark:text-slate-300";
  const btnInactiveStyle =
    "scale-100 active:scale-50 hover:scale-150 active:shadow-inner transition lg:text-slate-500 lg:hover:text-slate-800 lg:dark:text-slate-500 lg:dark:hover:text-slate-300";

  const iconActiveStyle = "mr-2 opacity-60";
  const iconInactiveStyle = "mr-2 opacity-35 lg:hover:opacity-60";

  useEffect(() => {
    if (location.pathname === linkTo && !onClickHandler) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location, linkTo, onClickHandler]);

  return (
    <li className='list-none p-9 lg:py-6 lg:px-6'>
      <button className={isActive ? btnActiveStyle : btnInactiveStyle}>
        <FontAwesomeIcon
          icon={icon}
          className={isActive ? iconActiveStyle : iconInactiveStyle}
        />
        <NavLink onClick={onClickHandler} to={linkTo ? linkTo : ""}>
          {bodyText}
        </NavLink>
      </button>
    </li>
  );
};

export default NavItem;
