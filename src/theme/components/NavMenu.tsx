import { HTMLAttributes, useContext, useState } from "react";

import NavMenuContext from "../utils/NavMenuContext";

export type NavMenuProps = HTMLAttributes<HTMLElement>;
export type NavMenuItemProps = HTMLAttributes<HTMLElement> & {
  href: string;
  active: boolean;
};
export type NavMenuGroupProps = HTMLAttributes<HTMLElement> & {
  active?: boolean;
};
export type NavMenuGroupHeadingProps = HTMLAttributes<HTMLElement> & {
  buttonProps?: HTMLAttributes<HTMLElement>;
};
export type NavMenuGroupContentProps = HTMLAttributes<HTMLElement> & {
  active: boolean;
};
export type NavMenuDividerProps = Omit<HTMLAttributes<HTMLElement>, "children">;
export type NavMenuHeadingProps = HTMLAttributes<HTMLElement>;

// TODO: switch out divs for semantic HTML and style components to match designs (some styles were pulled from another component)
const NavMenu = ({ children }: NavMenuProps) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

const NavMenuItem = ({
  href,
  active,
  children,
  ...props
}: NavMenuItemProps) => {
  return (
    <li {...props}>
      <a href={href} {...props}>
        {children}
      </a>
    </li>
  );
};

const NavMenuGroup = ({
  active = false,
  children,
  ...props
}: NavMenuGroupProps) => {
  const [isOpen, setIsOpen] = useState(active);
  const [isActive, setIsActive] = useState(active);

  return (
    <NavMenuContext.Provider
      value={{ isOpen, isActive, setIsOpen, setIsActive }}
    >
      <li>
        <div>{children}</div>
      </li>
    </NavMenuContext.Provider>
  );
};

const NavMenuGroupHeading = ({ children }: NavMenuGroupHeadingProps) => {
  const context = useContext(NavMenuContext);

  return (
    <div>
      <button
        className="top-0 right-0 z-10 inline-flex w-32 p-2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm md:w-44 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-[#1D2428] dark:border-gray-700"
        onClick={() => {
          context?.setIsOpen(!context.isOpen);
        }}
      >
        {children}
      </button>
    </div>
  );
};

const NavMenuGroupContent = ({
  active = false,
  children,
}: NavMenuGroupContentProps) => {
  const context = useContext(NavMenuContext);

  // TODO: sub-menu sections open when active as they should, but i need to adjust this logic so they will then also be closeable onclick
  const isVisible = context?.isActive || context?.isOpen || active;
  return <>{isVisible && <ul>{children}</ul>}</>;
};

const NavMenuHeading = ({ children, ...props }: NavMenuHeadingProps) => {
  const context = useContext(NavMenuContext);
  return (
    <li {...props}>
      <button
        className="top-0 right-0 z-10 inline-flex w-32 p-2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm md:w-44 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-[#1D2428] dark:border-gray-700"
        onClick={() => console.log("click")}
      >
        {children}
      </button>
    </li>
  );
};

NavMenu.Item = NavMenuItem;
NavMenu.Group = NavMenuGroup;
NavMenuGroup.Heading = NavMenuGroupHeading;
NavMenuGroup.Content = NavMenuGroupContent;
NavMenu.Heading = NavMenuHeading;

export { NavMenu };
