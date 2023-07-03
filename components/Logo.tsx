import { CMS_NAME } from "../lib/constants";

const Logo: React.FC = () => {
  return <span className="sm:flex md:hidden lg:flex">{CMS_NAME.slice(1)}</span>;
};

export default Logo;
