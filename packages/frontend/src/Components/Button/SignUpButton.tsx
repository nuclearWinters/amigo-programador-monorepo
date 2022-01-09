import { BaseButton, IBaseButtonProps } from "./BaseButton";
import { CSSProperties, FC } from "react";

export const SignUpButton: FC<IBaseButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <BaseButton {...buttonProps} style={container}>
      {children}
    </BaseButton>
  );
};

const { container }: Record<"container", CSSProperties> = {
  container: {
    cursor: "pointer",
    color: "rgb(255,255,255)",
    fontSize: 18,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 6,
    paddingBottom: 6,
    textAlign: "center",
    textDecoration: "none",
    backgroundColor: "#2c92db",
    borderRadius: 30,
    boxShadow: "1px 2px 5px #888888",
    fontWeight: "bold",
    letterSpacing: 1,
    border: "none",
  },
};
