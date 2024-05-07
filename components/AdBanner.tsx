import { CSSProperties, FC, useState, useEffect } from "react";

type Props = Pick<CSSProperties, "height" | "width">;

export const AdBanner: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  // It's a good idea to use an `id` that can't be easily detected as a banneable banner.
  // That way adblockers won't remove your fallback state too and you could show a custom
  // message in that case if the ad is blocked
  return (
    <div id="my-banner" style={{ ...props }}>
      <div data-type="_mgwidget" data-widget-id="1617406"></div>
    </div>
  );
};
