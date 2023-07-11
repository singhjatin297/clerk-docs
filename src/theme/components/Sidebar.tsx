import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import type { PageMapItem } from "nextra";

import { NavMenu } from "./NavMenu";

interface SidebarProps {
  pages: PageMapItem[];
}

export const Sidebar = ({ pages }: SidebarProps) => {
  // console.log("pages", pages);

  // to find page item active i need to grab it from the url -- i can do that tomorrow
  return (
    <menu>
      {pages.map((pageItem) =>
        (function renderSidebar(pageItem) {
          if ("children" in pageItem && pageItem.children) {
            console.log("pageitem", pageItem);
            return (
              <NavMenu.Group key={pageItem.name}>
                <NavMenu.Group.Heading>{pageItem.name}</NavMenu.Group.Heading>
                <NavMenu.Group.Content>
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
                active={false}
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
