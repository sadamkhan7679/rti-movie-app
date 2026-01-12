import React from "react";
import styles from "./styles.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", className, ...rest } = props;

  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <button className={classNames} {...rest} />;
};
