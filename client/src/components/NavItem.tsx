import { Link } from "react-router-dom";

interface NavItemProps {
  linkTo: string;
  bodyText: string;
  onClickHandler?: () => void;
}

const NavItem = ({ linkTo, bodyText, onClickHandler }: NavItemProps) => {
  return (
    <li className='mx-3 list-none text-xs lg:text-lg'>
      <Link onClick={onClickHandler} to={linkTo}>
        {bodyText}
      </Link>
    </li>
  );
};

export default NavItem;
