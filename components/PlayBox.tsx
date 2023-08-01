import { PlayIcon } from "./Icons";
type PlayProps = {
  onClick: () => void;
};

const PlayBox: React.FC<PlayProps> = ({ onClick }) => {
  const handleLocalClick = () => {
    onClick();
  };

  return (
    <a
      href="https://www.highwaycpmrevenue.com/wz3uu7ve?key=d7a0ed7005a5be369abb755781ba12e8"
      target="blank_"
    >
      <div className="play-box" onClick={() => handleLocalClick()}>
        <PlayIcon />
      </div>
    </a>
  );
};

export default PlayBox;
