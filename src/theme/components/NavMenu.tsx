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
export type NavMenuGroupContentProps = HTMLAttributes<HTMLElement>;
export type NavMenuDividerProps = Omit<HTMLAttributes<HTMLElement>, "children">;
export type NavMenuHeadingProps = HTMLAttributes<HTMLElement>;

const NavMenu = ({ children }: NavMenuProps) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

const NavMenuItem = ({
  href,
  active = false,
  children,
  ...props
}: NavMenuItemProps) => {
  return (
    <li {...props}>
      <a href={href} {...props}>
        {children}
        {active ? <p>^</p> : null}
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
      <li {...props}>
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
          console.log("hey i clicked!");
        }}
      >
        {children}
      </button>
    </div>
  );
};

const NavMenuGroupContent = ({ children }: NavMenuGroupContentProps) => {
  const context = useContext(NavMenuContext);
  console.log("context", context);

  return <>{(context?.isActive || context?.isOpen) && <ul>{children}</ul>}</>;
};

const NavMenuHeading = ({ children, ...props }: NavMenuHeadingProps) => {
  const context = useContext(NavMenuContext);
  return (
    <li {...props}>
      <button
        className="top-0 right-0 z-10 inline-flex w-32 p-2 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm md:w-44 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-[#1D2428] dark:border-gray-700"
        onClick={() => console.log("ok i clicked now what")}
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
