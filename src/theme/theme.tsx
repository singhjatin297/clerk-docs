import Head from "next/head";
import Link from "next/link";
import type { NextraThemeLayoutProps } from "nextra";

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
      <ul>
        {pageMap.map((item) => {
          console.log("item", item);
          if (item.kind === "Folder") {
            let pageName = pageMap[0].data[item.name].title;
            return (
              <li key={item.name}>
                <Link href={item.route}>{pageName}</Link>
                {item.children &&
                  item.children.map((child) => {
                    let childName = item;
                    console.log("childname", childName);
                    return <p key={child.name}>{child.name}</p>;
                  })}
              </li>
            );
          }
          return null;
        })}
      </ul>
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
