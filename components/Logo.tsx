import { useRouter } from "next/router";
import { CMS_NAME } from "../lib/constants";

const Logo: React.FC = () => {
  const router = useRouter();

  const isMovie = router.asPath.includes("serie") ? false : true;

  return (
    <span className="sm:flex md:hidden lg:flex">
      {isMovie ? "izPelis" : "izSeries"}
    </span>
  );
};

export default Logo;
