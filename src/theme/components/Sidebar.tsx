import type { PageMapItem } from "nextra";
import { useRouter } from "next/router";

import { NavMenu } from "./NavMenu";

interface SidebarProps {
  pages: PageMapItem[];
}

export const Sidebar = ({ pages }: SidebarProps) => {
  const { pathname } = useRouter();

  return (
    <menu>
      {/*TODO: adjust the order of the pages being mapped (perhaps switch to a .reduce()) to match the design & separate into sections, using the .meta files*/}
      {pages.map((pageItem) =>
        (function renderSidebar(pageItem) {
          console.log("pageitem", pageItem);
          if ("children" in pageItem && pageItem.children) {
            let containsCurrentPage = false;
            pageItem.children.forEach((child) => {
              if (child.kind === "MdxPage" && child.route === pathname) {
                containsCurrentPage = true;
              }
            });
            return (
              // TODO: pull folder names from .meta instead of pagemap so they are not kebab-cased
              <NavMenu.Group key={pageItem.name}>
                <NavMenu.Group.Heading>{pageItem.name}</NavMenu.Group.Heading>
                <NavMenu.Group.Content active={containsCurrentPage}>
                  {pageItem.children.map(renderSidebar)}
                </NavMenu.Group.Content>
              </NavMenu.Group>
            );
          }
          if (pageItem.kind === "MdxPage") {
            return (
              <NavMenu.Item
                key={pageItem.name}
                href={pageItem.route}
                active={pageItem.route.includes(pathname)}
              >
                {pageItem.frontMatter?.title}
              </NavMenu.Item>
            );
          }
        })(pageItem)
      )}
    </menu>
  );
};
