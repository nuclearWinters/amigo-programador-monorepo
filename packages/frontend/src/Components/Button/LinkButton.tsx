import React from "react";
import { useLocation } from "react-router-dom";
import { BaseButton, IBaseButtonProps } from "./BaseButton";

type LinkOptionProps = {
  link: string;
} & IBaseButtonProps;

export const LinkButton: React.FC<LinkOptionProps> = ({
  link,
  children,
  ...buttonProps
}) => {
  const location = useLocation();
  return (
    <BaseButton {...buttonProps} style={container(location.pathname, link)}>
      {children}
    </BaseButton>
  );
};

const {
  container,
}: Record<
  "container",
  (path: string, location: string) => React.CSSProperties
> = {
  container: (pathname, link) => {
    return {
      fontSize: 18,
      padding: "0px 16px",
      textAlign: "center",
      fontWeight: "normal",
      textDecoration: "none",
      color: pathname.includes(link) ? "rgba(44, 146, 219, 0.9)" : "gray",
      backgroundColor: "white",
      border: "none",
    };
  },
};
