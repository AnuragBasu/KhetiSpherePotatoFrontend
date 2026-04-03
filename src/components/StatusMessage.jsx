import "./StatusMessage.css";

export function StatusMessage({ children, variant = "default" }) {
  const classes = `status-pill${variant === "error" ? " error" : ""}`;
  return <p className={classes}>{children}</p>;
}
