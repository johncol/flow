import { Theme } from "@radix-ui/themes";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import {
  AuthContext,
  type AuthContextType,
} from "~/components/product/session/auth-context";
import { ANONYMOUS } from "~/types/users";

type RenderConfig = {
  authContext: AuthContextType;
};

export const renderWithProviders = (
  component: React.ReactNode,
  { authContext }: RenderConfig = defaultConfig
) => {
  return render(
    <Theme>
      <MemoryRouter>
        <AuthContext.Provider value={authContext}>
          {component}
        </AuthContext.Provider>
      </MemoryRouter>
    </Theme>
  );
};

export const createMockAuthContext = (
  overrides: Partial<AuthContextType> = {}
): AuthContextType => ({
  isLoggedIn: false,
  userId: ANONYMOUS,
  session: null,
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  ...overrides,
});

const defaultConfig: RenderConfig = {
  authContext: createMockAuthContext(),
};
