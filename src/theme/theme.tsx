import Head from "next/head";
import Link from "next/link";
import type { NextraThemeLayoutProps } from "nextra";
import { Sidebar } from "./components/Sidebar";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, frontMatter, headings, pageMap } = pageOpts;
  //   console.log("pageopts", pageOpts);
  //   console.log("headings", headings);
  console.log("pagemap", pageMap);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
      </Head>
      <ul>
        {headings.map((heading) => (
          <li key={heading.value}>{heading.value}</li>
        ))}
      </ul>
      <Sidebar pages={pageMap} />
      {pageMap.map((item) => {
        if (item.kind === "MdxPage") {
          return (
            <Link key={item.name} href={item.route}>
              {item.route}
            </Link>
          );
        }
        return null;
      })}
      <div style={{ border: "1px solid" }}>{children}</div>
    </div>
  );
}
