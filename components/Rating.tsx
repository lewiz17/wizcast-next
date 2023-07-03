interface RatingProps {
  rate: number;
}

const Rating: React.FC<RatingProps> = ({ rate }) => {
  return (
    <span
      className={`rating text-white rounded-full absolute w-10 h-10 ${
        rate >= 6 ? "bg-green" : rate >= 5 ? "bg-orange" : "bg-gray"
      }`}
    >
      {rate.toFixed(1)}
    </span>
  );
};

export default Rating;
