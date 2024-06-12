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
    <li className='list-none p-4'>
      <FontAwesomeIcon icon={icon} className='mr-2' />
      <Link onClick={onClickHandler} to={linkTo}>
        {bodyText}
      </Link>
    </li>
  );
};

export default NavItem;
