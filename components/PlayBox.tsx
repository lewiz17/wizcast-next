import { PlayIcon } from "./Icons";
type PlayProps = {
  onClick: () => void;
};

const PlayBox: React.FC<PlayProps> = ({ onClick }) => {
  const handleLocalClick = (e) => {
    e.preventDefault();

    onClick();
    window.open(
      "https://www.highwaycpmrevenue.com/wz3uu7ve?key=d7a0ed7005a5be369abb755781ba12e8",
      "_blank"
    );
  };

  return (
    <div className="play-box" onClick={(e) => handleLocalClick(e)}>
      <PlayIcon />
    </div>
  );
};

export default PlayBox;
