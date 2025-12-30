import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { Theme } from "@radix-ui/themes";
import { root } from "./styles.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme appearance="light" accentColor="crimson" radius="large" scaling="105%">
          <div className={root}>{children}</div>
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
