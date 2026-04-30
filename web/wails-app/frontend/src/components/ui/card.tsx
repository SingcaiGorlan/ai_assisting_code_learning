import * as React from "react";
import { Card as RadixCard, Flex } from "@radix-ui/themes";

export interface CardProps extends React.ComponentProps<typeof RadixCard> {
  variant?: "surface" | "classic" | "ghost";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "surface", ...props }, ref) => {
    return (
      <RadixCard
        ref={ref}
        variant={variant}
        {...props}
      >
        {children}
      </RadixCard>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction="column"
        gap="2"
        p="4"
        className={className}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-lg font-semibold ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-gray-500 dark:text-gray-400 ${className || ''}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction="column"
        gap="3"
        p="4"
        pt="0"
        className={className}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        gap="3"
        p="4"
        pt="0"
        className={className}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };