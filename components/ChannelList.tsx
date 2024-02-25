import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/helpers";
import channelsData from "../data/channels.json";

const ChannelList = () => {
  const [currentExp, setExpiration] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const [currentChannel, setChannel] = useState("");

  const player = useRef(null);

  console.log(currentExp);

  useEffect(() => {
    const expiration = localStorage.getItem("expirationPin");
    setExpiration(expiration);
  }, [currentExp]);

  useEffect(() => {
    setChannelList(channelsData);
    setChannel("");
  }, []);

  const handleChannel = (e) => {
    const currentID = e.target.closest("li").getAttribute("data-id");
    if (currentID === "winsport") {
      const iframe = player.current;
      if (iframe) {
        iframe.src = "//www.capofut.net/play/winsportsplus.php";
      }
    } else {
      setChannel(currentID);
    }
  };

  return (
    <>
      {currentChannel != "" && (
        <iframe
          src={`/dashplayer?get=${currentChannel}`}
          width={"100%"}
          style={{ border: "1px solid #fff", overflow: "hidden" }}
          height={600}
          ref={player}
        ></iframe>
      )}
      <div className="channels-wrapper">
        <p className="exp">
          <b>Expiracion: </b>
          {formatDate(currentExp)}
        </p>

        <h3>Nuestros Canales</h3>
        <ul>
          {channelList.map((v, i) => {
            return (
              <li key={v.channel_id} data-id={v.channel_id}>
                <img
                  src={v.channel_cover}
                  loading="lazy"
                  onClick={(e) => handleChannel(e)}
                />
              </li>
            );
          })}
        </ul>
        <p>Version Beta* Pronto más canales!</p>
      </div>
    </>
  );
};

export default ChannelList;
