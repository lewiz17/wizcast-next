type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="overflow-hidden">{children}</div>;
};

export default Container;
