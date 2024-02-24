import { useEffect, useState } from "react";
import { formatDate } from "../utils/helpers";
import channelsData from "../data/channels.json";

const ChannelList = () => {
  const [currentExp, setExpiration] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const [currentChannel, setChannel] = useState("");

  console.log(currentExp);

  useEffect(() => {
    const expiration = localStorage.getItem("expirationPin");
    setExpiration(expiration);
  }, [currentExp]);

  useEffect(() => {
    setChannelList(channelsData);
  }, []);

  const handleChannel = (e) => {
    setChannel(e.target.closest("li").getAttribute("data-id"));
  };

  return (
    <>
      {currentChannel != "" && (
        <iframe
          src={`/dashplayer?get=${currentChannel}`}
          width={"100%"}
          style={{ border: "1px solid #fff", overflow: "hidden" }}
          height={600}
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
      </div>
    </>
  );
};

export default ChannelList;
