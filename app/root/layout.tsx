import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { RadixUIProvider } from "./radix-ui-provider";
import { Toaster } from "~/components/ui/toast/toast";

import { root } from "./root.css";
import { theme } from "~/theme.css";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RadixUIProvider>
          <div className={`${theme.className} ${root}`}>{children}</div>
          <Toaster />
        </RadixUIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
