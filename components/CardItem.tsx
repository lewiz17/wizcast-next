import Image from "next/image";
import Link from "next/link";

type ITEM = {
  title: string;
  poster: string;
};

const Card: React.FC<ITEM> = ({ title, poster }: ITEM) => {
  return (
    <div className="w-full rounded overflow-hidden shadow hover:opacity-90">
      <Link href={`/movie/${title}`}>
        <Image
          src={poster}
          alt={title}
          width={250}
          height={200}
          className="w-full"
        />
        <div className="font-bold text-sm flex justify-center m-2">{title}</div>
      </Link>
    </div>
  );
};

export default Card;
