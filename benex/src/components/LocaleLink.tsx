/** Internal destinations are written with canonical (French) paths and become /fr/... or /en/... automatically. */
import { forwardRef, type ComponentProps } from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router";
import { useLocalePath } from "../hooks/useLocalePath";

export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterLink>>(function Link({ to, ...props }, ref) {
  const localize = useLocalePath();
  return <RouterLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...props} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterNavLink>>(function NavLink({ to, ...props }, ref) {
  const localize = useLocalePath();
  return <RouterNavLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...props} />;
});
