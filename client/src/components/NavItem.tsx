import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface NavItemProps {
  linkTo: string;
  bodyText: string;
  icon: FontAwesomeIconProps["icon"];
  onClickHandler?: () => void;
}

const NavItem = ({ linkTo, bodyText, icon, onClickHandler }: NavItemProps) => {
  return (
    <li className='list-none p-4 lg lg:px-6'>
      <button className='dark:text-primaryLight active:scale-75 active:shadow-inner hover:scale-125 transition'>
        <FontAwesomeIcon icon={icon} className='mr-2' />
        <Link onClick={onClickHandler} to={linkTo}>
          {bodyText}
        </Link>
      </button>
    </li>
  );
};

export default NavItem;
