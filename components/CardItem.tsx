import Link from "next/link";

type ITEM = {
    title: string;
};

const Card: React.FC<ITEM> = ({ title }: ITEM) => {
  return (
    <div className="w-full px-2 rounded overflow-hidden shadow">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <Link href={`/movie/${title}`}>
          <button className="text-white bg-blue hover:bg-gray font-bold py-2 px-4 rounded">
            Ver
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
