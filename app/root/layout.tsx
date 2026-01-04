import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { Toaster } from "~/components/ui/toast/toast";
import { RadixUIProvider } from "./radix-ui-provider";

import { AuthProvider } from "~/components/product/session/auth-context";

import { theme } from "~/theme.css";
import "./root.css";

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
          <AuthProvider>
            <div id="root" className={`${theme.className}`}>
              {children}
            </div>
          </AuthProvider>
          <Toaster />
        </RadixUIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
