import { createContext } from "react";

interface NavMenuContextType {
  isOpen: boolean;
  isActive: boolean;
  setIsOpen: (open: boolean) => void;
  setIsActive: (active: boolean) => void;
}

const NavMenuContext = createContext<NavMenuContextType | null>(null);

export default NavMenuContext;
