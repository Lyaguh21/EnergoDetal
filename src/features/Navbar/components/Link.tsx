import { ReactNode, AnchorHTMLAttributes } from "react";
import { NavLink } from "react-router";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  to: string;
}

export function Link({ children, to, ...props }: LinkProps) {
  return (
    <NavLink
      {...props}
      to={to}
      style={{
        color: "#515661",
        fontSize: "22px",
        fontWeight: "500",
        textDecoration: "none",
        ...props.style,
      }}
    >
      {children}
    </NavLink>
  );
}
