type TNotificationProps = {
  children: React.ReactNode;
};

export const Notification = ({ children }: TNotificationProps) => {
  return <div style={{ textAlign: "center" }}>{children}</div>;
};
