import Docsly from "@docsly/react";
import "@docsly/react/styles.css";
import { usePathname } from "next/navigation";

export default function DocslyClient() {
  const pathname = usePathname();
  if (!pathname) return null;
  return <Docsly publicId="private_l2XHcP7T1PrXZhpCGpgjIrRlNr7qZlOezpeog3Wv3ruuK49AraRgA2dYAtuvtR6P" pathname={pathname} />;
}
