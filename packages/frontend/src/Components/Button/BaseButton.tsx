import { FC } from "react";

export type IBaseButtonProps = {
  renderLeading?: () => React.ReactNode;
  renderTrailing?: () => React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const BaseButton: FC<IBaseButtonProps> = ({
  children,
  renderLeading,
  renderTrailing,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps}>
      {renderLeading && renderLeading()}
      {children}
      {renderTrailing && renderTrailing()}
    </button>
  );
};
