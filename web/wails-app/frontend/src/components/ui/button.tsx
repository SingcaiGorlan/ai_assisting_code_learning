import * as React from "react";
import { Button as RadixButton, ButtonProps as RadixButtonProps } from "@radix-ui/themes";

export interface ButtonProps extends Omit<RadixButtonProps, "ref"> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "solid", size = "2", className, ...props }, ref) => {
    return (
      <RadixButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </RadixButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
